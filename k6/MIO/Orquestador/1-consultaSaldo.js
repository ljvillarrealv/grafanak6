import http from 'k6/http';
import { Counter } from 'k6/metrics'; // Importar la clase Counter de k6/metrics
import { check, sleep } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export function handleSummary(data) {
    console.log("Se está ejecutando handleSummary");

    // Obtener fecha y hora actual
    const now = new Date();
    const dateTime = now.toISOString().replace(/[:.]/g, '-'); // Ej: 2025-04-23T18-45-12-123Z

     // Calcular duración total del test en segundos
     const duration = (data.state.testRunDurationMs || 0) / 1000; // en segundos
     const totalRequests = data.metrics.http_reqs ? data.metrics.http_reqs.count : 0;
 
     // Calcular TPS promedio
     const tps = duration > 0 ? totalRequests / duration : 0;
 
     // Agregar TPS como métrica personalizada al objeto de resumen
     data.metrics.tps = {
         type: 'counter',
         contains: 'default',
         values: {
             count: tps
         }
     };


    return {
        [`consultaSaldo-${dateTime}.html`]: htmlReport(data, { debug: false }),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    };
}




export const options = {
    thresholds: {
        http_req_duration: ['p(95)<2000'],  // 95% de las respuestas deben ser menores a 2000ms
        http_req_failed: ['rate<0.01'],     // Menos del 1% de errores (fallos HTTP)
        http_reqs: ['rate>3'],              // Debe haber más de 3 req/seg (TPS promedio)
      },
    scenarios: {
      ramping_tps: {
        executor: 'ramping-arrival-rate',
        startRate: 1,               // Comienza con 1 transacción por segundo
        timeUnit: '0.1s',             // La unidad de tiempo para "rate" es por segundo
        preAllocatedVUs: 20,        // VUs reservados para comenzar
        maxVUs: 50,                 // Máximo de VUs (usuarios Virtuales) que puede usar si necesita escalar
        stages: [
          { duration: '10s', target: 5 },   // Ramp-Up: sube a 5 TPS
          { duration: '20s', target: 10 },  // Sostiene 10 TPS
          { duration: '10s', target: 1 },   // Ramp-Down: baja a 1 TPS
        ],
      },
    },
  };
    
  const tpsMetric = new Counter('tps'); 

const url = 'https://t-tomcat-mio.novopayment.net/account-core/v1/mio-rd/retail/4E06027DDFB93EC4/accounts/D700E285D2133424104C902999F02F64D5E3D9F9/balance';

export default function () {
    const res = http.get(url);
    JSON.stringify(
           {
        headers : {
        'x-request-id': 'balance-12',
        'Cookie': 'hello-cookie=0b0c4725e367ddfb3bc3c6be12bcbb77|e782ee1461cec7904bb77d690dad9cb2',
 } });
    

    
 check(res, {
    'status is 200': (res) => res.status === 200,  // Cambiar r por res
});

console.log(res.body);
tpsMetric.add(1); // Cuenta cada transacción como una "TPS"
    

    sleep(1);
}