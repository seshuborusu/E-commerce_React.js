import axios from "axios";
function womensService(){
    return axios.get("http://localhost:1234/getwomensclothing")
}
export default womensService