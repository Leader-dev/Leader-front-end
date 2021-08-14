/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Add } from "@/components/add";
import ImageSelect from "@/components/imageSelect";
import { Square } from "@/components/square";
import { useOrgApplicationDetail } from "@/services/org/manage/apply/detail";
import { useOrgReceivedApplications } from "@/services/org/manage/apply/listReceived";
import { respondToOrgApplication } from "@/services/org/manage/apply/sendResult";
import RecruitSettings from "./Settings/index";
import {
  IonBadge,
  IonContent,
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
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTextarea,
  useIonRouter,
} from "@ionic/react";
import { addCircle, ellipse, settings } from "ionicons/icons";
import { useMemo, useState } from "react";
import { Route, useParams } from "react-router";
import { sendApplicationNotification } from "@/services/org/manage/apply/sendNotification";
import { useToast } from "@/utils/toast";
import * as React from "react";
import DepartmentSettings from "./Settings/components/DepartmentSettings";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";
import SelectMembers from "./Settings/components/SelectMembers";
import { useOrgOperatedApplications } from "@/services/org/manage/apply/listOperated";
import { NotificationItem } from "@/pages/Org/components/NotificationDetail";
import { useOrgNotificationDetail } from "@/services/org/manage/apply/notificationDetail";
import {
  NotificationDetailContent,
  NotificationDetailSkeleton,
} from "@/pages/Org/components/NotificationDetail";
import formatTime from "@/components/formatTime";
import BottomConfirm from "@/components/BottomButton";
import BottomButton from "@/components/BottomButton";
import BottomDoubleButtons from "@/components/BottomDoubleButtons";

const RecruitManage = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const [tab, setTab] = useState<"pending" | "reviewed">("pending");
  const { data: pendingApplications } = useOrgReceivedApplications({ orgId });
  const { data: reviewedApplications } = useOrgOperatedApplications({ orgId });

  let content;
  if (pendingApplications && reviewedApplications) {
    content = (
      <>
        {tab === "pending" ? (
          <IonList>
            {pendingApplications.map((a) => {
              const time = new Date(a.sendDate);
              return (
                <IonItem key={a.id} detail routerLink={`recruit/${a.id}/home`}>
                  <IonLabel>
                    <h2>{a.name}</h2>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "3px",
                      }}
                    >
                      <IonIcon icon={ellipse} color={"primary"} />
                      <IonText style={{ marginLeft: "2px" }} color={"primary"}>
                        申请人：
                      </IonText>
                      {a.applicantUserInfo.nickname}
                    </p>
                    <p>
                      <IonText color={"dark"}>提交时间：</IonText>
                      {`${time.getFullYear()}年${
                        time.getMonth() + 1
                      }月${time.getDate()}日
                      ${time.getHours()}:${time.getMinutes()}`}
                    </p>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          <IonList>
            {reviewedApplications.map((a) => {
              const time = new Date(a.sendDate);
              return (
                <IonItem key={a.id} detail routerLink={`recruit/${a.id}/home`}>
                  <IonLabel>
                    <h2>{a.name}</h2>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "3px",
                      }}
                    >
                      <IonIcon icon={ellipse} color={"primary"} />
                      <IonText style={{ marginLeft: "2px" }} color={"primary"}>
                        申请人：
                      </IonText>
                      {a.applicantUserInfo.nickname}
                    </p>
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <IonIcon icon={ellipse} color={"success"} />
                      <IonText style={{ marginLeft: "2px" }} color={"success"}>
                        审核人：
                      </IonText>
                      {a.operateMemberInfo.name}
                    </p>
                    <p>
                      <IonText color={"dark"}>提交时间：</IonText>
                      {`${time.getFullYear()}年${
                        time.getMonth() + 1
                      }月${time.getDate()}日
                      ${time.getHours()}:${time.getMinutes()}`}
                    </p>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        )}
        <BottomButton
          content={<IonIcon slot={"icon-only"} icon={settings} />}
          routerLink={"recruit/settings"}
        />
      </>
    );
  } else {
    content = <div> Skeleton </div>;
  }

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
        {content}
      </IonContent>
    </IonPage>
  );
};

const ManagerNotificationDetailPage = () => {
  const { notificationId } = useParams<{ notificationId: string }>();
  const { orgId } = useParams<{ orgId: string }>();
  const { data: notificationDetail } = useOrgNotificationDetail({
    notificationId,
    orgId,
  });

  let content;
  if (notificationDetail) {
    content = <NotificationDetailContent info={notificationDetail} />;
  } else {
    content = <NotificationDetailSkeleton />;
  }
  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={notificationDetail?.title} />
      </IonHeader>
      <IonContent>{content}</IonContent>
    </IonPage>
  );
};

const CustomLabel: React.FC<{ title: string; last?: boolean }> = ({
  children,
  title,
  last = false,
}) => (
  <IonItem
    lines={"none"}
    style={{
      fontSize: "95%",
      marginLeft: "8px",
      marginBottom: last ? "0px" : "-15px",
    }}
  >
    {title}：<IonText color={"primary"}>{children}</IonText>
  </IonItem>
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
  const history = useIonRouter();

  if (!details) {
    return (
      <IonPage>
        <IonHeader>
          <ToolbarWithBackButton />
        </IonHeader>
        <IonContent>Loading...</IonContent>
      </IonPage>
    );
  }

  const operateMemberInfo = details.operateMemberInfo;
  const bottomButtons = (
    <BottomDoubleButtons
      left={{
        title: "通过",
        fill: "solid",
        onClick: () => {
          setLoading(true);
          respondToOrgApplication({
            applicationId,
            orgId,
            result: "pass",
          }).then(() => {
            setLoading(false);
            history.goBack();
          });
        },
      }}
      right={{
        title: "拒绝",
        fill: "outline",
        onClick: () => {
          setLoading(true);
          respondToOrgApplication({
            applicationId,
            orgId,
            result: "reject",
          }).then(() => {
            setLoading(false);
          });
        },
      }}
    />
  );

  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"加入申请"} border={true} />
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <h4 style={{ margin: "24px auto", textAlign: "center" }}>加入申请</h4>
          <CustomLabel title="申请时间">
            {formatTime(details.sendDate)}
          </CustomLabel>
          <CustomLabel title="申请人" last={!operateMemberInfo}>
            {details.name}
          </CustomLabel>
          {operateMemberInfo ? (
            <CustomLabel title="审核人" last={true}>
              {operateMemberInfo.name}
            </CustomLabel>
          ) : null}

          <IonListHeader className={"ion-align-items-center"}>
            <h4>通知：</h4>
            {operateMemberInfo ? null : (
              <IonIcon
                style={{ fontSize: "25px", marginTop: "5.5px" }}
                color={"primary"}
                icon={addCircle}
                onClick={() => history.push(`add`)}
              />
            )}
          </IonListHeader>
          {details.notifications.map((notification) => (
            <NotificationItem
              info={notification}
              showUnread={false}
              routerLink={`notifications/${notification.id}`}
            />
          ))}
          <IonListHeader>
            <h4> 申请内容：</h4>
          </IonListHeader>
          {details.applicationForm.map(({ question, answer }) => {
            return (
              <>
                <IonItem key={question}>
                  <IonLabel>
                    <h3>{question}</h3>
                    <p>{answer}</p>
                  </IonLabel>
                </IonItem>
              </>
            );
          })}
        </IonList>
        {operateMemberInfo ? null : bottomButtons}
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
              autoGrow={true}
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
          <IonItem lines={"none"}>
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
        <BottomConfirm
          content={"确认发布"}
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
        />
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
          exact
          path="/org/:orgId/recruit/:applicationId/add"
          component={AddNotification}
        />
        <Route
          exact
          path="/org/:orgId/recruit/:applicationId/home"
          component={AppDetail}
        />
        <Route
          path="/org/:orgId/recruit/:applicationId/notifications/:notificationId"
          component={ManagerNotificationDetailPage}
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
