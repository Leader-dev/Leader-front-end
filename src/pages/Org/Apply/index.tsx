import * as React from "react";
import { useParams } from "react-router";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import OrgCard from "@/pages/Org/components/OrgCard";
import ApplyForm from "./components/ApplyForm";
import { chevronBack } from "ionicons/icons";
import { useOrgDetails } from "@/services/org/detail";
import { useApplyDepartmentList } from "@/services/org/apply/listDepartments";

export default () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: details, error: detailsError } = useOrgDetails({ orgId });
  const { data: departments, error: departmentsError } = useApplyDepartmentList(
    {
      orgId,
    }
  );

  let content;
  if (detailsError || departmentsError) {
    content = <div> Error </div>;
  } else if (!details || !departments) {
    content = <div> Skeleton </div>;
  } else {
    content = (
      <>
        <OrgCard info={details.detail} interactive={false} />
        <ApplyForm details={details} departments={departments} />
      </>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="" icon={chevronBack} />
          </IonButtons>
          <IonTitle>申请加入</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};
