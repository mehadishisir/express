import pool from "../../db"
import type { IUser } from "./user.interface"

const createUserIntoDB = async(payloads:IUser)=>{
const{name,email,password,age}=payloads
       const result = await pool.query(
       `INSERT INTO users(name,email,password,age)
       values($1,$2,$3,$4)
       RETURNING *
   
       `,[name,email,password,age])
   return result
}

export const userService ={
    createUserIntoDB,
}