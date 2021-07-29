import axios from "@/utils/request";

export const updateUserNickName = async (nickname: string) => {
  await axios.post("/user/info/update-nickname", { nickname });
};
