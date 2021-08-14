import * as React from "react";
import { IonBadge, IonButton } from "@ionic/react";
import { useState } from "react";
import { OrgTypes } from "@/types/organization";
import BottomButton from "@/components/BottomButton";

export default ({
  states,
  setStates,
  orgTypes,
}: {
  states: any[];
  setStates: any[];
  orgTypes: OrgTypes;
}) => {
  const [typeAliases, step] = states;
  const [setTypeAliases, setStep] = setStates;
  let typeList = Object.keys(orgTypes);
  const [selectedButtons, setSelectedButtons] = useState<boolean[]>(
    Array(typeList.length).fill(false)
  );
  const [buttonsStyle, setButtonsStyle] = useState<("default" | "selected")[]>(
    Array(typeList.length).fill("default")
  );
  const buttonStyle: {
    [key: string]: {
      fill: "default" | "clear" | "outline" | "solid";
      style: object;
    };
  } = {
    default: {
      fill: "clear",
      style: { "--color": "black" },
    },
    selected: {
      fill: "outline",
      style: {
        "--color": "black",
        "--border-radius": "12px",
        "--border-width": "2px",
        "--background": "#E3E9F4",
        "--background-activated": "none",
        "--color-activated": "black",
      },
    },
  };
  const handleOnClick = (index: number, type: string) => {
    const newButtonsStyle = [...buttonsStyle];
    let newTypeAliases = [...typeAliases];
    if (!selectedButtons[index]) {
      newButtonsStyle[index] = "selected";
      newTypeAliases.push(type);
    } else {
      newButtonsStyle[index] = "default";
      newTypeAliases = newTypeAliases.filter(function (item) {
        return item !== type;
      });
    }
    setButtonsStyle(newButtonsStyle);
    setTypeAliases(newTypeAliases);
    const newSelectedButtons = [...selectedButtons];
    newSelectedButtons[index] = !newSelectedButtons[index];
    setSelectedButtons(newSelectedButtons);
  };

  let content;
  content = typeList.map((type, index) => (
    <IonButton
      size="small"
      fill={buttonStyle[buttonsStyle[index]].fill}
      style={buttonStyle[buttonsStyle[index]].style}
      onClick={() => handleOnClick(index, type)}
    >
      {orgTypes[type].name}
    </IonButton>
  ));

  return (
    <div style={{ padding: "10px 5vw" }}>
      <div style={{ display: "flex", marginBottom: "8px" }}>
        <h5>二、选择社团类型和招新信息</h5>
        <IonBadge color="primary" style={{ margin: "auto 0 11px 10px" }}>
          2/3 步
        </IonBadge>
      </div>
      <div style={{ fontSize: "90%" }}>请选择您的社团组织类型（可多选）:</div>
      <div
        style={{
          color: "var(--ion-color-primary)",
          fontSize: "80%",
          margin: "8px 0",
        }}
      >
        本选择将直接影响其他用户对您社团组织的搜索结果，请认真、准确的进行选择。
        后续如有需要更改，可在管理部分进行编辑。
      </div>
      <div>{content}</div>

      <BottomButton
        content={"下一步"}
        onClick={() => {
          setStep(step + 1);
        }}
      />
    </div>
  );
};
