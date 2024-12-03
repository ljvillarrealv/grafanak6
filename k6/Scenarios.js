import http from 'k6/http';
import {check} from 'k6';

export default function (){
    const res = http.get('https://test.k6.io');
    check( true, {
        'Caso true is true': (value) => value === true
    })
    check( res, {
        'Caso response is 200': (response) => response.status === 200
    })

    check( res, {
        'Caso Pagina principal': (response) => response.body.includes ('Collection of simple web-pages suitable for load testing.') === true
    })

}


