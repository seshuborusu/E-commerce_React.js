const jwt = require("jsonwebtoken")
const secret_Key = "asbncjhbcnvhj";


const jwtAuthentication = (request, response, next)=> {

    let jwtToken;
 
    const authenticationHeaders = request.headers['authorization']
    
    if(authenticationHeaders !== undefined){
        jwtToken = authenticationHeaders.split(" ")[1]
    }
 
    if(authenticationHeaders === undefined){
        return response.status(401).json({message: "Invalid JSON Web Token"})
    }
    
    else{
        
        jwt.verify(jwtToken,secret_Key , async (error, payload)=> {
            if(error)
            {
                return response.status(401).json({message: 'Error at Token Verification'})
            }
            else
            {
                request.id = payload.userid
                next()
            }
        })
    }
 };
 module.exports=jwtAuthentication