import type { Request, Response } from "express"
import { userService } from "./user.service"

const createUser = async (req:Request,res:Response) => {
    try{
    const result = await userService.createUserIntoDB(req.body)
    
    res.status(201).json(
        {
            message : "succeessfully created user",
            data: result.rows[0]
    
        }
    )
    }catch(error:any){
    res.status(500).json(
        {
            message : error.message,
            error : error,
            
    
        }
    )
    }
}
const getAllUser = async (req:Request,res:Response)=>{
     
        try{
const result = await userService.getAllUserFromDB()
        res.status(200).json(
          {
            success:true,
            message:"users retrive successfully",
            data : result.rows
          }
        )
        }catch(error:any){
  res.status(200).json(
          {
            success:false,
            message:error.message,
            error:error
            
          }
        )
        }
}
const getSingleUser = async(req:Request,res:Response)=>{
    const id = req.params.id
    try{
       const result=await userService.getSingleUserFromDB(id as string)

            if(result.rows.length===0){
                res.status(404).json({
                success:false,
                message:"user not found",
                data:{}
                
            })
            }
            res.status(200).json({
                success:true,
                message:"get this user successfully",
                data:result.rows[0]
            })

    }catch(error:any){
  res.status(500).json({
                success:false,
                message:error.message,
                error:error
            })
    }
}
const updateSingleUser =  async (req: Request, res: Response) => {

  try {

    const id = req.params.id;

    

    const result = await userService.updateSingleUserFromDB(req.body,id as string)
    // user not found
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0]
    });

  } catch (error: any) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });

  }


}
const deleteUser =  async (req: Request, res: Response) => {

  try {

    const id = req.params.id;

  const result = await userService.deleteUserFromDB(id as string)
    // user not found
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0]
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}


export const userControler ={
    createUser,
    getAllUser,
    getSingleUser,
    updateSingleUser,
    deleteUser
}