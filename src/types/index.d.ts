export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  birthdate: Date;
};

export type SuccessServiceResponse = {
  success: true;
  data?: { [key: string]: any };
};

export type ErrorServiceResponse = {
  success: false;
  error: Error;
};

export type ServiceResponse = SuccessServiceResponse | ErrorServiceResponse;

export type Repo = {
  id: string;
  name: string;
  default_branch: string;
  language: string;
  description: string | null;
  clone_url: string;
};
