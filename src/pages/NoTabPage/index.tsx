import { updateUserPortrait } from "@/services/user/info/updateAvatar";
import { IonPage, IonContent } from "@ionic/react";
import { useState } from "react";
import * as React from "react";

const NoTabPage: React.FC = () => {
  const [url, setUrl] = useState("");
  return (
    <IonPage>
      <IonContent fullscreen>
        <input
          type="file"
          onChange={(e) => {
            setUrl(URL.createObjectURL(e.target.files![0]));
            updateUserPortrait(e.target.files![0]);
          }}
          accept="image/*"
        />
        <img src={url} />
      </IonContent>
    </IonPage>
  );
};

export default NoTabPage;
