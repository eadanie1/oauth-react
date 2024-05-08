interface GoogleAPI {
  accounts: {
    id: {
      initialize: (options: any) => void;
      renderButton: (element: HTMLElement, options: any) => void;
    };
  };
}

declare const google: GoogleAPI;