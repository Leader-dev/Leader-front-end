import axios from "@/utils/request";
import useSWR from "swr";

export const useUserAgreement = () => {
  return useSWR("/app/agreement", (d) =>
    axios(d).then((res) => res.data.data.md as string)
  );
};
