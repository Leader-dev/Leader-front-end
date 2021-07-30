import axios from "@/utils/request";
import { mutate } from "swr";

export const updateUserNickName = async (nickname: string) => {
  await axios.post("/user/info/update-nickname", { nickname });
  await mutate("/user/info/get");
};
