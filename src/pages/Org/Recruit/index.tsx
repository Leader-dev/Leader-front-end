/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Add } from "@/components/add";
import ImageSelect from "@/components/imageSelect";
import { Square } from "@/components/square";
import { useOrgApplicationDetail } from "@/services/org/manage/apply/detail";
import { useOrgReceivedApplications } from "@/services/org/manage/apply/listReceived";
import { respondToOrgApplication } from "@/services/org/manage/apply/sendResult";
import { OrgApplication } from "@/types/organization";
import RecruitSettings from "./Settings/index";
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTextarea,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { add, settings } from "ionicons/icons";
import { Fragment, useMemo, useState } from "react";
import { Route, useParams } from "react-router";
import { sendApplicationNotification } from "@/services/org/manage/apply/sendNotification";
import { useToast } from "@/utils/toast";
import * as React from "react";
import DepartmentSettings from "./Settings/components/DepartmentSettings";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";
import SelectMembers from "./Settings/components/SelectMembers";

const RecruitManage = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const [tab, setTab] = useState<"pending" | "reviewed">("pending");
  const { data: applications } = useOrgReceivedApplications({ orgId });

  const pendingApplications = useMemo(() => {
    if (!applications) return [];
    return applications.filter((a) => a.status === "pending");
  }, [applications]);
  const reviewedApplications = useMemo(() => {
    if (!applications) return [];
    return applications.filter((a) => a.status !== "pending");
  }, [applications]);
  console.log({ applications });

  const history = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"招新管理"} border={true} />
      </IonHeader>
      <IonContent>
        <IonSegment
          mode="md"
          onIonChange={(e) => setTab(e.detail.value as typeof tab)}
          value={tab}
        >
          <IonSegmentButton value="pending">待处理</IonSegmentButton>
          <IonSegmentButton value="reviewed">已审批</IonSegmentButton>
        </IonSegment>
        {tab === "pending" ? (
          <IonList>
            {pendingApplications.map((a) => {
              const time = new Date(a.sendDate);
              console.log({ time });
              return (
                <IonItem key={a.id} detail routerLink={`recruit/${a.id}/home`}>
                  <IonLabel>
                    <h2>{a.name}</h2>
                    <div>申请人：{a.applicantUserInfo.nickname}</div>
                    <div>
                      提交时间：
                      {`${time.getFullYear()}-${
                        time.getMonth() + 1
                      }-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`}
                    </div>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          <IonList>
            {reviewedApplications.map((a) => {
              const time = new Date(a.sendDate);
              console.log({ time });
              return (
                <IonItem key={a.id} detail routerLink={`recruit/${a.id}/home`}>
                  <IonLabel>
                    <h2>{a.name}</h2>
                    <div>申请人：{a.applicantUserInfo.nickname}</div>
                    <div>
                      提交时间：
                      {`${time.getFullYear()}-${
                        time.getMonth() + 1
                      }-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`}
                    </div>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        )}
        <IonButton
          slot={"fixed"}
          style={{ bottom: "25px", margin: "0 15px", width: "90vw" }}
          routerLink={"recruit/settings"}
        >
          <IonIcon slot={"icon-only"} icon={settings} />
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

const CustomLabel: React.FC<{ title: string }> = ({ children, title }) => (
  <div style={{ margin: "8px 8px" }}>
    <span>{title}</span>：<span>{children}</span>
  </div>
);

const AppDetail = () => {
  const { applicationId, orgId } =
    useParams<{
      applicationId: string;
      orgId: string;
    }>();
  const [loading, setLoading] = useState(false);
  const { data: details } = useOrgApplicationDetail({ orgId, applicationId });
  type Details = NonNullable<
    ReturnType<typeof useOrgApplicationDetail>["data"]
  >;

  if (!details) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>Loading...</IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"加入申请"} border={true} />
      </IonHeader>
      <IonContent fullscreen>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ margin: "16px", flex: "1 0 auto" }}>
            <h1 style={{ margin: "24px auto", textAlign: "center" }}>
              加入申请
            </h1>
            <CustomLabel title="申请时间">
              {new Date(details.sendDate).toLocaleDateString()}
            </CustomLabel>
            <CustomLabel title="申请人">{details.name}</CustomLabel>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginBottom: "6px",
              }}
            >
              <h3 style={{ flexGrow: 1, margin: 0, padding: "8px 0 6px" }}>
                通知：
              </h3>
              <IonButton
                slot="end"
                shape="round"
                size="small"
                routerLink={`add`}
              >
                <IonIcon icon={add} />
              </IonButton>
            </div>
            {/* TODO: Add notifications display */}
            <h3>申请内容：</h3>
            {details.applicationForm.map(({ question, answer }) => {
              return (
                <div style={{ margin: "6px" }} key={question}>
                  <h5 style={{ marginBottom: "3px" }}>{question}</h5>
                  <p style={{ marginTop: "3px" }}>{answer}</p>
                </div>
              );
            })}
          </div>
          <div>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    onClick={() => {
                      setLoading(true);
                      respondToOrgApplication({
                        applicationId,
                        orgId,
                        result: "pass",
                      }).then(() => {
                        setLoading(false);
                      });
                    }}
                    color="primary"
                    expand="block"
                    disabled={loading}
                  >
                    通过
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => {
                      setLoading(true);
                      respondToOrgApplication({
                        applicationId,
                        orgId,
                        result: "reject",
                      }).then(() => {
                        setLoading(false);
                      });
                    }}
                    color="primary"
                    expand="block"
                    fill="outline"
                    disabled={loading}
                  >
                    拒绝
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export const AddNotification = () => {
  const { applicationId, orgId } =
    useParams<{
      applicationId: string;
      orgId: string;
    }>();
  const [toast] = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const router = useIonRouter();
  const imageUris = useMemo(() => {
    return images.map((i) => URL.createObjectURL(i));
  }, [images]);
  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"发布通知"} border={true} />
      </IonHeader>
      <IonContent>
        <IonList style={{ paddingTop: "24px", marginBottom: "24px" }}>
          <IonListHeader>
            <IonLabel>通知标题</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonInput
              placeholder="面试通知"
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}
            />
          </IonItem>
          <IonListHeader>
            <IonLabel>通知内容</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonTextarea
              rows={4}
              placeholder="可以输入多行哦"
              value={content}
              onIonChange={(e) => setContent(e.detail.value!)}
            />
          </IonItem>
          <IonListHeader>
            <IonLabel>
              上传图片
              <IonBadge>{images.length}/4</IonBadge>
            </IonLabel>
          </IonListHeader>
          <IonItem>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                padding: "18px",
              }}
            >
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
              {images.length === 4 || (
                <div
                  style={{
                    width: "calc(100%/3)",
                    order: 99,

                    border: "2px solid #ccc",
                  }}
                >
                  <ImageSelect
                    count={4 - images.length}
                    onChange={(images) => {
                      setImages((a) => a.concat(images));
                    }}
                  >
                    <Add style={{ width: "100%", padding: "4px" }} />
                  </ImageSelect>
                </div>
              )}
            </div>
          </IonItem>
        </IonList>
        {/* <IonItem> */}
        <IonButton
          fill="solid"
          expand="block"
          style={{ margin: "15px 25px" }}
          onClick={() => {
            sendApplicationNotification({
              orgId,
              applicationId,
              title,
              content,
              images,
            })
              .then(() => {
                toast({ message: "发送成功", color: "success" });
              })
              .catch(() => {
                toast({ message: "发送失败", color: "danger" });
              });

            router.goBack();
          }}
        >
          确认发布
        </IonButton>
        {/* </IonItem> */}
      </IonContent>
    </IonPage>
  );
};

export default () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route exact path={"/org/:orgId/recruit"} component={RecruitManage} />
        <Route
          path="/org/:orgId/recruit/:applicationId/add"
          component={AddNotification}
        />
        <Route
          path="/org/:orgId/recruit/:applicationId/home"
          component={AppDetail}
        />
        <Route
          exact
          path="/org/:orgId/recruit/settings"
          component={RecruitSettings}
        />
        <Route
          exact
          path="/org/:orgId/recruit/settings/departments"
          component={DepartmentSettings}
        />
        <Route
          path="/org/:orgId/recruit/settings/departments/:departmentId"
          component={SelectMembers}
        />
      </IonRouterOutlet>
    </IonPage>
  );
};
