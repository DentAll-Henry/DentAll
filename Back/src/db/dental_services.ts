import { DentalServDto } from 'src/dentalServ/dtos/dentalServ.dto';

export const dentalServicesDB: DentalServDto[] = [
  {
    name: 'Limpieza Dental',
    description:
      'Procedimiento de limpieza profesional para remover la placa y el sarro de los dientes.',
    price: 50.0,
    img: 'https://cdn-icons-png.flaticon.com/512/1046/1046747.png',
  },
  {
    name: 'Blanqueamiento Dental',
    description:
      'Tratamiento para aclarar el color de los dientes y mejorar la apariencia de la sonrisa.',
    price: 150.0,
    img: 'https://cdn-icons-png.flaticon.com/512/1046/1046747.png',
  },
  {
    name: 'Extracción Dental',
    description: 'Procedimiento para remover un diente dañado o problemático.',
    price: 75.0,
    img: 'https://cdn-icons-png.flaticon.com/512/1046/1046747.png',
  },
  {
    name: 'Endodoncia (Tratamiento de Conductos)',
    description:
      'Tratamiento para salvar un diente con una infección o daño profundo en la pulpa dental.',
    price: 200.0,
    img: 'https://cdn-icons-png.flaticon.com/512/1046/1046747.png',
  },
  {
    name: 'Implante Dental',
    description:
      'Procedimiento quirúrgico para reemplazar dientes perdidos con implantes permanentes.',
    price: 1000.0,
    img: 'https://cdn-icons-png.flaticon.com/512/1046/1046747.png',
  },
];
