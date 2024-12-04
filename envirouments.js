import http from 'k6/http';
//k6 run -e BASE_URL=https://test-api.k6.io envirouments.js  
export default function () {

    http.get(`${__ENV.BASE_URL}/public/crocodiles/`);

    console.log(__ENV.BASE_URL)
}