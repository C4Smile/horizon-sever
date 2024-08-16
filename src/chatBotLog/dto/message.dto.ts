export interface MessageDto {
  id?: number;
  message: string;
  userId: number;
  senderId: number; // 0 if is the bot
  fromApp: string;
  sentDate: Date;
}
