export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: boolean;
}

export interface TriviaData extends Question {
  answers: string[];
  selected_answer: string;
}

export interface TriviaResponse {
  response_code: number;
  results: Question[];
}

export type UserResponses = {
  data: TriviaData[];
  score: number;
} | null;
