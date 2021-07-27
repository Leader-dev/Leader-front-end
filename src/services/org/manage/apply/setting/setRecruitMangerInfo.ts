import axios from "@/utils/request";

export const setRecruitMangerInfo = async ({
  orgId,
  departmentId,
  memberId,
}: {
  orgId: string;
  departmentId: string;
  memberId: string | null;
}) => {
  await axios.post(
    `/org/manage/apply/set-recruit-manager-info?orgId=${orgId}`,
    { departmentId, memberId }
  );
};
