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
import ECAInfoCard, {DisplayInfo} from "./Component/ECAInfoCard";

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

class ECADisplay extends React.Component<any, any> {
  async fetchData() {
    return new Promise<void>( r => {
      setTimeout(() => {
        this.setState({
          ecas: [{
            poster: "http://placekitten.com/g/200/300",
            name: "这是一个社团",
            id: 400031,
            size: 35,
            address: "深圳国际交流学院",
            posterProportion: 75,
            cardHeight: 40,
          }]
        }, r)
      }, 1000)
    })
  }
  render() {
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
              <ECAInfoCard info={this.state.ecas[0]}/>
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
  }

}

export default ECADisplay;
