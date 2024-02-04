import axios from 'axios';

//*** API CLIENT ***/
const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

// Create API Axios instance
const apiClient = axios.create({
    baseURL: apiBaseURL
});


export { apiClient };