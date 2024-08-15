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

export interface Appointment {
  id: string;
  date_time: string;
  description: string;
  patient: {
    id: string;
    person: {
      first_name: string;
      last_name: string;
    };
  };
  payment: {
    id: string;
    date: string;
    payment_id: number;
    payment_status: string;
  } | null;
  dentist_id: {
    id: string;
    person: {
      first_name: string;
      last_name: string;
    };
  };
  service: {
    description: string;
    id: string;
    img: string;
    isActive: boolean;
    name: string;
    price: string;
  };
}

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
  loop?: boolean;
  muted?: boolean;
}

export interface personAppointments {
  id: string;
  date_time: string;
  description: string;
}

export interface Patients {
  id: string;
  person: {
    id: string;
    first_name: string;
    last_name: string;
    birthdate: Date;
    dni: string;
    phone: string;
    email: string;
    address: string;
    location: string;
    nationality: string;
    is_auth0: boolean;
    photo: string;
    deleteDate: null;
    is_active: boolean;
    roles: {
      id: string;
      name: string;
      description: string;
    }[];
  };
  appointments: personAppointments[];
  dentalRecord: null;
}

export interface Dentist {
  id: string;
  rate: string;
  is_active: boolean;
  specialty: {
    description: string;
    id: string;
    name: string;
  };
  person: {
    id: string;
    first_name: string;
    last_name: string;
    birthdate: string; // ISO 8601 date string
    dni: string;
    phone: string;
    email: string;
    address: string;
    location: string;
    nationality: string;
    is_auth0: boolean;
    photo: string;
    deleteDate: string | null;
    roles: {
      id: string;
      name: string;
      description: string;
    }[];
  };
  dental_services: {
    id: string;
    name: string;
    price: string;
    description: string;
    img: string | null;
    isActive: boolean;
  }[];
  appointments: {
    id: string;
    date_time: string; // ISO 8601 date string
    description: string;
    patient: {
      id: string;
    };
  }[];
}

export interface PatientId {
  id: string;
  person: {
    id: string;
    first_name: string;
    last_name: string;
    birthdate: Date;
    dni: string;
    phone: string;
    email: string;
    address: string;
    location: string;
    nationality: string;
    is_auth0: boolean;
    photo: string;
    deleteDate: null;
  };
}

export interface DentistId {
  id: string;
  rate: string;
  is_active: boolean;
  description: string;
  specialty: string | null;
  person: {
    id: string;
    first_name: string;
    last_name: string;
    birthdate: Date;
    dni: string;
    phone: string;
    email: string;
    address: string;
    location: string;
    nationality: string;
    is_auth0: boolean;
    photo: string;
    deleteDate: null;
  };
  appointments: {
    id: string;
    date_time: string;
    description: string;
    expiration_date: string | null;
  }[];
}

export interface AppointmentId {
  id: string;
  date_time: string;
  description: string;
  expiration_date: string;
  service: {
    id: string;
    name: string;
    price: string;
    description: string;
    img: string | null;
    isActive: boolean;
  };
  patient: {
    id: string;
  };
  dentist_id: {
    id: string;
    rate: string;
    is_active: boolean;
    description: string;
    person: {
      id: string;
      first_name: string;
      last_name: string;
      birthdate: Date;
      dni: string;
      phone: string;
      email: string;
      address: string;
      location: string;
      nationality: string;
      is_auth0: boolean;
      photo: string;
      deleteDate: null;
    };
  };
}

export interface RegisterAuth0Props {
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
  photo: string;
  is_auth0: boolean;
}
export interface PaymentId {
  id: string;
  date: Date;
  payment_id: number;
  payment_status: string;
  dentalServ: {
    id: string;
    name: string;
    price: string;
    description: string;
    img: string | null;
    isActive: boolean;
  };
  appointment: {
    id: string;
    date_time: string;
    description: string;
    expiration_date: string | null;
  };
}

export interface PersonInterface {
  id: string;
  first_name: string;
  last_name: string;
  birthdate: Date;
  dni: string;
  phone: string;
  email: string;
  address: string;
  location: string;
  nationality: string;
  is_auth0: boolean;
  photo: string;
  deleteDate: null;
  is_active: boolean;
  roles: {
    id: string;
    name: string;
    description: string;
  }[];
}
