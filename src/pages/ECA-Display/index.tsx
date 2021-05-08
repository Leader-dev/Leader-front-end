import { IonContent, IonGrid, IonRow, IonCol, IonPage, IonSearchbar, IonButton} from '@ionic/react';
import React, { useState } from 'react';
import './index.css';

const ECADisplay: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <IonPage>
      <IonRow className="ion-align-items-center">
        <IonCol size="10">
          <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} showCancelButton="focus">
          </IonSearchbar>
        </IonCol>
        <IonCol size="2">
          <IonButton color="primary">筛选</IonButton>
        </IonCol>
      </IonRow>

    </IonPage>
  );
};

export default ECADisplay;
