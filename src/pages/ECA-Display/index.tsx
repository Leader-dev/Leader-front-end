import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './index.css';

const ECADisplay: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>展示</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default ECADisplay;
