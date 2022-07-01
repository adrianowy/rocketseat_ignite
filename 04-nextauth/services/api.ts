import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/AuthContext';

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue: any[] = [];

export const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        Authorization: `Bearer ${cookies['nextauth.token']}`
    }
});

interface AxiosErrorResponse {
    code?: string;
}

api.defaults.headers.common['Authorization'] = `Bearer ${cookies['nextauth.token']}`;

api.interceptors.response.use(response => {
    return response;
}, (error: AxiosError<AxiosErrorResponse>) => {
    console.log(error.response?.status);

    if(error.response?.status === 401){
        if(error.response.data?.code === 'token.expired'){
            //renovar o token
            cookies = parseCookies();
            const { 'nextauth.refreshToken': refreshToken } = cookies;
            const originalConfig = error.config;

            if(!isRefreshing){
                isRefreshing = true;

                api.post('/refresh', {refreshToken})
                .then(response => {

                    const { token } = response.data;

                    setCookie(undefined, 'nextauth.token', token, {
                        maxAge: 60 * 60 * 24 * 30, // 30 dias
                        path: '/'
                    });

                    setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
                        maxAge: 60 * 60 * 24 * 30, // 30 dias
                        path: '/'
                    });

                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    failedRequestsQueue.forEach((request) => {
                        request.onSucess(token);
                    });
                    failedRequestsQueue = [];
                })
                .catch(err => {
                    failedRequestsQueue.forEach((request) => {
                        request.onFailure(error)
                    });
                    failedRequestsQueue = [];
                })
                .finally(() => {
                    isRefreshing= false
                });
            }

            return new Promise((resolve, reject) => {
                failedRequestsQueue.push({
                  onSuccess: (token: string) => {
                    // quando o processo de refresh estiver finalizado
                    originalConfig?.headers["Authorization"] = `Bearer ${token}`;
    
                    resolve(api(originalConfig));
                  },
                  onFailure: (err: AxiosError) => {
                    // quando ocorrer algum erro
                    reject(err);
                  }
                });
              });

        } else {
            // o erro pode não ser do tipo token expirado, portanto o usuário é deslogado
            signOut();
            /* if (typeof window !== "undefined") {
              // Verifia se está no browser. Ele só faz o logout usando a função signOut, se estiver no cliente(browser).
              signOut();
            } else {
              // return Promise.reject(new AuthTokenError())
            } */
        }
    }

    return Promise.reject(error);
});