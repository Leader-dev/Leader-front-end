import JSEncrypt from "jsencrypt";
import axios from "@/utils/request";
import { getPublicKey } from "./key";

interface RegisterProps {
  password: string;
  phone: string;
  authcode: string;
  nickname: string;
}

/**
 * Register using credentials
 */
export const register = async (data: RegisterProps) => {
  const { password } = data;
  const p = getPublicKey();
  const crypt = new JSEncrypt({});
  const publicKey = await p;
  crypt.setKey(publicKey);
  const encryptedPassword = crypt.encrypt(password);
  await axios.post(
    "/user/register",
    { ...data, password: encryptedPassword },
    {
      codeHandlers: {
        400: ({ response }) => {
          throw response.data.error;
        },
      },
    }
  );
};
