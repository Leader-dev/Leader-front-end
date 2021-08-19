import axios from "@/utils/request";
import useSWR from "swr";

export const useHostName = () => {
  return useSWR("/app/web-app-hostname", (d) =>
    axios(d).then((res) => res.data.data.hostname as string)
  );
};
