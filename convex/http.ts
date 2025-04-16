import { httpRouter } from "convex/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const http = httpRouter();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("No svix headers found", {
        status: 400,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occurred", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, first_name, last_name, image_url, email_addresses } = evt.data;

      const email = email_addresses[0].email_address;

      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.syncUser, {
          email,
          name,
          image: image_url,
          clerkId: id,
        });
      } catch (error) {
        console.log("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    if (eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.updateUser, {
          clerkId: id,
          email,
          name,
          image: image_url,
        });
      } catch (error) {
        console.log("Error updating user:", error);
        return new Response("Error updating user", { status: 500 });
      }
    }

    return new Response("Webhooks processed successfully", { status: 200 });
  }),
});

// validate and fix workout plan to ensure it has proper numeric types
function validateWorkoutPlan(plan: any) {
  const validatedPlan = {
    schedule: plan.schedule,
    exercises: plan.exercises.map((exercise: any) => ({
      day: exercise.day,
      routines: exercise.routines.map((routine: any) => ({
        name: routine.name,
        sets: typeof routine.sets === "number" ? routine.sets : parseInt(routine.sets) || 1,
        reps: typeof routine.reps === "number" ? routine.reps : parseInt(routine.reps) || 10,
      })),
    })),
  };
  return validatedPlan;
}

// validate diet plan to ensure it strictly follows schema
function validateDietPlan(plan: any) {
  // only keep the fields we want
  const validatedPlan = {
    dailyCalories: plan.dailyCalories,
    meals: plan.meals.map((meal: any) => ({
      name: meal.name,
      foods: meal.foods,
    })),
  };
  return validatedPlan;
}

http.route({
  path: "/vapi/generate-program",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const payload = await request.json();

      const {
        user_id,
        age,
        height,
        weight,
        injuries,
        workout_days,
        fitness_goal,
        fitness_level,
        dietary_restrictions,
      } = payload;

      console.log("Payload is here:", payload);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-001",
        generationConfig: {
          temperature: 0.4, // lower temperature for more predictable outputs
          topP: 0.9,
          responseMimeType: "application/json",
        },
      });

      const workoutPrompt = `Você é um treinador físico experiente criando um plano de treino personalizado baseado em:
      Idade: ${age}
      Altura: ${height}
      Peso: ${weight}
      Lesões ou limitações: ${injuries}
      Dias disponíveis para treino: ${workout_days}
      Objetivo fitness: ${fitness_goal}
      Nível de condicionamento: ${fitness_level}
      
      Como um treinador profissional:
      - Considere a divisão de grupos musculares para evitar sobrecarregar os mesmos músculos em dias consecutivos
      - Desenvolva exercícios que correspondam ao nível de condicionamento e considere quaisquer lesões
      - Estruture os treinos para atingir especificamente o objetivo fitness do usuário
      
      INSTRUÇÕES CRÍTICAS DO ESQUEMA:
      - Sua saída DEVE conter APENAS os campos especificados abaixo, SEM CAMPOS ADICIONAIS
      - "sets" e "reps" DEVEM SEMPRE ser NÚMEROS, nunca textos
      - Por exemplo: "sets": 3, "reps": 10
      - NÃO use textos como "reps": "O máximo possível" ou "reps": "Até a falha"
      - Em vez disso, use números específicos como "reps": 12 ou "reps": 15
      - Para cardio, use "sets": 1, "reps": 1 ou outro número apropriado
      - NUNCA inclua strings para campos numéricos
      - NUNCA adicione campos extras não mostrados no exemplo abaixo
      
      Retorne um objeto JSON com EXATAMENTE esta estrutura:
      {
        "schedule": ["Monday", "Wednesday", "Friday"],
        "exercises": [
          {
            "day": "Monday",
            "routines": [
              {
                "name": "Exercise Name",
                "sets": 3,
                "reps": 10
              }
            ]
          }
        ]
      }
      
      NÃO adicione nenhum campo que não esteja neste exemplo. Sua resposta deve ser um objeto JSON válido sem texto adicional.`;

      const workoutResult = await model.generateContent(workoutPrompt);
      const workoutPlanText = workoutResult.response.text();

      // VALIDATE THE INPUT COMING FROM AI
      let workoutPlan = JSON.parse(workoutPlanText);
      workoutPlan = validateWorkoutPlan(workoutPlan);

      const dietPrompt = `Você é um nutricionista experiente criando um plano alimentar personalizado baseado em:
        Idade: ${age}
        Altura: ${height}
        Peso: ${weight}
        Objetivo fitness: ${fitness_goal}
        Restrições alimentares: ${dietary_restrictions}
        
        Como um nutricionista profissional:
        - Calcule a ingestão calórica diária apropriada baseada nas características e objetivos da pessoa
        - Crie um plano alimentar balanceado com distribuição adequada de macronutrientes
        - Inclua uma variedade de alimentos nutritivos respeitando as restrições alimentares
        - Considere o tempo das refeições em relação aos treinos para otimizar performance e recuperação
        
        INSTRUÇÕES CRÍTICAS DO ESQUEMA:
        - Sua saída DEVE conter APENAS os campos especificados abaixo, SEM CAMPOS ADICIONAIS
        - "dailyCalories" DEVE ser um NÚMERO, não uma string
        - NÃO adicione campos como "suplementos", "macros", "notas" ou QUALQUER outra coisa
        - Inclua SOMENTE os campos EXATOS mostrados no exemplo abaixo
        - Cada refeição deve incluir APENAS um "name" e array "foods"

        Retorne um objeto JSON com EXATAMENTE esta estrutura e nenhum outro campo:
        {
          "dailyCalories": 2000,
          "meals": [
            {
              "name": "Café da Manhã",
              "foods": ["Aveia com frutas vermelhas", "Iogurte grego", "Café preto"]
            },
            {
              "name": "Almoço",
              "foods": ["Salada de frango grelhado", "Pão integral", "Água"]
            }
          ]
        }
        
        NÃO adicione nenhum campo que não esteja neste exemplo. Sua resposta deve ser um objeto JSON válido sem texto adicional.`;

      const dietResult = await model.generateContent(dietPrompt);
      const dietPlanText = dietResult.response.text();

      // VALIDATE THE INPUT COMING FROM AI
      let dietPlan = JSON.parse(dietPlanText);
      dietPlan = validateDietPlan(dietPlan);

      // save to our DB: CONVEX
      const planId = await ctx.runMutation(api.plans.createPlan, {
        userId: user_id,
        dietPlan,
        isActive: true,
        workoutPlan,
        name: `${fitness_goal} Plan - ${new Date().toLocaleDateString()}`,
      });

      return new Response(
        JSON.stringify({
          success: true,
          data: {
            planId,
            workoutPlan,
            dietPlan,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error generating fitness plan:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

export default http;
