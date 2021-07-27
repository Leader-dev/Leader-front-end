import axios from "@/utils/request";
import useSWR from "swr";

export const useOrgTitles = () => {
  return useSWR("/puppet/get-titles", (d) =>
    axios(d).then(
      (res) =>
        res.data.titles as Array<{
          orgId: string;
          orgName: string;
          title: string;
          displayTitle: string;
        }>
    )
  );
};
