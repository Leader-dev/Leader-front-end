import React from 'react';
import {
  IonCard,
  IonIcon,
  IonImg,
} from '@ionic/react';
import { personSharp } from 'ionicons/icons';

export interface cardProps {
  poster: string,
  name: string,
  id: number,
  size: number,
  address: string,
  posterProportion: number,
  height: number,
}


function Card(props: cardProps) {
  return (
    <IonCard style={{
      height: props.height + 'vh'
    }}>
      <IonImg src={props.poster} style={{
        height: props.posterProportion + "%",
        width: '100%'
      }}/>

      <div style={{
        height: 1 - props.posterProportion + "%",
        textAlign: 'left',
        paddingLeft: '2vw',
        paddingTop: '1vh',
      }}>
        <div style={{
          color: 'black',
          fontSize: '15px',
          fontWeight: 'bold'
        }}>
          {props.name}
        </div>
        <div style={{
          color: 'darkgrey',
          fontSize: '13px',
        }}>
          {props.id}
        </div>

        <div style={{
          color: 'cornflowerblue',
          fontSize: "12px",
          display: 'flex',
          alignItems: 'center',
        }}>
          <IonIcon icon={personSharp}/>
          <span style={{
            paddingLeft: '1px',
            paddingTop: '2px',
          }}>
            {props.size}
            {props.address}
          </span>
        </div>

      </div>
    </IonCard>
  );
}

export default Card;
