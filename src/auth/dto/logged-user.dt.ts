export type LoggedUserDto = {
  user: {
    id: number;
    museumUserId: number;
  };
  token: string;
};
