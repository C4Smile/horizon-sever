export interface MessageDto {
  id?: number;
  message: string;
  targetId: number;
  senderId: number;
  fromApp: string;
  sentDate: Date;
  history?: any[];
}
