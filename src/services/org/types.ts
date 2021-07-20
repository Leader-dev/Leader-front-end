import axios from "@/utils/request";
import useSWR from "swr";

interface OrgType {
  name: string;
  alias: string;
}

interface OrgTypes {
  [key: string]: OrgType;
}

export const getOrgTypes = async () => {
  return (await axios.post("/org/types")).data.types as OrgTypes;
};

export const useOrgTypes = () => {
  return useSWR("/org/types", (url) =>
    axios(url).then((res) => res.data.types as OrgTypes)
  );
};
