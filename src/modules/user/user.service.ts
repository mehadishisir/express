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
const getAllUserFromDB = async()=>{
    const result = await pool.query(`
        SELECT * FROM users
        `) 
        return result
}
const getSingleUserFromDB = async(id:string)=>{
     const result = await pool.query(`
SELECT * FROM users WHERE id=$1
            
            `,[id])
            return result
}
const updateSingleUserFromDB = async(payloads:IUser,id:string)=>{
    const {name, password, age,is_active}=payloads
    const result = await pool.query(
      `
      UPDATE users
      SET
        name = COALESCE($1, name),
  password = COALESCE($2, password),
  age = COALESCE($3, age),
        is_active = COALESCE ($4,is_active) 
      WHERE id = $5
      RETURNING *
      `,
      [name, password, age,is_active, id]
    );
    return result

}
const deleteUserFromDB = async(id:string)=>{
      const result = await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return result

}

export const userService ={
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteUserFromDB
}