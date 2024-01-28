import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TopReposService {

    async getTop() {
        try {
            // Obtenemos los repositorios más populares del usuario "google" usando el middleware axios 
            const response = await axios.get('https://api.github.com/users/google/repos', {
                params: {
                    sort: 'stars',
                    per_page: 10,
                },
            });

            // Extraeemos la información relevante de cada repositorio
            const popularRepos = response.data.map((repo: any) => ({
                name: repo.name,
                description: repo.description,
                stars: repo.stargazers_count,
                url: repo.html_url,
            }));

            // Devolvemos los 10 repositorios más populares
            return popularRepos;
        } catch (e: any) {
            console.error('Error al obtener los repositorios:', e.message);
            throw new HttpException(e, 500)
        }
    }
}

