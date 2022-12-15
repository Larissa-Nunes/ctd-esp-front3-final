import { toast } from 'react-toastify'

export function success(message: string) {
    toast(message, {
        type: 'success',
        theme: "colored",
        position: "top-left",
        autoClose: 6000,
        draggable: true,
        progress: undefined,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    });
}