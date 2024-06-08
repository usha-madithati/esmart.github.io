import twilio from "twilio";

const accountSid = "ACfe5021b28e8f76c6effba779195d10f3";
const authToken = "796aaeab6c12c8033b60d41124682fa4";

const client = twilio(accountSid, authToken);

export default client;
