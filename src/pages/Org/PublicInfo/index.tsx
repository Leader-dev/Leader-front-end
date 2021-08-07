import * as React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTextarea,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";
import { useState } from "react";
import FlexibleInputFields from "@/components/FlexibleInputFields";
import { OrgTypes } from "@/types/organization";
import { useOrgTypes } from "@/services/org/types";
import ImageSelect from "@/components/imageSelect";
import { useStartUrl } from "@/services/service/image/accessStartUrl";
import { useOrgPublicInfo } from "@/services/org/manage/publicInfo/get";
import { useParams } from "react-router";
import { useToast } from "@/utils/toast";
import { setOrgPublicInfo } from "@/services/org/manage/publicInfo/set";
import { OrgPublicInfo } from "@/types/organization";
import { setOrgPoster } from "@/services/org/manage/publicInfo/setPoster";
import BottomConfirm from "@/components/BottomConfirm";

const OrgInfo = ({
  orgInfo,
  orgTypes,
}: {
  orgInfo: OrgPublicInfo;
  orgTypes: OrgTypes;
}) => {
  const { orgId } = useParams<{ orgId: string }>();
  const [detail, setDetail] = useState({
    name: orgInfo.name,
    instituteName: orgInfo.instituteName,
    address: orgInfo.address,
    introduction: orgInfo.introduction,
  });
  const [emails, setEmails] = useState<string[]>(orgInfo.email);
  const [phones, setPhones] = useState<string[]>(orgInfo.phone);
  const [types, setTypes] = useState<string[]>(orgInfo.typeAliases);

  let typeList = Object.keys(orgTypes);
  const [buttonsStyle, setButtonsStyle] = useState<("default" | "selected")[]>(
    () => {
      let initList = Array(typeList.length).fill("default");
      for (let i = 0; i < typeList.length; i++) {
        if (types.indexOf(typeList[i]) !== -1) {
          initList[i] = "selected";
        }
      }
      return initList;
    }
  );
  const buttonStyle: {
    [key: string]: {
      fill: "default" | "clear" | "outline" | "solid";
      style: object;
    };
  } = {
    default: {
      fill: "clear",
      style: { "--color": "black" },
    },
    selected: {
      fill: "outline",
      style: {
        "--color": "black",
        "--border-radius": "12px",
        "--border-width": "2px",
        "--background": "#E3E9F4",
        "--background-activated": "none",
        "--color-activated": "black",
      },
    },
  };

  const [presentLoading, dismissLoading] = useIonLoading();
  const history = useIonRouter();

  const handleTypeChange = (index: number, type: string) => {
    // console.log(types, type)
    const newButtonsStyle = [...buttonsStyle];
    let newTypes = [...types];
    // debugger
    if (buttonsStyle[index] === "default") {
      newButtonsStyle[index] = "selected";
      newTypes.push(type);
    } else {
      newButtonsStyle[index] = "default";
      newTypes = newTypes.filter((item) => item !== type);
    }
    setButtonsStyle(newButtonsStyle);
    setTypes(newTypes);
  };

  const handleDetailChange = (e: any) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        presentLoading({ message: "修改中" });
        setOrgPublicInfo({
          publicInfo: {
            name: detail.name,
            instituteName: detail.instituteName,
            address: detail.address,
            introduction: detail.introduction,
            typeAliases: types,
            email: emails,
            phone: phones,
          },
          orgId: orgId,
        }).then(() => {
          dismissLoading();
          history.goBack();
        });
      }}
    >
      <IonList>
        <IonListHeader>
          <h6>组织名称</h6>
        </IonListHeader>
        <IonItem>
          <IonInput
            required={true}
            name="name"
            value={detail.name}
            onIonChange={(e) => handleDetailChange(e)}
          />
        </IonItem>

        <IonListHeader>
          <h6>组织活动地点</h6>
        </IonListHeader>
        <IonItem>
          <IonInput
            className="my-input"
            required={true}
            name="instituteName"
            value={detail.instituteName}
            onIonChange={(e) => handleDetailChange(e)}
            placeholder="e.g. 深圳国际交流学院"
          />
        </IonItem>

        <IonListHeader>
          <h6>组织所在省份/城市</h6>
        </IonListHeader>
        <IonItem>
          <IonInput
            className="my-input"
            required={true}
            name="address"
            value={detail.address}
            onIonChange={(e) => handleDetailChange(e)}
            placeholder="e.g. 广东省深圳市"
          />
        </IonItem>

        <IonListHeader>
          <h6>组织简介</h6>
        </IonListHeader>
        <IonItem>
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
          <h6>组织类型</h6>
        </IonListHeader>
        <div style={{ margin: "5px 7px" }}>
          {typeList.map((type, index) => (
            <IonButton
              size="small"
              fill={buttonStyle[buttonsStyle[index]].fill}
              style={buttonStyle[buttonsStyle[index]].style}
              onClick={() => handleTypeChange(index, type)}
            >
              {orgTypes[type].name}
            </IonButton>
          ))}
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
      <BottomConfirm title={"确认修改"} submit={true} />
    </form>
  );
};

const OrgPoster = ({ initUrl }: { initUrl: string }) => {
  const { orgId } = useParams<{ orgId: string }>();
  const [presentToast] = useToast();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [poster, setPoster] = useState<File>();

  const history = useIonRouter();

  return (
    <>
      <IonList>
        <IonListHeader>
          <h5>更换海报封面：</h5>
        </IonListHeader>
        <ImageSelect
          count={1}
          onChange={(images) => {
            setPoster(images[0]);
          }}
        >
          <IonImg
            src={poster ? URL.createObjectURL(poster) : initUrl}
            style={{
              width: "90vw",
              height: "54vw",
              objectFit: "cover",
              margin: "10px auto",
            }}
          />
        </ImageSelect>
        <div
          style={{
            textAlign: "right",
            marginRight: "5vw",
            fontSize: "80%",
            color: "var(--ion-color-primary)",
          }}
        >
          点击更换社团封面
        </div>
      </IonList>
      <div style={{ height: "10vh" }} />
      <div
        style={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          display: "flex",
          background: "white",
        }}
      >
        <IonButton
          style={{ margin: "25px 15px", width: "100%" }}
          expand={"block"}
          onClick={() => {
            if (poster) {
              presentLoading({ message: "上传中" });
              setOrgPoster({ poster, orgId }).then(() => {
                dismissLoading();
                history.goBack();
              });
            } else {
              presentToast({ message: "请选择新社团封面" });
            }
          }}
        >
          确认修改
        </IonButton>
        <BottomConfirm
          title={"确认修改"}
          submit={true}
          onClick={() => {
            if (poster) {
              presentLoading({ message: "上传中" });
              setOrgPoster({ poster, orgId }).then(() => {
                dismissLoading();
                history.goBack();
              });
            } else {
              presentToast({ message: "请选择新社团封面" });
            }
          }}
        />
      </div>
    </>
  );
};

export default () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: orgPublicInfo } = useOrgPublicInfo({ orgId });
  const { data: orgTypes, error: orgTypesError } = useOrgTypes();
  const { data: startUrl } = useStartUrl();
  const [tab, setTab] = useState<"info" | "poster">("info");

  let content;
  if (orgPublicInfo && orgTypes && startUrl) {
    content =
      tab === "info" ? (
        <OrgInfo orgInfo={orgPublicInfo} orgTypes={orgTypes} />
      ) : (
        <OrgPoster initUrl={startUrl + orgPublicInfo.posterUrl} />
      );
  } else {
    content = <div>loading</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"对外资料"} border={false} />
        <IonToolbar>
          <IonSegment
            value={tab}
            onIonChange={(e) => {
              setTab(e.detail.value as "info" | "poster");
            }}
          >
            <IonSegmentButton value={"info"}>组织信息</IonSegmentButton>
            <IonSegmentButton value={"poster"}>封面背景</IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};
