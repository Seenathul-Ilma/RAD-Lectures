import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "http://localhost:5000/api/v1"
})

const PUBLIC_ENDPOINTS = ["/auth/register", "/auth/login"]

// interceptors
axiosConfig.interceptors.request.use((myConfig) => {

    //myConfig.headers  // headers eliyta ganna puluvan
    //myConfig.url      // inne kothanada kiyl blgnna puluvan (URL)

    const token = localStorage.getItem("accessToken")

    const isPublic = PUBLIC_ENDPOINTS.some((url) => myConfig.url?.includes(url))

    if(token && !isPublic) {
        myConfig.headers.Authorization = `Bearer ${token}`
    }

    return myConfig
})

export default axiosConfig