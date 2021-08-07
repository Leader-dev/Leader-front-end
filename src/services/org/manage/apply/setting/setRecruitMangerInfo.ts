import axios from "@/utils/request";
import { mutate } from "swr";

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
    `/org/manage/apply/setting/set-recruit-manager?orgId=${orgId}`,
    { departmentId, memberId }
  );
  await mutate(
    `/org/manage/apply/setting/get-recruit-manager-info?orgId=${orgId}`
  );
  await mutate(`/org/manage/apply/setting/get-scheme?orgId=${orgId}`);
};
