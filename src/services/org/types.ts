import axios from "@/utils/request";
import useSWR from "swr";
import { OrgTypes } from "@/types/organization";

export const getOrgTypes = async () => {
  return (await axios.post("/org/types")).data.types as OrgTypes;
};

export const useOrgTypes = () => {
  return useSWR("/org/types", (url) =>
    axios(url).then((res) => res.data.types as OrgTypes)
  );
};
