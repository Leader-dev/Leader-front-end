import axios from "@/utils/request";
import useSWR from "swr";

export const useUserPhone = () => {
  return useSWR("/user/phone", (d) =>
    axios(d).then((res) => res.data.phone as string)
  );
};
