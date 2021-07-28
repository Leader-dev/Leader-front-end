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
import { Square } from "@/components/square";
import { Add } from "@/components/add";

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
