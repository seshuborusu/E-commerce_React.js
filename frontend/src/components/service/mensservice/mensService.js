import axios from "axios";
function mensService(){
    return axios.get("http://localhost:1234/getmensclothing")
}
export default mensService