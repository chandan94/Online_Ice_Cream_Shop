import axios, { AxiosError, AxiosResponse } from "axios";
import { ICE_CREAM_URL } from "../ics-constants";
import { GetAllICreamPayload } from "./icream/icream.types";

export const axiosGetCall = async (route:string , query: GetAllICreamPayload , count : number = 6,  body: any = null, token = null) => {

    let search = "";
    let page = 1;
    let filter = "";
    let offset = 0;

    if (route === ICE_CREAM_URL) {
         ({ search, page, filter } = query);
         if (page > 0) {
            offset = (offset - 1) * count;
        }
        route = `${route}?search=${search}&filter=${filter}&offset=${offset}&limit=${count}`;
    }


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



    return axios.get(route, {
        data: body
    }).then(onSuccess)
        .catch(onError);
}

// export const axiosGet = (url) => {
//     return axios.get(url)
//                 .then(res
// }