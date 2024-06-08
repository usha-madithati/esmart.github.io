import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.SID;
const authToken = process.env.AUTHTOKEN;

const client = twilio(accountSid, authToken);

export default client;
