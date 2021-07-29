import * as React from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import BasicInfo from "./components/BasicInfo";
import { chevronBack } from "ionicons/icons";
import { useState } from "react";
import TypeSelection from "./components/TypeSelection";
import { useOrgTypes } from "@/services/org/types";
import PosterSelection from "./components/PosterSelection";
import { createOrg } from "@/services/org/create";
import { useHistory } from "react-router";

export default () => {
  const [detail, setDetail] = useState({
    name: "",
    instituteName: "",
    address: "",
    introduction: "",
  });
  const [emails, setEmails] = useState<string[]>([]);
  const [phones, setPhones] = useState<string[]>([]);
  const [typeAliases, setTypeAliases] = useState<string[]>([]);
  const [poster, setPoster] = useState<File>();

  const [step, setStep] = useState<number>(1);
  const [present, dismiss] = useIonAlert();

  const { data: orgTypes, error } = useOrgTypes();
  if (error || !orgTypes) return <div> Failed to load </div>;

  const router = useIonRouter();

  let content;
  if (step === 1) {
    content = (
      <BasicInfo
        states={[detail, emails, phones, step]}
        setStates={[setDetail, setEmails, setPhones, setStep]}
      />
    );
  } else if (step === 2) {
    content = (
      <TypeSelection
        states={[typeAliases, step]}
        setStates={[setTypeAliases, setStep]}
        orgTypes={orgTypes}
      />
    );
  } else if (step === 3) {
    content = (
      <PosterSelection
        states={[poster, step]}
        setStates={[setPoster, setStep]}
        onFinalSubmit={(event: any) => {
          event.preventDefault();
          present({ message: "发布中" });
          // console.log(detail, typeAliases, poster);
          createOrg({
            name: detail.name,
            instituteName: detail.instituteName,
            address: detail.address,
            introduction: detail.introduction,
            email: emails,
            phone: phones,
            typeAliases: typeAliases,
            // @ts-ignore
            poster: poster,
          }).then(() => {
            dismiss();
            router.goBack();
          });
        }}
      />
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" icon={chevronBack} text="" />
          </IonButtons>
          <IonTitle>申请成立</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{content}</IonContent>
    </IonPage>
  );
};
