const API_BASE_URL = 'https://the-one-api.dev/v2';
const API_TOKEN = 'yZlpAjUItVvJgcREkgXw';

class API {
    static async fetch(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = `${API_BASE_URL}${endpoint}${queryString ? '?' + queryString : ''}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static async getMovies(params = {}) {
        return this.fetch('/movie', params);
    }

    static async getCharacters(params = {}) {
        return this.fetch('/character', params);
    }

    static async getQuotes(params = {}) {
        return this.fetch('/quote', params);
    }

    static async getMovieQuotes(movieId) {
        return this.fetch(`/movie/${movieId}/quote`);
    }
}