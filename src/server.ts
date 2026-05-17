import express, { type Application, type Request, type Response } from "express"
const app :Application = express()
const port = 5000
import {Pool} from "pg"
app.use(express.json());
app.use(express.text())
app.use(express.urlencoded({extended:true}))


const pool = new Pool({
    connectionString:"postgresql://neondb_owner:npg_ZTNPGMgBm10b@ep-super-bread-aqbnhjku.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require"
})

const initDb=async()=>{
    try{
        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(20) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,


            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `
        )
        console.log("database connected successfully!")

    }
    catch(error){
        console.log(error);
        
    }
}
initDb()


app.get('/', (req:Request, res:Response) => {
//   res.send('Hello World!')
res.status(200).json({
    "message":"welcome"
})
})
app.post ('/',async(req:Request,res:Response)=>{
//   console.log(req.body)\
const {name,email,password,age} = req.body


try{
    const result = await pool.query(
    `INSERT INTO users(name,email,password,age)
    values($1,$2,$3,$4)
    RETURNING *

    `,[name,email,password,age]

)
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
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})