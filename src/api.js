import axios from 'axios'
// import TokenService from './tokenservice'

// const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZ1YXRjeXBAZ21haWwuY29tIiwidXNlcl9pZCI6MSwiaWF0IjoxNjI4MDIyMTMwLCJleHAiOjE2MjgxMDg1MzB9.LzGjtEx3gfy8Xp_Ea1LYT_u68IYbL2GG7Zokq0QGzro";
const api_key = " f1a7c8f477145ef3ea4bfe594a5e238e2f1d5bed236101863e0ca3a690dc8e2fde6ed01fad26c1dafe1ec1f0f32a515ad05f7e769b237515488ff327bbb61e60";

const ApiService = {

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
        this.setHeader();
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] = 'Bearer' + localStorage.getItem('token');
        // axios.defaults.headers.common["ACCESS_TOKEN"] = access_token;
        axios.defaults.headers.common["API_KEY"] = api_key;
    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },

    get(resource, config = null) {
        return axios.get(resource, config)
    },

    post(resource, data, config = null) {
        return axios.post(resource, data, config)
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },

    /*
    * Perform a custom Axios request.
  *
  * data is an object containing the following properties:
    *  - method
  *  - url
  *  - data ... request payload
  *  - auth (optional)
  *    - username
  *    - password
  */

    customRequest(data) {
        return axios(data)
    }
}

export default ApiService
