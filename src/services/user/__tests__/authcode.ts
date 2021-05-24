import axios from "@/utils/request";
import { sendPhoneAuthCode } from "../authcode";

test("should send auth request", async () => {
  const phone = "12398760987";
  const resp = ["/user/authcode", { phone }];
  axios.post = jest.fn();

  await sendPhoneAuthCode({ phone });

  expect(axios.post).toBeCalledWith(...resp);
});
