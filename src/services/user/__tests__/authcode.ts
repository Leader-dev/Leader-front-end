import axios from "@/utils/request";
import { sendPhoneAuthCode } from "../authcode";

test("should send auth request", async () => {
  const phone = "12398760987";
  const resp = ["/user/authcode", { phone }];
  axios.post = jest.fn();

  await sendPhoneAuthCode({ phone });

  // @ts-ignore
  expect(axios.post.mock.calls[0].slice(0, 2)).toEqual(resp);
});
