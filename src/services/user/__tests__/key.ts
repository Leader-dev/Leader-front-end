import axios from "@/utils/request";
import { getPublicKey } from "../key";

test("should return public key", async () => {
  const publicKey =
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXatKZTpESa6gsPp7XFsz/f+mtmfzIt2KeCQuN1xz3iRvcwETjRnNG71t7hfa9C6uDOO5nvQRUcdYRpmAeCOE5aJ8h+1FaeRfd7l06OC0uevOOU1dWE5aHPfA8Hio3gNH6B7DMpo6ymKOwkYF7iBf1c7bWCu/7xcMlkZGHortdrwIDAQAB";
  //@ts-ignore
  axios.post = jest.fn(async () => ({
    data: { publicKey },
  }));
  expect(await getPublicKey()).toBe(publicKey);
});
