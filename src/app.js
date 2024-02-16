import express from "express"
import { config } from "dotenv"
import cors from "cors"
import * as authRoute from "./routes/auth-route.js"
import * as userRoute from "./routes/user-route.js"
import * as circleRoute from "./routes/circle-route.js"
import notFound from "./middlewares/not-found.js";
import errorMiddleware from "./middlewares/error.js";

config();
const app = express();

app.use(cors())
app.use(express.json())

app.use("/auth", authRoute.router)
app.use("/user", userRoute.router)
app.use("/circle", circleRoute.router)


app.use(notFound)
app.use(errorMiddleware)

const PORT = process.env.PORT || 8000 
app.listen(PORT, () => console.log('Server running on port: ', PORT))