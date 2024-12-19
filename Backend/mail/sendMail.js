import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_TEMPLATE_ID,
} from "./EmailTemplate.js";

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

export const sendWelcomeMail = async (email, name) => {
  const recipients = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      template_uuid: WELCOME_TEMPLATE_ID,
      template_variables: {
        company_info_name: "Authentication Company",
        name: name,
      },
    });

    console.log("Welcome email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
