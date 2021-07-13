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
import OrgCard from "./Component/OrgCard";

export default () => {
  // const { orgId } = useParams<{ orgId: string }>();
  // const { data: data, error } = useOrgDetails({ orgId });
  // if (error) return <div>failed to load</div>
  // if (!data) return (
  //   <div> Skeleton </div>
  // )

  // Test data
  let data = {
    detail: {
      id: "xxxxxx",
      name: "计算机协会",
      numberId: 111111,
      introduction:
        "计算机协会成⽴于2004年10⽉10⽇，是学院最具潜⼒的学⽣社团之⼀，也是学院唯⼀⼀个科技类社团。协会是由⼴⼤的电脑爱好者⾃发组成，以“学习计算机知识，提⾼⾃⾝素质，相互帮助，团结协作”为宗旨，以“先进带动后进， 刻苦钻研计算机知识，勇攀IT科技⾼峰”为原则。积极⼤胆地⾛进计算机各个领域，不断总结交流，树⽴良好的计算机知识氛围，全⾯提⾼我院⼴⼤计算机爱好者们的计算机知识⽔平。",
      memberCount: 280,
      instituteName: "深国交",
      address: "广东深圳",
      addressAuth: "school",
      typeAliases: [""],
      posterUrl:
        "https://tva1.sinaimg.cn/large/008i3skNgy1gsbsxdsc4ij30a006rjrp.jpg",
      status: "",
      phone: ["113115155", "189237523465"],
      email: ["aaaaa@gmail.com", "test@qq.com"],
      presidentName: "正在讲",
      applicationScheme: {
        open: false,
        auth: true,
        appointDepartment: true,
        questions: ["你的名字"],
      },
    },
    applicationStatus: "applied",
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="" />
          </IonButtons>
          <IonTitle>申请加入</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <OrgCard info={data} />
      </IonContent>
    </IonPage>
  );
};
