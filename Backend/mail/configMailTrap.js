import { MailtrapClient } from "mailtrap";

// ? console.log("Mail Token : ", process.env.MAILTRAP_TOKEN);

export const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Authentication",
};
