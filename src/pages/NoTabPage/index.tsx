import { IonPage, IonContent } from "@ionic/react";

const NoTabPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>I am a page with no tabs!</IonContent>
    </IonPage>
  );
};

export default NoTabPage;