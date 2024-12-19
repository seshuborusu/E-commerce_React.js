import axios from "axios"
function jewelleryService(){
    return axios.get("http://localhost:1234/getjewelery")
}
export default jewelleryService