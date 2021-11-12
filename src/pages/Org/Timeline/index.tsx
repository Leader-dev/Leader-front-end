import BottomButton from "@/components/BottomButton";
import { deleteTimelineEvent } from "@/services/org/manage/timeline/delete";
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
  useIonAlert,
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
        <BottomButton
          content={"完成"}
          disabled={loading}
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
        />
      </IonContent>
    </>
  );
};

const TimelinePage = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: timeline, mutate } = useOrgTimeline({ orgId });
  const [alert] = useIonAlert();

  const [presentNewModal, dismissNewModal] = useIonModal(NewEventModal, {
    onClose: () => {
      dismissNewModal();
      mutate();
    },
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
            const t = dayjs.unix(event.timestamp);
            const passed = t < dayjs();
            return (
              <IonItem key={event.id}>
                <IonLabel>
                  <h4
                    style={{
                      color: passed ? "#777777" : undefined,
                    }}
                  >
                    {event.description}
                    {passed && " - 已完成"}
                  </h4>

                  <p>{t.format("YYYY年MM月DD号HH点")}</p>
                </IonLabel>
                <IonButton
                  onClick={() => {
                    alert({
                      message: "确定删除事件吗",
                      buttons: [
                        {
                          text: "保留",
                        },
                        {
                          text: "删除",
                          role: "destructive",
                          handler: () => {
                            deleteTimelineEvent({
                              orgId,
                              timelineItemId: event.id,
                            }).then(() => {
                              mutate();
                            });
                          },
                        },
                      ],
                    });
                  }}
                >
                  删除
                </IonButton>
              </IonItem>
            );
          })}
        </IonList>
        <IonFab
          vertical="bottom"
          horizontal="center"
          style={{ bottom: 16 }}
          slot="fixed"
        >
          <IonFabButton onClick={() => presentNewModal()}>
            <IonIcon src={"/assets/icon/quillPen.svg"} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default TimelinePage;
