// reactjs-social-login.d.ts

import { ReactNode } from "react";

// Define the types for the response object and resolve parameters
export type ObjectType = {
  [key: string]: any;
};

export type IResolveParams = {
  provider: string;
  data?: ObjectType;
};

// Define the props for LoginSocialFacebook component
export interface LoginSocialFacebookProps {
  appId: string;
  scope?: string;
  state?: boolean;
  xfbml?: boolean;
  cookie?: boolean;
  version?: string;
  language?: string;
  auth_type?: string;
  className?: string;
  isDisabled?: boolean;
  isOnlyGetToken?: boolean;
  onLoginStart?: () => void;
  onLogoutSuccess?: () => void;
  onReject: (reject: string | ObjectType) => void;
  onResolve: (params: IResolveParams) => void;
  redirect_uri?: string;
  fieldsProfile?: string;
  response_type?: string;
  return_scopes?: boolean;
  children?: ReactNode;
}

// Declare the module and extend its props
declare module "reactjs-social-login" {
  export const LoginSocialFacebook: React.ComponentType<LoginSocialFacebookProps>;
}
