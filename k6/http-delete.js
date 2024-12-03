import http from 'k6/http';
import { check } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


/*Para ejecutar el scripts con la sintaxis -------

k6 run .\http-delete.js

*/

export const options = {
    stages: [                   // --->>> Ramp - UP
        {   
            duration: '5',  // Primera etapa: dura 10 segundos. 
            target: 10        // Durante esta etapa, el número de usuarios virtuales (VUs) incrementará hasta 10.
        },
        {
            duration: '10s',  // Segunda etapa: dura 20 segundos.
            target: 10        // En esta etapa, el número de VUs se mantiene constante en 10.
        },
        {                       //Ramp -Down
            duration: '5s',  // Tercera etapa: dura 10 segundos.
            target: 0         // Durante esta etapa, el número de VUs se reduce gradualmente a 0.
        }
    ],
    thresholds:{
        http_req_duration: ['p(95)<200'],
        http_req_duration: ['max<2000'],
        http_req_failed: ['rate < 0.01'],
        http_reqs:['count>20'],
        http_reqs:['rate>3'],
        vus:['value>8']
    }
}

export default function () {

    const credentials = {
        username: 'test_' + randomString(8),
        password: 'secret_' + randomString(8),
    }

    http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
   // sleep(randomIntBetween(1, 5)); // Es una función nativa de K6 que pausa la ejecución del script por un período de tiempo especificado en segundos.
                                  // En este caso, el tiempo de pausa es dinámico, ya que se genera mediante la función randomIntBetween.

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const accessToken = res.json().access;
    //console.log(accessToken);

    http.get(
        'https://test-api.k6.io/my/crocodiles/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    res = http.post(
        'https://test-api.k6.io/my/crocodiles/',
        JSON.stringify(
            {
                name: 'Random croc',
                sex: 'M',
                date_of_birth: '1900-10-28'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );
    const newCrocodileId = res.json().id;

    res = http.get(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile id': (r) => r.json().id === newCrocodileId
    });

    res = http.put(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify(
            {
                name: 'Updated Random croc',
                sex: 'M',
                date_of_birth: '1900-10-28'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );

    res = http.patch(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify(
            {
                sex: 'F'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    ); 

    res = http.del(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        null,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );    

}