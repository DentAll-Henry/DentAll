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

export interface NewServiceProps {
  name: string;
  price: string;
  description: string;
  img: string;
}

export interface NewServiceErrorProps {
  name?: string;
  price?: string;
  description?: string;
  img?: string;
}

export type Appointment = {
  id: string;
  date_time: string;
  description: string;
  patient: string;
  service: {
    description: string;
    id: string;
    img: string;
    isActive: boolean;
    name: string;
    price: string;
  };
};

export interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  img: string;
  isActive: boolean;
}

export interface VideoPlayerProps {
  src: string;
  type: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}