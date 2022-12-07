export interface iUser {
  id: string;
  first_name: string;
  last_name: string;
  user_type: string;
  email: string;
  plan: string;
  accessToken: string;
  expiresIn: number;
  enterprise: string;
}
