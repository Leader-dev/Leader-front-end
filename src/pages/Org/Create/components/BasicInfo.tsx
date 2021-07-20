import * as React from "react";
import {
  IonBadge,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonListHeader,
  IonList,
  IonText,
  IonTextarea,
} from "@ionic/react";
import { useState } from "react";
import FlexibleInputFields from "./FlexibleInputFields";
import "./BasicInfo.css";

export default () => {
  const [detail, setDetail] = useState({
    name: "",
    instituteName: "",
    address: "",
    introduction: "",
  });

  const handleDetailChange = (e: any) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  };

  const [emails, setEmails] = useState<string[]>([]);
  const [phones, setPhones] = useState<string[]>([]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <IonList>
        <IonListHeader>
          一、基础信息填写
          <IonBadge color="primary" style={{ margin: "0 0 2px 10px" }}>
            1/3 步
          </IonBadge>
        </IonListHeader>

        <IonItem>
          <IonLabel position="stacked">请为您创立的社团组织命名</IonLabel>
          <IonInput
            required={true}
            name="name"
            value={detail.name}
            onIonChange={(e) => handleDetailChange(e)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">
            请填写您社团组织所在的固定活动地点
          </IonLabel>
          <IonInput
            className="my-input"
            required={true}
            name="instituteName"
            value={detail.instituteName}
            onIonChange={(e) => handleDetailChange(e)}
            placeholder="e.g. 深圳国际交流学院"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">请填写您社团组织所在的具体城市</IonLabel>
          <IonInput
            className="my-input"
            required={true}
            name="address"
            value={detail.address}
            onIonChange={(e) => handleDetailChange(e)}
            placeholder="e.g. 广东省深圳市"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">请为您的社团组织写一段简介</IonLabel>
          <IonTextarea
            required={true}
            rows={1}
            autoGrow={true}
            maxlength={200}
            name="introduction"
            value={detail.introduction}
            onIonChange={(e) => handleDetailChange(e)}
          />
        </IonItem>
        <div style={{ textAlign: "right", marginRight: "10px" }}>
          <IonText color="medium">{detail.introduction.length}/200</IonText>
        </div>

        <IonListHeader>设置邮箱地址</IonListHeader>
        <FlexibleInputFields
          buttonText={"添加邮箱"}
          states={emails}
          setStates={setEmails}
          settings={{
            inputMode: "email",
            type: "email",
          }}
        />

        <IonListHeader>设置联系电话</IonListHeader>
        <FlexibleInputFields
          buttonText={"添加号码"}
          states={phones}
          setStates={setPhones}
          settings={{
            inputMode: "tel",
            type: "tel",
            minLength: 11,
            maxLength: 11,
          }}
        />
      </IonList>

      <IonButton style={{ margin: "25px 15px" }} type="submit" expand="block">
        下一步
      </IonButton>
    </form>
  );
};
