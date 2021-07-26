import * as React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonToolbar,
  IonBackButton,
  IonTitle,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useState } from "react";
import { useQueryOrgs } from "@/services/org/list";

export default () => {
  const [searchText, setSearchText] = useState<string>("");

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      console.log("enter pressed");
      const reg = /^[0-9]{6}$/;
      if (reg.test(searchText)) {
        const numberId = reg.exec(searchText)[0];
        useQueryOrgs({ pageSize: 99, numberId: numberId });
      } else {
        useQueryOrgs({ pageSize: 99, queryName: searchText });
      }
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ "--background": "var(--ion-color-blue)" }}>
          <IonButtons>
            <IonBackButton icon={chevronBack} text="" />
          </IonButtons>
          <IonTitle>社团组织</IonTitle>
        </IonToolbar>
        <IonToolbar style={{ "--background": "var(--ion-color-blue)" }}>
          <IonSearchbar
            placeholder="社团名称/社团号"
            style={{ "--background": "white" }}
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            onKeyPress={handleKeyPress}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};
