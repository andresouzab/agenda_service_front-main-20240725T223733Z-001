import axios from 'axios';

//Criar uma instância Axios com a Url do Backend
// baseURL é a porta que está o backend
export const api = axios.create({
    baseURL: 'http://localhost:8080'
});