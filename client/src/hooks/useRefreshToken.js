// import { axiosInstance } from "../api/apiConfig";
// import useAuth from "./useAuth";

// export default function useRefreshToken() {
//     const { isLoggedIn, setAccessToken, setCSRFToken } = useAuth()

//     const refresh = async () => {
//         if(!isLoggedIn){
//             return
//         }
        
//         const response = await axiosInstance.post('auth/refresh-token')
//         setAccessToken(response.data.access)
//         setCSRFToken(response.headers["x-csrftoken"])

//         return { accessToken: response.data.access, csrfToken: response.headers["x-csrftoken"] }
//     }

//     return refresh
// }

import { axiosInstance } from "../api/apiConfig";
import useAuth from "./useAuth";

export default function useRefreshToken() {
    const { isLoggedIn, setAccessToken, setCSRFToken } = useAuth();

    const refresh = async () => {
        if (!isLoggedIn) {
            return;
        }

        try {
            const response = await axiosInstance.post('auth/refresh-token');
            setAccessToken(response.data.access);
            setCSRFToken(response.headers["x-csrftoken"]);

            return {
                accessToken: response.data.access,
                csrfToken: response.headers["x-csrftoken"]
            };
        } catch (error) {
            console.error('Erreur lors du rafraîchissement du token:', error);
            // Gérer l'erreur, par exemple en déconnectant l'utilisateur
        }
    };

    return refresh;
}