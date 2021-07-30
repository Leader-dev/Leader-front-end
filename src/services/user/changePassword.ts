import axios from "@/utils/request";

import { getPublicKey } from "./key";
import JSEncrypt from "jsencrypt";

interface CheckAuthcodeProps {
  phone: string | null;
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
  const { password } = data;
  const p = getPublicKey();
  const crypt = new JSEncrypt({});
  const publicKey = await p;
  crypt.setKey(publicKey);
  const encryptedPassword = crypt.encrypt(password);
  const d = (
    await axios.post("/user/change-password", {
      phone: data.phone,
      password: encryptedPassword,
    })
  ).data;
  if (d.code !== 200) {
    throw d.error;
  }
};
