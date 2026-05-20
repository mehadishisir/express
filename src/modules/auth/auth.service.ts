import bcrypt from "bcryptjs";
import pool from "../../db"
import jwt from "jsonwebtoken";
import { config } from "../../config";

const loginUserIntoDB = async (payloads:{email:String,password:string}) => {
    const {email,password}=payloads
    // 1 check is the user exists 
    // 2 compare the password
    // 3 generate token


    // 1

    const userData = await pool.query(
        `
        SELECT * FROM users WHERE email=$1
        
        `,[email]
    )
    if(userData.rows.length===0){
        throw new Error("Invalid credentials!");
        
    }
    // 2 compare the password

    const user = userData.rows[0]
    const matchPassword = await bcrypt.compare(password,user.password)
    if (!matchPassword) {
        throw new Error("Invalid Credentials!");
        
    }

    // 3 generate token
  const jwtpayload = {
    id : user.id,
    name: user.name,
    is_active: user.is_active,
    email: user.email,
  }
  const accessToken = jwt.sign(jwtpayload,config.secret as string,{
    expiresIn:"1d",
  })
  return {accessToken}
}

export const authService = {
    loginUserIntoDB
}