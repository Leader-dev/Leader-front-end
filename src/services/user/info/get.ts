import axios from "@/utils/request";
import useSWR from "swr";
import { useUserId } from "@/services/user/userid";

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

export const useAuthed = () => {
  const { data, error, isValidating } = useUserId();
  return {
    isLoading: isValidating,
    isAuthed: isValidating ? null : data && !error,
  };
};
