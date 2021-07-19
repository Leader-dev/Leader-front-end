import { useOrgReceivedApplications } from "@/services/org/manage/apply/listReceived";
import { IonPage } from "@ionic/react";
import { useParams } from "react-router";

const RecruitManage = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: applications } = useOrgReceivedApplications({ orgId });
  console.log({ applications });

  return <IonPage>WIP</IonPage>;
};
export default RecruitManage;
