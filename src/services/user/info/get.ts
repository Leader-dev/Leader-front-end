import axios from "@/utils/request";
import useSWR from "swr";

interface UserInfoResult {
  info: {
    id: string;
    uid: number;
    nickname: string;
    avatarUrl: string;
  };
  likes: number;
}

export const useUserInfo = () => {
  return useSWR("/user/info/get", (d) =>
    axios(d).then((res) => res.data.data as UserInfoResult)
  );
};

/** get the current auth state of the user */
export const useAuthed = () => {
  const { data, error, isValidating } = useUserInfo();
  return {
    isLoading: isValidating,
    isAuthed: isValidating ? false : !!(data && !error),
  };
};
