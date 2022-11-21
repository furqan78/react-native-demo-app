import { isEmpty } from "../constants/Myfunctions";
import { ApiClient } from "./ApiClient";
const apiClient = new ApiClient();
const axiosInstance = apiClient.getInstance()
export const getHeader = () => {
    return apiClient.getHeader()
}

export const baseApiCall = parameter => {
    let {
        url = '',
        requestBody = {},
        onSuccess = () => { },
        onFailure = () => { },
        invalidCall = () => { },
        errorCall = () => { },
        type = '',
        header = {},
        timeout = null,
        isWrapper = false,
        method = 'POST'
    } = parameter

    let apiHeader = isEmpty(header) ? getHeader() : header

    axiosInstance({
        method: method,
        url: url,
        data: requestBody,
        headers: apiHeader,
    })
        .then(async response => {
            if (response.status === 200) {
                // if (response && response.data.status == 0) {
                    return onSuccess(response)
                // }
                // else {
                // }
            }
            else {
                // return invalidCall(response)
                return onFailure(response)

            }
        })
        .catch(error => {
            console.log(error, 'error');
        });
}