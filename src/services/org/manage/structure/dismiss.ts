import axios from "@/utils/request";

type DismissOrgMemberParams = {
  orgId: string;
  memberId: string;
};

export const dismissOrgMember = async ({
  memberId,
  orgId,
}: DismissOrgMemberParams) => {
  await axios.post(`/org/manage/structure/dismiss?orgId=${orgId}`, {
    memberId,
  });
};
