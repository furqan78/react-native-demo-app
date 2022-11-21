import axios from "axios";

export class ApiClient {
    constructor(){
        this.axiosInstance = axios.create({
            baseURL: '',
        })

        this.axiosInstance.interceptors.response.use(
            response => {
                if(typeof(response.data) == 'string'){
                    response['data'] =JSON.parse(response.data)
                    return response
                }else{
                    return response
                }
            },
            error => errorHandler(error)
          )
    }

    getInstance = () => {
        return this.axiosInstance;
    }

    getHeader = () => {
        let returnHeader = {
            'Content-Type': 'application/json',
        }
        console.log('BASE API HEADER',returnHeader)
        return returnHeader
    }
}