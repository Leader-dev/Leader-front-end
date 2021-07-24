import { ImagePicker } from "@ionic-native/image-picker";
import * as React from "react";
import { IonBadge, IonButton, IonImg } from "@ionic/react";
import { uploadImage } from "@/services/external/uploadImage";

function getBlob(
  b64Data: string,
  contentType: string,
  sliceSize: number = 512
) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;
  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: contentType });
}

export default ({ states, setStates }: { states: any[]; setStates: any[] }) => {
  const [posterUrl, step] = states;
  const [setPosterUrl, setStep] = setStates;

  let blob: Blob;
  const openSelector = async () => {
    const data = await ImagePicker.getPictures({
      maximumImagesCount: 1,
      outputType: 1,
      quality: 100,
    });
    blob = getBlob(data[0], ".jpg");
    setPosterUrl(URL.createObjectURL(blob));
  };

  const uploadPoster = async () => {
    const file = new File([blob], "image.jpg");
    return await uploadImage(file);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setStep(step + 1);
      }}
    >
      <div style={{ padding: "10px 5vw" }}>
        <div style={{ display: "flex", marginBottom: "8px" }}>
          <h5>三、设置封面和背景</h5>
          <IonBadge color="primary" style={{ margin: "auto 0 11px 10px" }}>
            3/3 步
          </IonBadge>
        </div>
        <div style={{ marginBottom: "8px" }}>上传海报封面:</div>
        <IonImg
          src={posterUrl}
          style={{ width: "100%", height: "60vw", objectFit: "cover" }}
          onClick={openSelector}
        />
      </div>
      <IonButton
        style={{ margin: "25px 5vw" }}
        type="submit"
        expand="block"
        onClick={uploadPoster}
      >
        申请成立
      </IonButton>
    </form>
  );
};
