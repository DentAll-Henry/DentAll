import { title } from "process";
import { UpdateSystemConfigDto } from "src/system_configs/dto/update-system_config.dto";

export const system_default_configs = [

    {
        title: "Hora de apertura de la clínica",
        slug_name: "open_time",
        value: "08:00"
    },
    {
        title: "Hora de cierre de la clínica",
        slug_name: "close_time",
        value: "16:00"
    },
    {
        title: "Duración en minutos de una cita",
        slug_name: "appointment_duration",
        value: "30"
    }, {
        title: "Email de la clínica",
        slug_name: "email",
        value: "q7j2S@example.com"
    }
]