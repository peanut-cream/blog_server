import axios from "axios";
let fetch=axios.create({
    baseURL: 'http://localhost:4321/admin',
    withCredentials:true
})
export default fetch;