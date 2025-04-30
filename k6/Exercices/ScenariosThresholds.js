import http from 'k6/http';
import {check} from 'k6';
import {sleep} from 'k6';

export const options ={
    vus:10,
    duration: '5s',
    thresholds:{
        http_req_duration: ['p(95)<200'],
        http_req_duration: ['max<2000'],
        http_req_failed: ['rate < 0.01'],
        http_reqs:['count>20'],
        http_reqs:['rate>3'],
        vus:['value>8']
    }

}



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
    sleep(2);

}


