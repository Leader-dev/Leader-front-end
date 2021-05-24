import { IonPage, IonContent, IonButton } from "@ionic/react";
import { useEffect, useState } from "react";

import coffeeImage from "./coffee.jpg";

interface SVGIndicatorProps {
  position: 0 | 1;
  duration: number;
  height?: number;
}

const SVGIndicator: React.FC<SVGIndicatorProps> = ({
  position,
  height,
  duration,
}) => {
  const heightPX = `${height ?? 42}px`;
  const width = "50vw";
  return (
    <div
      style={{
        position: "absolute",
        top: "-" + heightPX,
        width,
        transform: position ? "translateX(50vw)" : "",
        transition: `transform ${duration}s ease-in-out`,
      }}
    >
      <svg
        width={width}
        height={heightPX}
        viewBox="0 0 800 133"
        version="1.1"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Page-1"
          stroke="none"
          fill="none"
          fillRule="evenodd"
          // fill-opacity="0.3"
        >
          <path
            d="M0,133 L800,133 C667.333333,124.133333 580.666667,110.833333 540,93.1 C479,66.5 479,0 400,0 C321,0 321,67.165 260,93.1 C219.333333,110.39 132.666667,123.69 0,133 Z"
            id="Path"
            fill="#FFFFFF"
          ></path>
        </g>
      </svg>
    </div>
  );
};

interface BackgroundSwipeTabsProps {
  titleLeft: string;
  titleRight: string;
  left: React.ReactNode;
  right: React.ReactNode;
}

const BackgroundSwipeTabs: React.FC<BackgroundSwipeTabsProps> = ({
  right,
  left,
  titleRight,
  titleLeft,
}) => {
  const [index, setIndex] = useState<0 | 1>(0);
  const height = 36;
  const duration = 0.75;
  const getTitleStyles = (active: boolean): React.CSSProperties => {
    return {
      position: "absolute",
      top: `-${height + 76}px`,
      backgroundColor: active ? "white" : "",
      borderRadius: "50%",
      width: "64px",
      height: "64px",
      //   boxSizing: "border-box",
      lineHeight: "60px",
      textAlign: "center",
      transform: `translateX(-50%) ${!active ? "translateY(36px)" : ""}`,
      color: active ? "var(--ion-color-primary-shade)" : "white",
      transitionProperty: "background-color transform color",
      transition: `${duration}s ease-in-out`,
    };
  };

  return (
    <>
      <img
        src={coffeeImage}
        alt=""
        style={{
          objectFit: "cover",
          width: "100%",
          height: "32%",
          display: "block",
          filter: "opacity(85%)",
        }}
      />
      <div style={{ height: "68%", width: "100%", position: "relative" }}>
        <div
          style={{
            ...getTitleStyles(!index),
            left: "25vw",
          }}
          onClick={() => setIndex(0)}
        >
          {titleLeft}
        </div>
        <div
          style={{
            ...getTitleStyles(!!index),
            left: "75vw",
          }}
          onClick={() => setIndex(1)}
        >
          {titleRight}
        </div>
        <SVGIndicator position={index} duration={duration} height={height} />
        {index ? right : left}
      </div>
    </>
  );
};

const SignUpPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <BackgroundSwipeTabs
          titleLeft="登录"
          left={<>登录UI</>}
          titleRight="注册"
          right={<>注册UI</>}
        />
      </IonContent>
    </IonPage>
  );
};

export default SignUpPage;
