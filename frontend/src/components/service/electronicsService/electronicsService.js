import axios from "axios"
function electronicsService(){
return axios.get("http://localhost:1234/getelectronics")
}
export default electronicsService