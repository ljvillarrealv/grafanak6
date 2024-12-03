import http from 'k6/http';
import { sleep } from 'k6';
import {Counter} from 'k6/metrics';

export const options = {
   vus:5,
   duration: '5s',
   thresholds:{
    http_req_duration: ['p(95)<250'],

   }

}

let myCounter = new Counter('my_counter');

export default function () {
    http.get('https://test.k6.io')
    sleep(1)
    myCounter.add(1);
}