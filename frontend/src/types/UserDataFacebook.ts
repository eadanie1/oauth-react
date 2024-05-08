export interface UserDataFacebook {
  id: string;
  name: string;
  picture: {
    data: {
      url: string;
    };
  };
}