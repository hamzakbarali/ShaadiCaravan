import express       from "express";
import cors          from "cors";
import dotenv        from "dotenv";
import bodyParser    from "body-parser";
import morgan        from "morgan";
import helmet        from "helmet";
import authRouter    from "./routes/auth/auth.routes.js";
import reviewRouter  from "./routes/review/review.routes.js";
import profileRouter from "./routes/profile/profile.routes.js";
import serviceRouter from "./routes/service/service.routes.js";
import formRouter    from "./routes/form/form.routes.js"; 

// Preliminary Setup //
const app         = express();
const whiteList   = ["http://127.0.0.1:5173"];
const corsOptions = {
	origin: whiteList[0],
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({
	extended: true,
	limit   : "30mb"
}));
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(helmet());
dotenv.config({
	path: "./.env"
});


// Auth Routes //
app.use("/api/auth", authRouter);

// Profile Routes //
app.use("/api/profile", profileRouter);

// Service Routes //
app.use("/api/service", serviceRouter);

// Review Routes //
app.use("/api/review", reviewRouter);

// Form Routes //
app.use("/api/form", formRouter);


export default app;