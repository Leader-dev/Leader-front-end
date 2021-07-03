import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
} from "@ionic/react";

export const ECACard = ({
  imgUrl,
  numberId,
  name,
  address,
  addressAuth,
  memberCount,
  presidentName,
  notificationCount,
}: {
  name: string;
  imgUrl: string;
  numberId: number;
  addressAuth: "school" | string;
  address: string;
  memberCount: number;
  presidentName: string;
  notificationCount: number;
}) => {
  return (
    <IonCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonImg // TODO: Fix aspect ratio & height problems
                style={{
                  // minWidth: "10px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
                src={imgUrl}
              />
            </IonCol>
            <IonCol size="5" style={{ fontSize: "75%", color: "black" }}>
              <div style={{ fontSize: "120%", fontWeight: "bold" }}>{name}</div>
              <div style={{ color: "#9f9f9f" }}>{numberId}</div>
              <div style={{ marginTop: "4px" }}>{address}</div>
              <div>{presidentName}</div>
              <div>{memberCount}</div>
            </IonCol>
            <IonCol size="4" style={{ textAlign: "right" }}>
              <div>
                {notificationCount && (
                  <IonBadge color="danger">{notificationCount}</IonBadge>
                )}
              </div>
              <IonButton fill="outline" size="small">
                点击管理
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export const ECARequestCard = ({
  imgUrl,
  numberId,
  name,
  address,
  addressAuth,
  memberCount,
  presidentName,
  notificationCount,
  status,
}: {
  name: string;
  imgUrl: string;
  numberId: number;
  addressAuth: "school" | string;
  address: string;
  memberCount: number;
  presidentName: string;
  notificationCount: number;
  status: "pending" | "rejected" | "accepted";
}) => {
  return (
    <IonCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonImg // TODO: Fix aspect ratio & height problems
                style={{
                  // minWidth: "10px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
                src={imgUrl}
              />
            </IonCol>
            <IonCol size="5" style={{ fontSize: "75%", color: "black" }}>
              <div style={{ fontSize: "120%", fontWeight: "bold" }}>{name}</div>
              <div style={{ color: "#9f9f9f" }}>{numberId}</div>
              <div style={{ marginTop: "4px" }}>{address}</div>
              <div>{presidentName}</div>
              <div>{memberCount}</div>
            </IonCol>
            <IonCol size="4" style={{ textAlign: "right" }}>
              <div>
                {notificationCount && (
                  <IonBadge color="danger">{notificationCount}</IonBadge>
                )}
              </div>
              <IonButton fill="outline" size="small">
                查看详情
              </IonButton>
              <IonChip
                outline
                color={
                  status === "rejected"
                    ? "danger"
                    : status === "accepted"
                    ? "success"
                    : "warning"
                }
              >
                {status === "rejected"
                  ? "已拒绝"
                  : status === "accepted"
                  ? "已通过"
                  : "审核中"}
              </IonChip>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
