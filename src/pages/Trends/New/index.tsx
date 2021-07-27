/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import useOnClickOutside from "use-onclickoutside";
import autosize from "autosize";
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
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { CSSProperties, useCallback, useMemo, useRef, useState } from "react";
import { sendTrendPost } from "@/services/trend/send";
import { useOrgTitles } from "@/services/puppet/getTitles";
import { useToast } from "@/utils/toast";

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const withBorder = (
  sides: Array<"top" | "bottom" | "left" | "right">
): CSSProperties => {
  const r: CSSProperties = {
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

const Square = (props: any) => {
  return (
    <div
      css={css`
        box-sizing: border-box;
        --aspect-ratio: 1/1;
        & > :first-of-type {
          width: 100%;
        }
        & > img {
          height: auto;
        }
        @supports (--custom: property) {
          & {
            position: relative;
          }
          &::before {
            content: "";
            display: block;
            padding-bottom: calc(100% / (var(--aspect-ratio)));
          }
          & > :first-of-type {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
          }
        }
        ${{ ...props.style }}
      `}
      {...props}
    />
  );
};

const Add = (props: { style: object; onClick?: () => void }) => {
  return (
    <div style={{ padding: "4px" }}>
      <Square onClick={props.onClick}>
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            "--aspect-ratio": "1/1",
            padding: "14px",
          }}
        >
          <div style={{ ...withBorder(["bottom", "right"]) }} />
          <div style={{ ...withBorder(["bottom", "left"]) }} />
          <div style={{ ...withBorder(["top", "right"]) }} />
          <div style={{ ...withBorder(["top", "left"]) }} />
        </div>
      </Square>
    </div>
  );
};

const NewTrend = () => {
  const [toast] = useToast();
  const [typing, setTyping] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const { data: titles } = useOrgTitles();
  const [orgId, setOrgId] = useState<string | null>(null);
  const [present, dismiss] = useIonLoading();
  const router = useIonRouter();
  const cardRef = useRef(null);
  const inputRef = useCallback((node) => {
    if (node) {
      setTimeout(() => {
        const l = node.querySelector("textarea");
        if (l) {
          autosize(l);
          console.log({ l });
          return;
        }
        const ob = new MutationObserver((mutationsList) => {
          for (let mutation of mutationsList) {
            console.log(mutation);
            if (mutation.type === "childList") {
              const k = Array.from(mutation.addedNodes).filter(
                // @ts-ignore
                (n) => n.firstChild?.type === "textarea"
              );
              if (k.length) {
                // @ts-ignore
                autosize(k[0].firstChild as Node);
                ob.disconnect();
              }
            }
          }
        });

        ob.observe(node, { childList: true });
      });
    }
  }, []);
  const imageUris = useMemo(() => {
    return images.map((i) => URL.createObjectURL(i));
  }, [images]);
  useOnClickOutside(cardRef, () => setTyping(false));
  const onSubmit = () => {
    if (!orgId) {
      toast({ message: "需要选择身份", color: "warning" });
      return;
    } else if (!content.replace(/\s+/g, "").length && !images.length) {
      toast({ message: "内容不得为空", color: "warning" });
      return;
    }
    present({ message: "发布中" });
    sendTrendPost({
      orgId,
      anonymous,
      content,
      images,
    }).then(() => {
      dismiss();
      router.goBack();
    });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/trends" />
          </IonButtons>
          <IonTitle>发布动态</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onSubmit}>发布</IonButton>
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
              <IonLabel>
                <div>匿名发布</div>
                {anonymous && <IonNote>身份将不会展示给其他用户</IonNote>}
              </IonLabel>
              <IonToggle
                checked={anonymous}
                onIonChange={(e) => setAnonymous(e.detail.checked)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>选择身份</IonLabel>
              <IonSelect
                placeholder="无"
                value={orgId}
                onIonChange={(e) => setOrgId(e.detail.value)}
              >
                {titles?.map((t) => {
                  return (
                    <IonSelectOption value={t.orgId} key={t.orgId}>
                      {t.title ?? "社员"} - {t.orgName}
                    </IonSelectOption>
                  );
                })}
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
              ref={cardRef}
              onClick={() => setTyping(true)}
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
                  value={content}
                  onIonChange={(e) => setContent(e.detail.value!)}
                  ref={inputRef}
                />
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {imageUris.map((url) => {
                    return (
                      <Square
                        key={url}
                        css={{
                          width: "calc(100%/3)",
                        }}
                      >
                        <IonImg
                          style={{ objectFit: "crop" }}
                          src={url}
                          css={css`
                            height: 100%;
                            &::part(image) {
                              object-fit: cover;
                            }
                            padding: 4px;
                          `}
                        />
                      </Square>
                    );
                  })}
                  {images.length === 9 || (
                    <div
                      style={{
                        width: "calc(100%/3)",
                        order: 99,

                        border: "2px solid #ccc",
                      }}
                    >
                      <ImageSelect
                        count={9 - images.length}
                        onChange={(images) => {
                          setImages((a) => a.concat(images));
                        }}
                      >
                        <Add style={{ width: "100%", padding: "4px" }} />
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
