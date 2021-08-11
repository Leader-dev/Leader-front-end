import axios from "@/utils/request";
import { OrgInfo } from "@/types/organization";
import useSWR, { mutate } from "swr";

export const addOrgToFavorite = async (orgId: string) => {
  await axios.post("/org/add-to-favorite", { orgId });
};

export const removeOrgFromFavorite = async (orgId: string) => {
  await axios.post("/org/remove-from-favorite", { orgId });
  await mutate("/org/list-favorite");
};

export const useFavoriteOrg = () => {
  return useSWR("/org/list-favorite", (url) =>
    axios(url).then((res) => res.data.list as OrgInfo[])
  );
};
