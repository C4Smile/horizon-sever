export type LoggedUserDto = {
  user: {
    id: number;
    horizonUserId: number;
  };
  token: string;
};
