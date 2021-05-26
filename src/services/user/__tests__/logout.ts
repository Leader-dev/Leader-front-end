import axios from "@/utils/request";
import { logout } from "../logout";

test("logout should call axios", async () => {
  axios.post = jest.fn();
  await logout();
  expect(axios.post).toHaveBeenCalledWith("/user/logout");
});
