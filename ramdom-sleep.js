//Para simular un comportamiento mas parecido al real ramdorizando el sleep

import http from 'k6/http';
import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    vus: 5,
    duration: '20s'
}

export default function () {
    http.get('https://test.k6.io');

    console.log('- VU stage -');
    sleep(randomIntBetween(1, 5)); // Es una función nativa de K6 que pausa la ejecución del script por un período de tiempo especificado en segundos.
                                  // En este caso, el tiempo de pausa es dinámico, ya que se genera mediante la función randomIntBetween.
}