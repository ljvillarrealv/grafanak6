import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';


export function handleSummary(data) {
    console.log("Se está ejecutando handleSummary");

    // Obtener fecha y hora actual
    const now = new Date();
    const dateTime = now.toISOString().replace(/[:.]/g, '-'); // Ej: 2025-04-23T18-45-12-123Z

    return {
        [`transferencia-${dateTime}.html`]: htmlReport(data, { debug: false }),
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
const url = 'https://t-tomcat-mio.novopayment.net/operation-core/v1/customers/4E06027DDFB93EC4/accounts/D700E285D2133424104C902999F02F64D5E3D9F9/internal-transfer';

export default function () {
    const res = http.post(url,
    JSON.stringify(
        {
            amount: '0.01',
            tax: null,
            fee: null,
            destinationAccountId: '4356B78C4EE5C95B9CE1FC168CF790F6C90F2B51',
            opMsgPurposeId: '2',
        }
    ),
    { 
        headers: {
                'x-context-id': 'mio-rd',
                'x-customer-type': 'retail',
                'x-request-id': 'interna-1',
                'Content-Type': 'application/json',
            }
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