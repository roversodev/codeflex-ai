export const USER_PROGRAMS = [
  {
    id: 1,
    first_name: "Sarah",
    profilePic: "https://randomuser.me/api/portraits/men/74.jpg",
    fitness_goal: "Perda de Peso",
    height: "1.68m",
    weight: "75 kg",
    age: 34,
    workout_days: 4,
    injuries: "Dor lombar",
    fitness_level: "Iniciante",
    equipment_access: "Academia em casa",
    dietary_restrictions: "Intolerante à lactose",
    workout_plan: {
      title: "Programa Iniciante de Perda de Peso",
      weekly_schedule: [
        { day: "Segunda", focus: "Cardio Corpo Inteiro", duration: "30 min" },
        { day: "Quarta", focus: "Core e Membros Inferiores", duration: "30 min" },
        { day: "Sexta", focus: "Treino HIIT", duration: "25 min" },
        { day: "Sábado", focus: "Recuperação Ativa", duration: "40 min" },
      ],
      description:
        "Este programa foca em construir um hábito consistente de exercícios com movimentos suaves para as articulações que protegem a lombar. A combinação de cardio e treino de força auxilia na perda de peso enquanto preserva a massa muscular.",
    },
    diet_plan: {
      title: "Plano Nutricional Balanceado (Sem Lactose)",
      daily_calories: "1.600 calorias",
      macros: { protein: "30%", carbs: "40%", fats: "30%" },
      meal_examples: [
        { meal: "Café da Manhã", example: "Aveia com leite de amêndoas, frutas vermelhas e sementes de chia" },
        { meal: "Almoço", example: "Salada de frango grelhado com molho de azeite" },
        { meal: "Jantar", example: "Salmão assado com quinoa e legumes assados" },
        { meal: "Lanches", example: "Maçã com pasta de amêndoas, iogurte sem lactose com castanhas" },
      ],
      description:
        "Este plano alimentar evita produtos lácteos enquanto fornece nutrição balanceada para apoiar os objetivos de perda de peso. O foco está em alimentos integrais com proteína adequada para preservar os músculos durante a perda de peso.",
    },
  },
  {
    id: 2,
    first_name: "Michael",
    profilePic: "https://randomuser.me/api/portraits/men/75.jpg",
    fitness_goal: "Ganho Muscular",
    height: "1.78m",
    weight: "77 kg",
    age: 28,
    workout_days: 5,
    injuries: "Nenhuma",
    fitness_level: "Intermediário",
    equipment_access: "Academia completa",
    dietary_restrictions: "Nenhuma",
    workout_plan: {
      title: "Hipertrofia Focada em Ganho Muscular",
      weekly_schedule: [
        { day: "Segunda", focus: "Peito e Tríceps", duration: "45 min" },
        { day: "Terça", focus: "Costas e Bíceps", duration: "45 min" },
        { day: "Quarta", focus: "Recuperação/Cardio", duration: "30 min" },
        { day: "Quinta", focus: "Ombros e Abdômen", duration: "45 min" },
        { day: "Sexta", focus: "Pernas", duration: "50 min" },
      ],
      description:
        "Este programa implementa uma divisão tradicional por grupos musculares com ênfase na sobrecarga progressiva. Cada grupo muscular é treinado com volume moderado e recuperação adequada para maximizar o crescimento muscular.",
    },
    diet_plan: {
      title: "Plano Nutricional para Ganho Muscular",
      daily_calories: "2.800 calorias",
      macros: { protein: "30%", carbs: "50%", fats: "20%" },
      meal_examples: [
        { meal: "Café da Manhã", example: "Aveia com banana e whey protein" },
        { meal: "Almoço", example: "Frango, arroz e legumes com azeite" },
        { meal: "Jantar", example: "Bife com batata doce e vegetais verdes" },
        { meal: "Lanches", example: "Shake proteico com frutas, iogurte grego com mel" },
      ],
      description:
        "Esta dieta rica em proteínas e com superávit calórico apoia o crescimento muscular enquanto minimiza o ganho de gordura. Os carboidratos são programados em torno dos treinos para desempenho e recuperação ideais.",
    },
  },
  {
    id: 3,
    first_name: "Elena",
    profilePic: "https://randomuser.me/api/portraits/men/76.jpg",
    fitness_goal: "Condicionamento Geral",
    height: "1.63m",
    weight: "59 kg",
    age: 45,
    workout_days: 3,
    injuries: "Dor no joelho",
    fitness_level: "Intermediário",
    equipment_access: "Apenas peso corporal",
    dietary_restrictions: "Vegetariana",
    workout_plan: {
      title: "Programa de Fitness Funcional",
      weekly_schedule: [
        { day: "Segunda", focus: "Força com Peso Corporal", duration: "40 min" },
        { day: "Quarta", focus: "Mobilidade e Equilíbrio", duration: "35 min" },
        { day: "Sábado", focus: "Cardio e Core", duration: "40 min" },
      ],
      description:
        "Este programa foca em padrões de movimento funcionais que melhoram o desempenho diário enquanto são suaves para os joelhos. A ênfase está na força do core, mobilidade e saúde cardiovascular.",
    },
    diet_plan: {
      title: "Nutrição Vegetariana Balanceada",
      daily_calories: "1.800 calorias",
      macros: { protein: "25%", carbs: "50%", fats: "25%" },
      meal_examples: [
        { meal: "Café da Manhã", example: "Tofu mexido com vegetais e pão integral" },
        { meal: "Almoço", example: "Sopa de lentilhas com salada verde mista" },
        { meal: "Jantar", example: "Curry de grão de bico com arroz integral e legumes" },
        { meal: "Lanches", example: "Mix de castanhas, homus com vegetais, smoothie proteico" },
      ],
      description:
        "Este plano vegetariano garante ingestão adequada de proteínas de fontes vegetais. Foca em alimentos integrais e apoia seu estilo de vida ativo, considerando problemas no joelho com escolhas alimentares anti-inflamatórias.",
    },
  },
];
