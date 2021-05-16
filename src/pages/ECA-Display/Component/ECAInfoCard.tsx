import React from 'react';
import {
  IonCard,
  IonIcon,
  IonImg,
  IonCardContent,
  IonText,
} from '@ionic/react';
import { personSharp } from 'ionicons/icons';

export interface DisplayInfo {
  name: string,
  id: number,
  poster: string,
  size: number,
  address: string,
  posterProportion: number,
  cardHeight: number,
}


export default ({info}: {info: DisplayInfo}) => {
  const {name, id, poster, size, address, posterProportion, cardHeight} = info
  return (
    <IonCard style={{
      height: cardHeight + 'vh'
    }}>
      <IonImg src={poster} style={{
        height: posterProportion + "%",
        width: '100%'
      }}/>

      <IonCardContent style={{
        height: 1 - posterProportion + "%",
        textAlign: 'left',
        paddingLeft: '2vw',
        paddingTop: '1vh',
      }}>
        <IonText>
          {name}
        </IonText>
        <IonText color="light">
          {id}
        </IonText>

        <IonText color="primary">
          <IonIcon icon={personSharp}/>
          <span style={{
            paddingLeft: '1px',
            paddingTop: '2px',
          }}>
            {size}
            {address}
          </span>
        </IonText>

      </IonCardContent>
    </IonCard>
  );
}
