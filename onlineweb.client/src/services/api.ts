import type { Product } from '../models/types';

// TODO: check this port number against your running C# backend
const API_BASE_URL = 'https://localhost:7019/api';

export const apiService = {
    // funtion
    getProducts: async (): Promise<Product[]> => {
        try {
            // sending request to ProductsController
            const response = await fetch(`${API_BASE_URL}/Products`);

            // If server send error, call this exception
            if (!response.ok) {
                throw new Error(`Chyba při stahování dat: ${response.status}`);
            }

            // The data from the server will come as JSON, we will convert it here to an array of our Product objects
            const data: Product[] = await response.json();
            return data;

        } catch (error) {
            console.error('Došlo k chybě při komunikaci s API:', error);
            // Handling errors for homepage
            throw error;
        }
    }
};