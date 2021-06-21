import JSEncrypt from "jsencrypt";
import axios from "@/utils/request";
import * as KeyModule from "../key";
import { login } from "../login";

describe("the login util", () => {
  it("should send correct encoded password", async () => {
    // @ts-ignore
    axios.post = jest.fn();
    const crypt = new JSEncrypt({});
    crypt.getKey();
    const publicKey = crypt.getPublicKeyB64();
    // @ts-ignore
    KeyModule.getPublicKey = jest.fn(async () => publicKey);

    const loginWithPasscodeData = { phone: "1234567890", password: "12345678" };
    await login(loginWithPasscodeData);
    // @ts-ignore
    expect(crypt.decrypt(axios.post.mock.calls[0][1].password)).toEqual(
      loginWithPasscodeData.password
    );
    // @ts-ignore
    expect(axios.post.mock.calls[0][1].phone).toEqual(
      loginWithPasscodeData.phone
    );
  });

  it("should send correct authcode", async () => {
    axios.post = jest.fn();
    const loginWithAuthCodeData = { phone: "1234567890", authcode: "353462" };
    await login(loginWithAuthCodeData);
    // @ts-ignore
    expect(axios.post.mock.calls[0][0]).toEqual("/user/login");
    // @ts-ignore
    expect(axios.post.mock.calls[0][1]).toEqual(loginWithAuthCodeData);
  });
});
