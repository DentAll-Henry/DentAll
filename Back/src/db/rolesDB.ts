import { Roles } from '../role/enums/roles.enum';

export const rolesDB = [
  {
    name: Roles.PATIENT,
    description:
      'Usuario que desea recibir tratamiento odontológico en DentAll',
  },
  {
    name: Roles.ADMINISTRATIVE,
    description: 'Empleado de DentAll con funciones administrativas',
  },
  {
    name: Roles.DENTIST,
    description: 'Profesional odontologo de DentAll',
  },
  {
    name: Roles.ADMIN,
    description: 'Administrador de la app DentAll',
  },
];
