export enum From {
  user = "user",
  model = "model",
}

export type Answer = {
  text: string;
};

export interface BotAnswerDto {
  role: From;
  parts: Answer[];
}

export type SavedInstructionDto = {
  id: number;
  instructions: string;
};
