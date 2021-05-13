import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonPage,
  IonSearchbar,
  IonButton,
  IonTitle,
  IonSlides,
  IonSlide
} from '@ionic/react';
import './index.css';
import Card from "./Component/Card";

const slideOpts = {
  initialSlide: 1,
};

const ecaData = {
  poster: "http://placekitten.com/g/200/300",
  name: "这是一个社团",
  id: 400031,
  size: 35,
  address: "深圳国际交流学院"
}

const ECADisplay: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            社团展示
          </IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} showCancelButton="focus">
          </IonSearchbar>
          <IonButton slot="end" color="primary">筛选</IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSlides pager={true} options={slideOpts} scrollbar={true}>
          <IonSlide>
            <Card poster={ecaData.poster}
                  name={ecaData.name}
                  id={ecaData.id}
                  size={ecaData.size}
                  address={ecaData.address}
                  posterProportion={75}
                  height={40}/>
          </IonSlide>
          <IonSlide>
            <h1>Slide 2</h1>
          </IonSlide>
          <IonSlide>
            <h1>Slide 3</h1>
          </IonSlide>
        </IonSlides>

      </IonContent>
    </IonPage>
  );
};

export default ECADisplay;
