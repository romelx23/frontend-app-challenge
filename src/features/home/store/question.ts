// import { Alert } from "react-native";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Toast from "react-native-toast-message";

const questions = [
  {
    id: 1,
    name: "What’s your name?",
    category: "Personal",
    spanish: "¿Cómo te llamas?",
  },
  {
    id: 2,
    name: "What’s your last name / surname?",
    category: "Personal",
    spanish: "¿Cuál es tu apellido?",
  },
  {
    id: 3,
    name: "What do you do for a living?",
    category: "Personal",
    spanish: "¿A qué te dedicas?",
  },
  {
    id: 4,
    name: "Where are you from?",
    category: "Personal",
    spanish: "¿De dónde eres?",
  },
];

export interface IQuestion {
  id: number;
  name: string;
  category: string;
  spanish: string;
  externalLink?: string;
  saved?: boolean;
  // image: string;
}

interface QuestionStore {
  questions: IQuestion[];
  questionSaved: IQuestion[] | null;
  savedQuestion: (question: IQuestion) => void;
  loadQuestionSaved: () => void;
}

export const useQuestion = create<QuestionStore>()(
  devtools((set, get) => ({
    questions: [...questions],
    questionSaved: null,
    savedQuestion: async (question) => {
      if (!question) return;

      // Asegurarse de que questionSaved es un array
      const currentSavedQuestions = get().questionSaved ?? [];

      //   si ya está guardada la pregunta, no hacer nada
      if (currentSavedQuestions.some((q) => q.id === question.id)) {
        // filtrar la pregunta que ya está guardada
        const filteredQuestions = currentSavedQuestions.filter(
          (q) => q.id !== question.id
        );
        set({
          questionSaved: filteredQuestions,
        });

        // actualizar AsyncStorage
        await AsyncStorage.setItem(
          "questions",
          JSON.stringify(filteredQuestions)
        );

        // Alert.alert("Guardado", "La pregunta ya ha sido guardada");
        return;
      }

      set({
        questionSaved: [...currentSavedQuestions, question],
      });

      // Guardar en AsyncStorage
      await AsyncStorage.setItem(
        "questions",
        JSON.stringify([...currentSavedQuestions, question])
      );
    },
    loadQuestionSaved: async () => {
      const savedQuestions = await AsyncStorage.getItem("questions");
      if (savedQuestions) {
        set({
          // questionSaved: JSON.parse(savedQuestions),
          questionSaved: JSON.parse(savedQuestions).sort(
            (a: IQuestion, b: IQuestion) => {
              return a.id - b.id;
            }
          ),
        });
      }
    },
  }))
);
