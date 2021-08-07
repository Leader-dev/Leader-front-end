import * as React from "react";
import { IonContent, IonHeader, IonPage, IonText } from "@ionic/react";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";

export default () => {
  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"关于麒者"} border={true} />
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ padding: "20px" }}>
          <p>
            麟者，一个专为各类菁英组织及社团打造的智能化管理平台；一个汇集来自各领域社团组织青年声音的高净值观点交流社区。
          </p>
          <p>
            通过大数据算法及定制化设计，为其提供智能化管理、社会资源对接、动态发布交流等服务；为菁英组织及社团的创立、发展、交流、合作与沉淀，提供一个彼此呼应的全方位生态环境。
          </p>
          <p>
            名定“麟者”，因为我们坚信每一位与麟者相遇的伙伴都为麒麟之资；以科技赋能初心，让每一份独具匠心的闪耀都被虔诚以待，让每一颗初心都被世界聆听！
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};
