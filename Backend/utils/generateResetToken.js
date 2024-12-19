import crypto from "crypto";

export const generateResetToken = () => {
  return crypto.randomBytes(8).toString("hex");
};
