import axios from "@/utils/request";
import useSWR from "swr";

interface UserInfoResult {
  id: string;
  uid: number;
  nickname: string;
  avatarUrl: string;
}

export const useUserInfo = () => {
  return useSWR("/user/info/get", (d) =>
    axios(d).then((res) => res.data.data.info as UserInfoResult)
  );
};
