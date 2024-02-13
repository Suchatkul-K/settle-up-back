import express from "express"
import { config } from "dotenv"
import cors from "cors"
import * as authRoute from "./routes/auth-route.js"

config();
const app = express();

app.use(cors())
app.use(express.json())

app.use("/auth", authRoute.router)


const PORT = process.env.PORT || 8000 
app.listen(PORT, () => console.log('Server running on port: ', PORT))