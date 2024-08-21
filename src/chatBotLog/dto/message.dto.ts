export interface MessageDto {
  id?: number;
  message: string;
  targetId: number; // 0 if is the bot
  senderId: number; // 0 if is the bot
  fromApp: string;
  sentDate: Date;
}
