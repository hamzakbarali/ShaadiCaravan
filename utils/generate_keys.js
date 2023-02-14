import crypto from "crypto";

const ACCESS_TOKEN_PRIVATE_KEY = crypto.randomBytes(32).toString("hex");
const REFRESH_TOKEN_PRIVATE_KEY = crypto.randomBytes(32).toString("hex");

console.table({ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PRIVATE_KEY});

