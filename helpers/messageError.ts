import { toast } from 'react-toastify'

export function error(message: string) {
    toast(message, {
        type: 'error',
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
