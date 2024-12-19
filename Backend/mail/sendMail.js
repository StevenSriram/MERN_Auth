import { VERIFICATION_EMAIL_TEMPLATE } from "./EmailTemplate.js";

import { client, sender } from "./configMailTrap.js";

export const sendVerificationMail = async (email, verificationToken) => {
  const recipients = [{ email }];

  const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    verificationToken
  );

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Verify Your Email",
      html: htmlContent,
      category: "Verification",
    });

    console.log("Verify email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
