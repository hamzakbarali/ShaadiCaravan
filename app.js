import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routes/auth/auth.route.js";
const app = express();

const whitelist = ["http://localhost:3000/"];
const corsOptions = {
	origin: whitelist[0],
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json());
app.use(bodyParser.urlencoded({
	limit: "30mb",
	extended: true
}));
app.use(bodyParser.json({
	limit: "30mb",
	extended: true,
}));

// Routes //
app.use("/auth", authRouter);


export default app;