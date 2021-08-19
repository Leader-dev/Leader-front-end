import axios from "@/utils/request";
import useSWR from "swr";

export const usePrivacyAgreement = () => {
  return useSWR("/app/privacy", (d) =>
    axios(d).then((res) => res.data.data.md as string)
  );
};
