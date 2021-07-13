import axios from "@/utils/request";
import useSWR from "swr";

export const useStartUrl = () => {
  return useSWR("/service/image/access-start-url", (d) =>
    axios(d).then((res) => res.data.start as string)
  );
};
