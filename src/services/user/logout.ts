import axios from "@/utils/request";

export const logout = async () => {
  await axios.post("/user/logout");
};
