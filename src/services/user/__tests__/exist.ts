import axios from "@/utils/request";
import { userExist } from "../exist";

test("should check if user exists", async () => {
  const byPhoneData = { phone: "19234563214" };
  const phoneArgs = ["/user/exist", byPhoneData];
  // @ts-ignore
  axios.post = jest
    .fn(async () => ({ data: { exist: false } }))
    .mockImplementationOnce(async () => ({ data: { exist: true } }));
  expect(await userExist(byPhoneData)).toBeTruthy();
  expect(axios.post).toHaveBeenCalledWith(...phoneArgs);

  const byUsernameData = { username: "jokens" };
  const usernameArgs = ["/user/exist", byUsernameData];
  expect(await userExist(byUsernameData)).toBeFalsy();
  expect(axios.post).toHaveBeenCalledWith(...usernameArgs);
});
