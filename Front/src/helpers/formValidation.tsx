import {
  LoginErrorProps,
  LoginProps,
  RegisterErrorProps,
  RegisterProps,
} from "@/types";

const regexValidations = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  contrasena: /^\d{6,}$/,
  nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
  apellido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
  fechaNacimiento: /^\d{1,2}[-\/.]\d{1,2}[-\/.]\d{4}$/,
  dni: /^\d{7,8}$/,
  telefono: /^[\d\s\-()]{10,15}$/,
  direccion: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,.-]{5,100}$/,
  localidad: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
  nacionalidad: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
};

export function validateLoginForm(values: LoginProps): LoginErrorProps {
  let errors: LoginErrorProps = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regexValidations.email.test(values.email)) {
    errors.email = "Email is not valid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (!regexValidations.contrasena.test(values.password)) {
    errors.password =
      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character";
  }

  return errors;
}
  // Función para convertir la fecha de formato YYYY-MM-DD a DD/MM/YYYY
  function convertirFecha(fecha:any) {
    const partes = fecha.split("-");
    if (partes.length === 3) {
      const yyyy = partes[0];
      const mm = partes[1];
      const dd = partes[2];
      return `${dd}/${mm}/${yyyy}`;
    }
    return fecha; // Devuelve la fecha sin cambios si no se puede convertir
  }
export function validateRegisterForm(
  values: RegisterProps
): RegisterErrorProps {
  let errors: RegisterErrorProps = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regexValidations.email.test(values.email)) {
    errors.email = "Email is not valid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (!regexValidations.contrasena.test(values.password)) {
    errors.password =
      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character";
  }
  if (!values.confirmPass) {
    errors.confirmPass = "Password is required";
  } else if (!regexValidations.contrasena.test(values.confirmPass)) {
    errors.confirmPass =
      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character";
  }

  if (!values.first_name) {
    errors.first_name = "Name is required";
  } else if (!regexValidations.nombre.test(values.first_name)) {
    errors.first_name =
      "Name must be between 2 and 50 characters and only contain letters and spaces";
  }

  if (!values.last_name) {
    errors.last_name = "Surname is required";
  } else if (!regexValidations.apellido.test(values.last_name)) {
    errors.last_name =
      "Surname must be between 2 and 50 characters and only contain letters and spaces";
  }

if (!values.birthdate) {
  errors.birthdate = "Birthdate is required";
} else {
  const fechaConvertida = convertirFecha(values.birthdate);
  if (!regexValidations.fechaNacimiento.test(fechaConvertida)) {
    errors.birthdate = "Birthdate must be in the format DD/MM/YYYY";
  }
}

  if (!values.dni) {
    errors.dni = "DNI is required";
  } else if (!regexValidations.dni.test(values.dni)) {
    errors.dni = "DNI must be a valid number with 7 or 8 digits";
  }

  if (!values.phone) {
    errors.phone = "Phone is required";
  } else if (!regexValidations.telefono.test(values.phone)) {
    errors.phone =
      "Phone number must be between 10 and 15 characters and can contain numbers, spaces, parentheses, and hyphens";
  }

  if (!values.address) {
    errors.address = "Address is required";
  } else if (!regexValidations.direccion.test(values.address)) {
    errors.address =
      "Address must be between 5 and 100 characters and can contain letters, numbers, and certain special characters (,.-)";
  }

  if (!values.location) {
    errors.location = "City is required";
  } else if (!regexValidations.localidad.test(values.location)) {
    errors.location =
      "City must be between 2 and 50 characters and only contain letters and spaces";
  }

  if (!values.nationality) {
    errors.nationality = "Nationality is required";
  } else if (!regexValidations.nacionalidad.test(values.nationality)) {
    errors.nationality =
      "Nationality must be between 2 and 50 characters and only contain letters and spaces";
  }

  return errors;
}
