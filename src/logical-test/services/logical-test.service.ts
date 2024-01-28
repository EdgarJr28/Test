import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class LogicalTestService {


    trigonometricFunction(x: number, y: number, z: number) {
        // hacemos suma de las variables X y Y.
        let suma = x + y;
        // aplicamos un producto reutilizando el valor de la variable suma que multiplica la variable Z.
        let product = suma * z;
        // usamos la variable sine para obtener el valor del seno de nuestro producto calculado anteriormente.
        let sine = Math.sin(product);

        //retornamos como respuesta el resultado que es nuestra variable sine.
        return { value: sine };
    }

    oddUntilN(number: number) {
        try {
            // Validamos que el number ingresado sea mayor que 0 
            if (number < 1 || !Number.isInteger(number)) {
                throw new Error('Por favor, proporciona un número entero positivo mayor o igual a 1.');
            }

            // creamos el array para los numbers impares.
            const odd: number[] = [];

            //usamos un for para ordenar el arreglo con los numbers impares
            for (let i = 1; i <= number; i += 2) {
                odd.push(i);
            }
            // retornamos el array con los numeros impares.
            return { "numbers": odd }

        } catch (e: any) {
            throw new HttpException(e, 500)
        }

    }
}
