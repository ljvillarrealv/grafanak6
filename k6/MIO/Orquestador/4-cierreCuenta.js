import http from 'k6/http';
import { check, sleep } from 'k6';
//import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';


export function handleSummary(data) {
    //console.log("Se está ejecutando R");

    // Obtener fecha y hora actual
    const now = new Date();
    const dateTime = now.toISOString().replace(/[:.]/g, '-'); // Ej: 2025-04-23T18-45-12-123Z

    return {
        [`cierreCuenta-${dateTime}.html`]: htmlReport(data, { debug: false }),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    };
}


export const options = {
    stages: [                   // --->>> Ramp - UP
        {
            duration: '1s',  // Primera etapa: dura 10 segundos. 
            target: 1       // Durante esta etapa, el número de usuarios virtuales (VUs) incrementará hasta 10.
        },
        {
            duration: '2s',  // Segunda etapa: dura 20 segundos.
            target: 2        // En esta etapa, el número de VUs se mantiene constante en 10.
        },
        {                       //Ramp -Down
            duration: '1s',  // Tercera etapa: dura 10 segundos.
            target: 1         // Durante esta etapa, el número de VUs se reduce gradualmente a 0.
        }
    ],
    thresholds: {
        //http_req_duration: ['p(95)<2000'],
        // http_req_duration: ['max<2000'],
        //http_req_failed: ['rate < 0.01'],
        // http_reqs:['count>20'],
        //http_reqs:['rate>3']

    }
}

const url = 'https://t-tomcat-mio.novopayment.net/account-core/v1/mio-rd/retail/DDBDE21B02BC2E8E/accounts/6E8D162758FA580FC4CADAE33AFDA1014F5E41EE';

export default function () {
    const res = http.post(url,
        JSON.stringify({
            updatedBy: 'MASTER',
            blockReasonId: '1',
            comment: 'the comment',
        })
        , {
            headers: {
                'x-request-id': 'close-acc-nn',
                'x-context-id': 'mio-rd',
                'Content-Type': 'application/json',
            },
        });

    
 // Check the response status and duration
    check(res, {
        'is status 200': (r) => r.status === 200,
        'response time < 5000ms': (r) => r.timings.duration < 5000,
    });
    console.log(res.status);
    console.log(res.body);

    sleep(1); // Wait for 1 second between iterations
}