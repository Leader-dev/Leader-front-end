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

export default () => {
  const [detail, setDetail] = useState({
    name: "",
    instituteName: "",
    address: "",
    introduction: "",
  });

  function handleDetailChange(e: any) {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form>
      <IonList>
        <IonListHeader>
          一、基础信息填写
          <IonBadge color="primary" style={{ margin: "auto 10px" }}>
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
          textFieldType={"email"}
          keyBoardType={"email"}
          buttonText={"添加邮箱"}
        />

        <IonListHeader>设置联系电话</IonListHeader>
        <FlexibleInputFields
          textFieldType={"number"}
          keyBoardType={"numeric"}
          buttonText={"添加号码"}
        />
      </IonList>

      <IonButton style={{ margin: "25px 15px" }} type="submit" expand="block">
        下一步
      </IonButton>
    </form>
  );
};
