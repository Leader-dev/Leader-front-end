import ImageSelect from "@/components/imageSelect";
import { promptSelectImages } from "@/utils/selectImage";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { CSSProperties, useMemo, useState } from "react";

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const withBorder = (
  sides: Array<"top" | "bottom" | "left" | "right">
): CSSProperties => {
  const r: CSSProperties = {
    // aspectRatio: "1/1",
    // maxWidth: "50%",
    // maxHeight: "100%",
    boxSizing: "border-box",
  };
  sides.forEach((side) => {
    r[
      ("border" + toTitleCase(side)) as
        | "borderTop"
        | "borderBottom"
        | "borderLeft"
        | "borderRight"
    ] = "1px solid #ccc";
  });
  return r;
};

const Add = (props: { style: object; onClick?: () => void }) => {
  return (
    <div
      style={{
        padding: "14px",
        border: "2px solid #ccc",
        boxSizing: "border-box",
        ...props.style,
      }}
      onClick={props.onClick}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          aspectRatio: "1/1",
        }}
      >
        <div style={{ ...withBorder(["bottom", "right"]) }} />
        <div style={{ ...withBorder(["bottom", "left"]) }} />
        <div style={{ ...withBorder(["top", "right"]) }} />
        <div style={{ ...withBorder(["top", "left"]) }} />
      </div>
    </div>
  );
};

const NewTrend = () => {
  const [typing, setTyping] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const imageUris = useMemo(() => {
    return images.map((i) => URL.createObjectURL(i));
  }, [images]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/trends" />
          </IonButtons>
          <IonTitle>发布动态</IonTitle>
          <IonButtons slot="end">
            <IonButton>发布</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
            paddingTop: "36px",
          }}
        >
          <IonList>
            <IonItem>
              <IonLabel>匿名发布</IonLabel>
              <IonToggle value="pepperoni" />
            </IonItem>
            <IonItem>
              <IonLabel>选择身份</IonLabel>
              <IonSelect placeholder="无">
                <IonSelectOption value="female">计算机协会会长</IonSelectOption>
                <IonSelectOption value="male">一般男性</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
          <div
            style={{
              position: "relative",
              flex: "1 1 auto",
              marginTop: "36px",
            }}
          >
            <IonCard
              style={{
                borderRadius: "16px",
                marginRight: 0,
                marginLeft: 0,
                marginBottom: "-12px",
                paddingBottom: "-12px",
                width: "100%",
                height: typing ? "90vh" : "100%",
                transition: "height 0.2s ease-in",
                position: "absolute",
                bottom: "0",
              }}
            >
              <IonCardHeader>
                <IonCardTitle>动态：</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonTextarea
                  placeholder="在这里说点儿什么吧..."
                  rows={6}
                  onFocus={() => setTyping(true)}
                  onBlur={() => setTyping(false)}
                />
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {imageUris.map((url) => {
                    return (
                      <div
                        key={url}
                        style={{
                          width: "calc(100%/3)",
                          padding: "4px",
                          aspectRatio: "1/1",
                        }}
                      >
                        <IonImg style={{ objectFit: "crop" }} src={url} />
                      </div>
                    );
                  })}
                  {images.length === 9 || (
                    <div
                      style={{
                        width: "calc(100%/3)",
                        order: 99,
                        padding: "4px",
                      }}
                    >
                      <ImageSelect
                        count={9 - images.length}
                        onChange={(images) => {
                          setImages((a) => a.concat(images));
                        }}
                      >
                        <Add style={{ width: "100%", aspectRatio: "1/1" }} />
                      </ImageSelect>
                    </div>
                  )}
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NewTrend;
