import { IonButton, IonIcon, IonInput, IonItem, IonNote } from "@ionic/react";
import * as React from "react";
import { closeCircle } from "ionicons/icons";
import { useState } from "react";

type TextFieldTypes =
  | "date"
  | "datetime-local"
  | "email"
  | "month"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";
type KeyBoardTypes =
  | "decimal"
  | "email"
  | "none"
  | "numeric"
  | "search"
  | "tel"
  | "text"
  | "url"
  | undefined;

export default ({
  textFieldType,
  keyBoardType,
  buttonText,
}: {
  textFieldType: TextFieldTypes;
  keyBoardType: KeyBoardTypes;
  buttonText: string;
}) => {
  const [inputList, setInputList] = useState<string[]>([]);

  const handleInputChange = (e: any, index: number) => {
    const newList = [...inputList];
    newList[index] = e.target.value;
    setInputList(newList);
  };

  const handleAdd = () => {
    setInputList([...inputList, ""]);
  };

  const handleRemove = (index: number) => {
    console.log(index);
    const newList = [...inputList];
    newList.splice(index, 1);
    setInputList(newList);
  };

  return (
    <div>
      {inputList.map((item, index) => (
        <IonItem style={{ display: "flex", justifyContent: "space-between" }}>
          <IonButton
            size="small"
            color="medium"
            fill="clear"
            onClick={() => handleRemove(index)}
          >
            <IonIcon slot="icon-only" icon={closeCircle} />
          </IonButton>
          <IonInput
            required={true}
            type={textFieldType}
            inputmode={keyBoardType}
            value={item}
            onIonChange={(e) => {
              handleInputChange(e, index);
            }}
          />
        </IonItem>
      ))}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <IonButton
          size="small"
          onClick={() => {
            handleAdd();
          }}
        >
          {buttonText}
        </IonButton>
      </div>
    </div>
  );
};
