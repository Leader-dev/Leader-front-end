import useSWR from "swr";
import axios from "@/utils/request";

export const useUserId = () => {
  return useSWR("/user/userid", (url) => {
    return axios.post(url).then((res) => res.data.userid as string);
  });
};
