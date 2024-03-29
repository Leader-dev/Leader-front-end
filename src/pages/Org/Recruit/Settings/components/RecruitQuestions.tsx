import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from "@ionic/react";
import * as React from "react";
import { add, addCircle, checkmarkCircle, closeCircle } from "ionicons/icons";

export default ({
  questions,
  setQuestions,
}: {
  questions: { question: string; required: boolean }[];
  setQuestions: any;
}) => {
  const handleInputChange = (e: any, index: number) => {
    const newList = [...questions];
    newList[index].question = e.target.value;
    setQuestions(newList);
  };

  const handleAdd = () => {
    if (questions) {
      setQuestions([...questions, { question: "", required: true }]);
    } else {
      setQuestions([{ question: "", required: true }]);
    }
  };

  const handleRemove = (index: number) => {
    const newList = [...questions];
    newList.splice(index, 1);
    setQuestions(newList);
  };

  const handleRequired = (index: number) => {
    const newList = [...questions];
    newList[index].required = !newList[index].required;
    setQuestions(newList);
  };

  return (
    <IonList>
      {questions
        ? questions.map((item, index) => (
            <IonItem className="ion-no-padding" key={index}>
              <IonButton
                size="small"
                color="medium"
                fill="clear"
                style={{ marginLeft: 7 }}
                onClick={() => handleRemove(index)}
              >
                <IonIcon slot="icon-only" icon={closeCircle} />
              </IonButton>
              <IonLabel>{index + 2}. </IonLabel>
              <IonInput
                required={true}
                value={item.question}
                onIonChange={(e) => {
                  handleInputChange(e, index);
                }}
              />
              <IonNote slot="end">
                <IonButton
                  color={item.required ? "primary" : "medium"}
                  fill="clear"
                  size="small"
                  onClick={() => handleRequired(index)}
                  style={{ fontSize: "15px", marginRight: "-1vw" }}
                >
                  必填
                  <IonIcon style={{ marginLeft: 2 }} icon={checkmarkCircle} />
                </IonButton>
              </IonNote>
            </IonItem>
          ))
        : ""}

      <IonIcon
        color="primary"
        style={{ fontSize: "30px", marginLeft: 35, marginTop: 4 }}
        icon={addCircle}
        onClick={handleAdd}
      />
    </IonList>
  );
};
