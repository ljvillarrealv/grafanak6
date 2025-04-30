import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export function handleSummary(data) {
    console.log("Se está ejecutando handleSummary");
    return {
        'SummaryofSampleGet.html': htmlReport(data, { debug: false }),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    }
}


export const options = {
    stages: [                   // --->>> Ramp - UP
        {   
            duration: '5s',  // Primera etapa: dura 10 segundos. 
            target: 30       // Durante esta etapa, el número de usuarios virtuales (VUs) incrementará hasta 10.
        },
        {
            duration: '20s',  // Segunda etapa: dura 20 segundos.
            target: 200        // En esta etapa, el número de VUs se mantiene constante en 10.
        },
        {                       //Ramp -Down
            duration: '5s',  // Tercera etapa: dura 10 segundos.
            target: 10         // Durante esta etapa, el número de VUs se reduce gradualmente a 0.
        }
    ],
    thresholds:{
        http_req_duration: ['p(95)<2000'],
        http_req_duration: ['max<2000'],
        http_req_failed: ['rate < 0.01'],
        http_reqs:['count>20'],
        http_reqs:['rate>3']
        
    }
}

export default function () {


    let res = http.put('https://t-customers-api.novopayment.net/api-npd-customers-update-ms/v1/customers/a3a9c82f-1164-4ef0-b8b5-c202b7678990/basic-info',
        JSON.stringify(
            {
                "firstName": "GUSTAVO"+ randomString(8),
                "lastName": "PETRO"+ randomString(8),
                "dateOfBirth": "1950-01-31",
                "gender": "MALE",
                "civilStatus": "SINGLE",
                "countryOfBirth": "USA",
                "cityOfBirth": "New York",
                "educationLevel": "BACHELOR",
                "customerClassification": "VIP",
                "status": "ACTIVE"
            }
        ),
        {
            headers: {
                'X-Tenant-Id': 'jm-primetrust',
                'X-Request-Id': 'e30b625a-e085-42a5-aac2-3d52f73ad8fe',
                'Cookie': 'JSESSIONID=82112745BF893834E8C2D06163FDB699',
                'Content-Type': 'application/json',

            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

  sleep(1);
}