import { useOrgApplicationDetail } from "@/services/org/manage/apply/detail";
import { useOrgReceivedApplications } from "@/services/org/manage/apply/listReceived";
import { respondToOrgApplication } from "@/services/org/manage/apply/sendResult";
import { OrgApplication } from "@/types/organization";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { Fragment, useMemo, useState } from "react";
import { Route, Switch, useParams } from "react-router";

const RecruitManage = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const [tab, setTab] = useState<"pending" | "reviewed">("pending");
  // const { data: applications } = useOrgReceivedApplications({ orgId });
  const applications: OrgApplication[] = [
    {
      id: "19cb8f16a",
      name: "张三",
      applicantId: "1c6a7e",
      applicantInfo: {
        id: "1c6a7e",
        uid: 114514,
        nickname: "散散三",
      },
      sendDate: 1626766070,
      status: "pending",
    },
  ];
  const pendingApplications = useMemo(() => {
    if (!applications) return [];
    return applications.filter((a) => a.status === "pending");
  }, [applications]);
  const reviewedApplications = useMemo(() => {
    if (!applications) return [];
    return applications.filter((a) => a.status !== "pending");
  }, [applications]);
  console.log({ applications });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton />
          </IonButtons>

          <IonTitle>招新</IonTitle>
        </IonToolbar>
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
                <IonItem
                  key={a.id}
                  detail
                  routerLink={`/org/${orgId}/recruit/${a.id}`}
                >
                  <IonLabel>
                    <h2>{a.name}</h2>
                    <div>申请人：{a.applicantInfo.nickname}</div>
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
                <IonItem
                  key={a.id}
                  detail
                  routerLink={`/org/${orgId}/recruit/${a.id}`}
                >
                  <IonLabel>
                    <h2>{a.name}</h2>
                    <div>申请人：{a.applicantInfo.nickname}</div>
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
  // const { data: details } = useOrgApplicationDetail({ orgId, applicationId });
  type Details = NonNullable<
    ReturnType<typeof useOrgApplicationDetail>["data"]
  >;
  const details: Details = {
    id: "iuhlkbefnwm",
    name: "张三",
    sendDate: 1626771767,
    status: "pending",
    applicationForm: [{ question: "What's your name", answer: "I don't know" }],
    applicantUserId: "oyighb",
    applicantUserInfo: {
      id: "i1uhljkb",
      uid: 114514,
      nickname: "散散三",
    },
    departmentId: "o12yuihljk",
    departmentInfo: {
      id: "yay",
      name: "摸鱼部",
    },
    notifications: [
      {
        id: "12dcs",
        applicantId: "3uihqlekj",
        title: "面试通知",
        content: "请在明天下午到418号教室进行面试",
        imageUrls: [],
        unread: true,
        sendDate: 1626771767,
      },
    ],
  };

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
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>加入申请</IonTitle>
        </IonToolbar>
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
                routerLink={`/org/${orgId}/recruit/${applicationId}/add`}
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
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>发布通知</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList style={{ paddingTop: "24px" }}>
          <IonListHeader>
            <IonLabel>通知标题</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonInput placeholder="面试通知" />
          </IonItem>
          <IonListHeader>
            <IonLabel>通知内容</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>上传文字</IonLabel>
            <IonTextarea rows={4} placeholder="可以多行输入哦" />
          </IonItem>
          <IonItem>
            <IonLabel>上传图片</IonLabel>
            <IonButton shape="round">
              0/4
              <IonIcon icon={add} />
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default () => {
  return (
    <Switch>
      <Route
        path="/org/:orgId/recruit/:applicationId/add"
        component={AddNotification}
      />
      <Route path="/org/:orgId/recruit/:applicationId" component={AppDetail} />
      <Route component={RecruitManage} />
    </Switch>
  );
};
