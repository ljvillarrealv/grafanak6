import http from 'k6/http';
import { check } from 'k6';
import { sleep} from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    vus: 10,
    duration: '10s'
    
    }

export default function () {



    let res = http.post('https://thinking-tester-contact-list.herokuapp.com/users',
        JSON.stringify(
            {
                firstName: 'test_' + randomString(8),
                lastName: 'last' + randomString(8),
                email: randomString(8) + 'prueba@test.com',
                password: 'pass12' + Date.now()
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json',

            }
        }
    );

    check(res, {
        'Caso response is 201': (response) => response.status === 201

    })
    //console.log(res)

}