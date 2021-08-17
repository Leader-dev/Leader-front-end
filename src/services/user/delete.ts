import axios from "@/utils/request";
import { mutate } from "swr";

export const deleteUser = async ({ authcode }: { authcode: string }) => {
  const d = (await axios.post("/user/set-delete-user", { authcode })).data;
  if (d.code !== 200) {
    throw d.error;
  }
  await mutate("/user/userid");
};
