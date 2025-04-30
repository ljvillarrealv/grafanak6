import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    stages: [                   // --->>> Ramp - UP
        {   
            duration: '5',  // Primera etapa: dura 10 segundos. 
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
        http_req_duration: ['p(95)<200'],
        http_req_duration: ['max<2000'],
        http_req_failed: ['rate < 0.01'],
        http_reqs:['count>20'],
        http_reqs:['rate>3']
        
    }
}

export function randomNumber(length = 4) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10); // Genera un dígito aleatorio (0-9)
    }
    return result;
  }

export default function () {


    let res = http.put('https://t-customers-api.novopayment.net/api-npd-customers-update-ms/v1/customers/a3a9c82f-1164-4ef0-b8b5-c202b7678990/identifications',
        JSON.stringify(
            {
                "identifications": [
                    {
                        "type": "NATIONAL_ID",
                        "number": "107664821111"+ randomNumber(),
                        "issueDate": "2015-01-31",
                        "expiryDate": "2025-01-01",
                        "mrz": "P<USADOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<1234567890USA8001019M2401017<<<<<<<<<<<<<<<<<04",
                        "nationality": "USA",
                        "issuingCountry": "USA",
                        "primary": true
                    },
                    {
                        "type": "PASSPORT",
                        "number": "A123456781"+ randomString(4),
                        "issueDate": "2015-01-31",
                        "expiryDate": "2025-01-01",
                        "mrz": "P<USADOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<1234567890USA8001019M2401017<<<<<<<<<<<<<<<<<04",
                        "nationality": "USA",
                        "issuingCountry": "USA",
                        "primary": true
                    },
                    {
                        "type": "RESIDENCE_PERMIT",
                        "number": "A1234567891"+ randomNumber() ,
                        "issueDate": "2015-01-31",
                        "expiryDate": "2025-01-01",
                        "mrz": "P<USADOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<1234567890USA8001019M2401017<<<<<<<<<<<<<<<<<04",
                        "nationality": "USA",
                        "issuingCountry": "USA",
                        "primary": true
                    },
                    {
                        "type": "SOCIAL_SECURITY",
                        "number": "A12000091"+ randomNumber(),
                        "issueDate": "2015-01-31",
                        "expiryDate": "2025-01-01",
                        "mrz": "P<USADOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<1234567890USA8001019M2401017<<<<<<<<<<<<<<<<<04",
                        "nationality": "USA",
                        "issuingCountry": "USA",
                        "primary": true
                    },
                    {
                        "type": "TAX_ID",
                        "number": "A120760091"+ randomNumber(),
                        "issueDate": "2015-01-31",
                        "expiryDate": "2025-01-01",
                        "mrz": "P<USADOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<1234567890USA8001019M2401017<<<<<<<<<<<<<<<<<04",
                        "nationality": "USA",
                        "issuingCountry": "USA",
                        "primary": true
                    },
                    {
                        "type": "BUSINESS_LICENSE",
                        "number": "A120760091"+ randomNumber(),
                        "issueDate": "2015-01-31",
                        "expiryDate": "2025-01-01",
                        "mrz": "P<USADOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<1234567890USA8001019M2401017<<<<<<<<<<<<<<<<<04",
                        "nationality": "USA",
                        "issuingCountry": "USA",
                        "primary": true
                    },
                    {
                        "type": "REGISTRATION_CERT",
                        "number": "A120760091"+ randomNumber(),
                        "issueDate": "2015-01-31",
                        "expiryDate": "2025-01-01",
                        "mrz": "P<USADOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<1234567890USA8001019M2401017<<<<<<<<<<<<<<<<<04",
                        "nationality": "USA",
                        "issuingCountry": "USA",
                        "primary": true
                    },
                    {
                        "type": "VAT_NUMBER",
                        "number": "A120760091"+ randomNumber(),
                        "issueDate": "2015-01-31",
                        "expiryDate": "2025-01-01",
                        "mrz": "P<USADOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<1234567890USA8001019M2401017<<<<<<<<<<<<<<<<<04",
                        "nationality": "USA",
                        "issuingCountry": "USA",
                        "primary": true
                    },
                    {
                        "type": "DRIVER_LICENSE",
                        "number": "D12345678"+ randomNumber(),
                        "issueDate": "2018-01-01",
                        "expiryDate": "2028-01-01",
                        "issuingCountry": "USA",
                        "primary": false
                    }
                ]
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