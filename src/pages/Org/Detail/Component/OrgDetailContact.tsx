import * as React from "react";
import { OrgDetailsResult } from "@/types/organization";
import { CSSProperties } from "react";
import { IonGrid, IonIcon, IonRow } from "@ionic/react";
import { call, location, mail } from "ionicons/icons";

const title: CSSProperties = {
  color: "#4E6B84",
  fontSize: "100%",
  lineHeight: "170%",
  fontWeight: "bold",
};

const content: CSSProperties = {
  fontSize: "90%",
  lineHeight: "120%",
  marginBottom: "20px",
};

const iconAlign: CSSProperties = {
  display: "flex",
  alignItems: "center",
};

export default ({ info }: { info: OrgDetailsResult }) => {
  const { detail, applicationStatus } = info;
  let emailList = detail.email.map((email) => (
    <IonRow style={iconAlign}>
      <IonIcon icon={mail} color="primary" style={{ marginRight: "2px" }} />
      {email}
    </IonRow>
  ));
  let phoneList = detail.phone.map((phone) => (
    <IonRow style={iconAlign}>
      <IonIcon icon={call} color="primary" style={{ marginRight: "2px" }} />
      {phone}
    </IonRow>
  ));

  return (
    <IonGrid>
      <IonRow style={title}> 所在地址或固定活动地点： </IonRow>
      <IonRow style={content}>
        <div style={iconAlign}>
          <IonIcon
            icon={location}
            color="primary"
            style={{ marginRight: "2px" }}
          />
          {detail.address}
        </div>
      </IonRow>

      <IonRow style={title}> 邮箱地址：</IonRow>
      <div style={content}> {emailList} </div>

      <IonRow style={title}> 联系电话：</IonRow>
      <div style={content}> {phoneList} </div>
    </IonGrid>
  );
};
