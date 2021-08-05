import * as React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonToolbar,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { OrgInfo } from "@/types/organization";
import OrgCard from "@/pages/Org/components/OrgCard";
import { queryOrgs } from "@/services/org/list";

export default () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<OrgInfo[]>([]);
  const history = useIonRouter();

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      console.log("enter pressed");
      const reg = /^[0-9]{6}$/;
      if (reg.test(searchText)) {
        // @ts-ignore
        let numberId = reg.exec(searchText)[0];
        queryOrgs({ pageSize: 99, numberId: numberId }).then((r) =>
          setSearchResult(r.list)
        );
      } else {
        queryOrgs({ pageSize: 99, queryName: searchText }).then((r) =>
          setSearchResult(r.list)
        );
      }
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ "--background": "var(--ion-color-blue)" }}>
          <IonSearchbar
            placeholder="请输入社团名称/社团号"
            style={{ "--background": "white", "--border-radius": "12px" }}
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            onKeyPress={handleKeyPress}
          />
          <IonButtons slot={"end"}>
            <IonButton
              style={{ "--color": "white", marginRight: "8px" }}
              onClick={() => history.goBack()}
            >
              取消
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {searchResult.map((org) => (
          <OrgCard info={org} interactive={true} />
        ))}
      </IonContent>
    </IonPage>
  );
};
