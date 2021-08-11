import axios from "@/utils/request";

export const resignMember = async (orgId: string) => {
  await axios
    .post(`/org/manage/member-info/resign?orgId=${orgId}`)
    .then((r) => console.log(r));
};
