import http from 'k6/http';
import { check } from 'k6';
import { sleep} from 'k6';

stages: [
    {
        duration: '10s',
        target: '10'
    },
    {
        duration: '20s',
        target: '15'
    },
    {
        duration: '10s',
        target: '0'
    }
]


/*
export const options = {
    vus: 10,
    duration: '10s'
    
    }*/

export default function () {



    let res = http.post('https://thinking-tester-contact-list.herokuapp.com/users',
        JSON.stringify(
            {
                firstName: 'test_' + Date.now(),
                lastName: 'last' + Date.now(),
                email: Date.now() + 'prueba@test.com',
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
    console.log(res)

    // Parsear el body de la respuesta como JSON
    let responseBody = JSON.parse(res.body);

    // Capturar el valor del token
    let token = responseBody.token;

    // Imprimir el token en la consola
    console.log(`Token obtenido: ${token}`);

    let res2 = http.post('https://thinking-tester-contact-list.herokuapp.com/contacts',
        JSON.stringify(
            {
                firstName: 'test_' + Date.now(),
                lastName: 'last' + Date.now(),
                email: Date.now() + 'prueba@test.com',
                birthdate: '1989-01-01',
                "phone": '8003075871',
                "street1": '785 Main St.',
                "street2": 'Apartment 8',
                "city": 'Anytown',
                "stateProvince": "KS",
                "postalCode": '26447',
                "country": 'USA'
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            }
        }
    );

    check(res2, {
        'Caso 2 response is 201': (response) => response.status === 201

    })
    console.log(res2)

     // Parsear el body de la respuesta como JSON
     let responseBody2 = JSON.parse(res2.body);

     // Capturar el valor del token
     let id = responseBody2._id;
 
     // Imprimir el token en la consola
     console.log(`id obtenido: ${id}`);
     sleep(2);
}