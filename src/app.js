import express from "express"
import { config } from "dotenv"
import cors from "cors"


config();
const app = express();

app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 8000 
app.listen(PORT, () => console.log('Server running on port: ', PORT))