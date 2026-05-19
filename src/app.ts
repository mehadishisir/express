import express, { type Application, type Request, type Response } from "express"
import pool from "./db";

import router from "./modules/user/user.routes";
const app :Application = express()


app.use(express.json());
app.use(express.text())
app.use(express.urlencoded({extended:true}))





app.get('/', (req:Request, res:Response) => {
//   res.send('Hello World!')
res.status(200).json({
    "message":"welcome"
})
})

app.use("/api/users",router)




  
export default app