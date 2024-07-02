
export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginErrorProps {
  email?: string;
  password?: string;
}

export interface RegisterProps {
  email: string;
  password: string;
  confirmPass: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  dni: string;
  phone: string;
  address: string;
  location: string;
  nationality: string;
}

export interface RegisterErrorProps {
  email?: string;
  password?: string;
  confirmPass?: string;
  first_name?: string;
  last_name?: string;
  birthdate?: string;
  dni?: string;
  phone?: string;
  address?: string;
  location?: string;
  nationality?: string;
}

export interface userSession {
  token: string;
  userData: {
    email: string;
    address: string;
    id: string;
    name: string;
    phone: string;
    role: {};
  };
}

