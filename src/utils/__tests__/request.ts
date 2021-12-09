import { urlToConstant, toKey } from "../request";

test("URL transformation should be correct", () => {
  expect(urlToConstant("/api/user/info")).toEqual("API_USER_INFO");
  expect(urlToConstant("/api/user/get-info")).toEqual("API_USER_GETINFO");
});
