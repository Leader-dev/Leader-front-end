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
import FlexibleInputFields from "./FlexibleInputFields";
import "./BasicInfo.css";

export default ({ states, setStates }: { states: any[]; setStates: any[] }) => {
  const [detail, emails, phones, step] = states;
  const [setDetail, setEmails, setPhones, setStep] = setStates;

  const handleDetailChange = (e: any) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={(event) => {
        console.log(detail, emails, phones);
        event.preventDefault();
        setStep(step + 1);
      }}
    >
      <IonList>
        <IonListHeader>
          <h5>一、基础信息填写</h5>
          <IonBadge color="primary" style={{ margin: "auto 0 11px 10px" }}>
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

        <IonListHeader>
          <h6>设置邮箱地址</h6>
        </IonListHeader>
        <FlexibleInputFields
          buttonText={"添加邮箱"}
          states={emails}
          setStates={setEmails}
          settings={{
            inputMode: "email",
            type: "email",
          }}
        />

        <IonListHeader>
          <h6>设置联系电话</h6>
        </IonListHeader>
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

      <IonButton style={{ margin: "25px 5vw" }} type="submit" expand="block">
        下一步
      </IonButton>
    </form>
  );
};
