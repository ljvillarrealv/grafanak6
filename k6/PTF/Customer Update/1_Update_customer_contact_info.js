import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [                   // --->>> Ramp - UP
        {   
            duration: '5',  // Primera etapa: dura 10 segundos. 
            target: 100        // Durante esta etapa, el número de usuarios virtuales (VUs) incrementará hasta 10.
        },
        {
            duration: '10s',  // Segunda etapa: dura 20 segundos.
            target: 200        // En esta etapa, el número de VUs se mantiene constante en 10.
        },
        {                       //Ramp -Down
            duration: '5s',  // Tercera etapa: dura 10 segundos.
            target: 10         // Durante esta etapa, el número de VUs se reduce gradualmente a 0.
        }
    ],
    thresholds:{
        http_req_duration: ['p(95)<200'],
        http_req_duration: ['max<2000'],
        http_req_failed: ['rate < 0.01'],
        http_reqs:['count>20'],
        http_reqs:['rate>3']
        
    }
}

export default function () {


    let res = http.put('https://t-customers-api.novopayment.net/api-npd-customers-update-ms/v1/customers/c5a6178d-d9f1-46a8-be59-18fa50f6d0bb/contact-info',
        JSON.stringify(
            {
                phones: [
                    {
                      type: 'WORK',
                      countryCode: 'USA',
                      dialingCode: '+1',
                      number: '3138441475',
                      primary: true,
                    },
                  ],
                  emails: [
                    {
                      type: 'PERSONAL',
                      emailAddress: 'lvillarrealv@gmail.com',
                      primary: true,
                    },
                  ],
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
