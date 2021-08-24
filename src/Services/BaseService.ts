import { ERROR_CODES, SUCCESS_CODES } from '../Constants/Messages'

export const notificationMsg = (response: any, codeKey: any | null) => {
    if (response && response.status === 200) {
        if (!codeKey) {
            return 'Success!'
        }
        return SUCCESS_CODES[codeKey];
    }
    if(response && response.response && response.response.data.errors) {
        return ERROR_CODES[response.response.data.errors]
    } else {
        return "Something's Wrong!";
    }
};