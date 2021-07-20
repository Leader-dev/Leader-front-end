import { IonButton, IonIcon, IonInput, IonItem, IonNote } from "@ionic/react";
import * as React from "react";
import { closeCircle } from "ionicons/icons";

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

type inputSettings = {
  type: TextFieldTypes;
  inputMode: KeyBoardTypes;
  minLength?: number | undefined;
  maxLength?: number | undefined;
};

export default ({
  states,
  setStates,
  buttonText,
  settings,
}: {
  states: string[];
  setStates: any;
  buttonText: string;
  settings: inputSettings;
}) => {
  const handleInputChange = (e: any, index: number) => {
    const newList = [...states];
    newList[index] = e.target.value;
    setStates(newList);
  };

  const handleAdd = () => {
    setStates([...states, ""]);
  };

  const handleRemove = (index: number) => {
    console.log(index);
    const newList = [...states];
    newList.splice(index, 1);
    setStates(newList);
  };

  return (
    <div>
      {states.map((item, index) => (
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
            type={settings.type}
            inputmode={settings.inputMode}
            minlength={settings.minLength}
            maxlength={settings.maxLength}
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
