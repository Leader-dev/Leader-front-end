import * as React from "react";
import { IonBadge, IonButton, IonImg, useIonAlert } from "@ionic/react";
import AddButton from "./AddButton.jpeg";
import ImageSelect from "@/components/imageSelect";

export default ({
  states,
  setStates,
  onFinalSubmit,
}: {
  states: any[];
  setStates: any[];
  onFinalSubmit: any;
}) => {
  const [poster, step] = states;
  const [setPoster, setStep] = setStates;
  const [present] = useIonAlert();

  return (
    <form style={{ padding: "10px 5vw" }} onSubmit={onFinalSubmit}>
      <div style={{ display: "flex", marginBottom: "8px" }}>
        <h5>三、设置封面和背景</h5>
        <IonBadge color="primary" style={{ margin: "auto 0 11px 10px" }}>
          3/3 步
        </IonBadge>
      </div>
      <div style={{ marginBottom: "8px" }}>上传海报封面：</div>
      <ImageSelect
        count={1}
        onChange={(images) => {
          setPoster(images[0]);
        }}
      >
        <IonImg
          src={poster ? URL.createObjectURL(poster) : AddButton}
          style={{ width: "100%", height: "60vw", objectFit: "cover" }}
        />
      </ImageSelect>

      <IonButton
        style={{ marginTop: "25px" }}
        type="submit"
        expand="block"
        onClick={() => {
          if (!poster) {
            present("请选择社团封面", [{ text: "确认" }]);
          } else {
            setStep(step + 1);
          }
        }}
      >
        申请成立
      </IonButton>
    </form>
  );
};
