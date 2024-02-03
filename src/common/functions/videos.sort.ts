import { HttpException } from "@nestjs/common";

// funcion para organizar el filename de las imagenes subidas.
export async function createUrlDocuments(files: any[], index = 0): Promise<any> {

    try {
        const responses: any = {};

        if (index >= files.length) {
            return responses;
        }

        if (files[index]) {
            responses[`pic${index + 1}`] = files[index].filename
        } else {
            responses[`pic${index + 1}`] = "";
        }
        return {
            ...responses,
            ...(await createUrlDocuments(files, index + 1))
        };
    } catch (e: any) {
        console.log(e.message)
        throw new HttpException(e.message, 500)
    }


}
