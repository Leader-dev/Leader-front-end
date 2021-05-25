import JSEncrypt from "jsencrypt";

import axios from "@/utils/request";

import { register } from "../register";
import * as KeyManager from "../key";

test("registration", async () => {
  const crypt = new JSEncrypt({});
  crypt.getKey();
  const publicKey = crypt.getPublicKeyB64();

  // @ts-ignore
  KeyManager.getPublicKey = jest.fn(async () => publicKey);

  // @ts-ignore
  axios.post = jest.fn();

  const cred = {
    phone: "17583740192",
    authcode: "330300",
    password: "12345678",
  };
  await register(cred);
  // @ts-ignore
  expect(crypt.decrypt(axios.post.mock.calls[0][1].password)).toEqual(
    cred.password
  );
});
