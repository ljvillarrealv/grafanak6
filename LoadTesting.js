import http from 'k6/http';
import { sleep } from 'k6';

// Exportamos las opciones de configuración para la prueba en K6.
export const options = {
    stages: [
        {
            duration: '10s',  // Primera etapa: dura 10 segundos.
            target: 10        // Durante esta etapa, el número de usuarios virtuales (VUs) incrementará hasta 10.
        },
        {
            duration: '20s',  // Segunda etapa: dura 20 segundos.
            target: 10        // En esta etapa, el número de VUs se mantiene constante en 10.
        },
        {
            duration: '10s',  // Tercera etapa: dura 10 segundos.
            target: 0         // Durante esta etapa, el número de VUs se reduce gradualmente a 0.
        }
    ]
}


export default function () {
    http.get('https://test.k6.io')
    sleep(1)
    http.get('https://test.k6.io/contacts.php')
    sleep(2)
    http.get('https://test.k6.io/new.php')
    sleep(1)
}