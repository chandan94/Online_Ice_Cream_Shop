import axios, { AxiosError, AxiosResponse } from "axios";
import { GetAllICreamPayload } from "./icream.types";

export const axiosGetCall = async (route:string , query: GetAllICreamPayload , count : number = 6,  body: any = null, token = null) => {

    const { search, page } = query;

    const onSuccess = (response : AxiosResponse) => {
        console.debug('Request Successful!', response);
        return response.data;
    }

    const onError =  (error: AxiosError) => {
        console.error('Request Failed:', error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);

        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.error('Error Message:', error.message);
        }

        return Promise.reject(error.response || error.message);
    }

    let offset = page;

    if (offset > 0) {
        offset = (offset - 1) * count;
    }

    return axios.get(`${route}?search=${search}&offset=${offset}&limit=${count}`, {
        data: body
    }).then(onSuccess)
        .catch(onError);
}

// export const axiosGet = (url) => {
//     return axios.get(url)
//                 .then(res
// }