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
  if ("password" in data) {
    const publicKey = await getPublicKey();
    const encrypt = new JSEncrypt({});
    encrypt.setKey(publicKey);
    const requestData = {
      phone: data.phone,
      password: encrypt.encrypt(data.password),
    };
    await axios.post("/user/login", requestData);
  } else {
    await axios.post("/user/login", data);
  }
};
