import express from "express";
import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({path: ".dotenv"});

http.createServer(app);

async function startServer(){
	app.listen(process.env.PORT, () => {
		console.log(`Listening on port ${process.env.PORT}`);
	});
}

mongoose.connect(process.env.MONGODB_CONNECTION).
then(() => {
	console.log(`DB connected`);
}).then(() => {
	startServer();
});
