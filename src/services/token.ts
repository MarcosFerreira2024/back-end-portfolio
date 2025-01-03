import JWT from "jsonwebtoken"

export const verifyToken = async (token: string) => {

  try {
    const verifiedData = JWT.verify(token, process.env.MY_SECRET_KEY as string);

    const decoded = verifiedData as { email: string };

    return decoded.email; 
    
  } 
  catch {
    return null;
    
  }
};

export const getToken = async (authorization:string)=>{
  
  if (authorization&&authorization.startsWith("Bearer")){
    const token =  (authorization as string).split(" ")[1]

    return token

  }
  return null
}



