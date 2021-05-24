import axios from "@/utils/request";

interface SendPhoneAuthCodeProps {
  phone: string;
}

/**
 * Request an auth code to be sent to phone
 */
export const sendPhoneAuthCode = async ({ phone }: SendPhoneAuthCodeProps) => {
  await axios.post("/user/authcode", { phone });
};
