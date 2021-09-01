import { insertTimelineEvent } from "@/services/org/manage/timeline/insert";
import { useOrgTimeline } from "@/services/org/manage/timeline/list";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import dayjs from "dayjs";
import { add, chevronBack } from "ionicons/icons";
import React, { useState } from "react";
import { useParams } from "react-router";

const NewEventModal = ({
  onClose,
  orgId,
}: {
  onClose: () => void;
  orgId: string;
}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(dayjs().toISOString());
  const [loading, setLoading] = useState(false);
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>添加节点</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>添加时间：</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonDatetime
              displayFormat="HH:00 MM/DD YYYY"
              min="2019"
              value={date}
              onIonChange={(e) => setDate(e.detail.value!)}
            />
          </IonItem>
          <IonListHeader>
            <IonLabel>节点详情：</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonTextarea
              maxlength={200}
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
            />
          </IonItem>
        </IonList>
        <IonButton
          disabled={loading}
          fill="solid"
          expand="block"
          onClick={() => {
            setLoading(true);
            insertTimelineEvent({
              orgId,
              timestamp: dayjs(date).unix(),
              description,
            }).then(() => {
              onClose();
            });
          }}
        >
          完成
        </IonButton>
      </IonContent>
    </>
  );
};

const TimelinePage = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: timeline } = useOrgTimeline({ orgId });

  const [presentNewModal, dismissNewModal] = useIonModal(NewEventModal, {
    onClose: () => dismissNewModal(),
    orgId,
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>时间轴</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {timeline?.map((event, index) => {
            return (
              <IonItem key={event.id}>
                <IonLabel>{index}</IonLabel>
                {event.description}
              </IonItem>
            );
          })}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => presentNewModal()}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default TimelinePage;