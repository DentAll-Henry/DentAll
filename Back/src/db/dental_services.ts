import { DentalServDto } from "src/dentalServ/dtos/dentalServ.dto";

export const dentalServicesDB: DentalServDto[] = [
    {
      name: "Limpieza Dental",
      description: "Procedimiento de limpieza profesional para remover la placa y el sarro de los dientes.",
      price: 50.00
    },
    {
      name: "Blanqueamiento Dental",
      description: "Tratamiento para aclarar el color de los dientes y mejorar la apariencia de la sonrisa.",
      price: 150.00
    },
    {
      name: "Extracción Dental",
      description: "Procedimiento para remover un diente dañado o problemático.",
      price: 75.00
    },
    {
      name: "Endodoncia (Tratamiento de Conductos)",
      description: "Tratamiento para salvar un diente con una infección o daño profundo en la pulpa dental.",
      price: 200.00
    },
    {
      name: "Implante Dental",
      description: "Procedimiento quirúrgico para reemplazar dientes perdidos con implantes permanentes.",
      price: 1000.00
    }
  ]