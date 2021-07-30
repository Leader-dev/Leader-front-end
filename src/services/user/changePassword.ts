import axios from "@/utils/request";

import { getPublicKey } from "./key";
import JSEncrypt from "jsencrypt";

interface CheckAuthcodeProps {
  phone: string;
  authcode: string;
}

export const checkAuthcode = async (data: CheckAuthcodeProps) => {
  const d = (await axios.post("/user/check-authcode", data)).data;
  if (d.code !== 200) {
    throw d.error;
  }
};

interface ChangePasswordProps {
  phone: string | null;
  password: string;
}

export const changePassword = async (data: ChangePasswordProps) => {
  const publicKey = await getPublicKey();
  const encrypt = new JSEncrypt({});
  encrypt.setKey(publicKey);
  data.password = encrypt.encrypt(data.password) || undefined;
  const d = (await axios.post("/user/change-password", data)).data;
  if (d.code !== 200) {
    throw d.error;
  }
};
