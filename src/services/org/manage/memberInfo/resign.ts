import axios from "axios";

export const resignMember = async (orgId: strng) => {
  await axios
    .post(`/org/manage/member-info/resign?orgId=${orgId}`)
    .then((r) => console.log(r));
};
