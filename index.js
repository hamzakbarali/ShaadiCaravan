import app      from "./app.js";
import http     from "http";
import mongoose from "mongoose";


async function startServer(){
	app.listen(process.env.PORT, () => {
		console.log(`Server connected on PORT ${process.env.PORT}`);
	})
}

const server = http.createServer(app);

mongoose.connect(process.env.DB_STRING).then(()=>{
	console.log("DB CONNECTED");
}).then(() => {
	startServer();
});

// startServer();