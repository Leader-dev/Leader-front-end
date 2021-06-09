import JSEncrypt from "jsencrypt";
import axios from "@/utils/request";

import { getPublicKey } from "./key";

interface LoginWithPasswordProps {
  phone: string;
  password: string;
}

interface LoginWithAuthCodeProps {
  phone: string;
  authcode: string;
}

/**
 * Login using credentials. Login status is saved using session
 */
export const login = async (
  data: LoginWithPasswordProps | LoginWithAuthCodeProps
) => {
  const requestData: { phone: string; password?: string; authcode?: string } = {
    phone: data.phone,
  };
  if ("password" in data) {
    const publicKey = await getPublicKey();
    const encrypt = new JSEncrypt({});
    encrypt.setKey(publicKey);
    requestData.password = encrypt.encrypt(data.password) || undefined;
  } else {
    requestData.authcode = data.authcode;
  }
  await axios.post("/user/login", requestData, {
    codeHandlers: {
      400: ({ response }) => {
        throw response.data.error;
      },
    },
  });
};
