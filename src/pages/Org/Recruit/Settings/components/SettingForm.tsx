import * as React from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonLabel,
  IonListHeader,
  IonNote,
  IonToggle,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { checkmarkCircle, chevronForward } from "ionicons/icons";
import { useOrgRecruitSetting } from "@/types/recruit";
import RecruitQuestions from "./RecruitQuestions";
import { setOrgRecruitSetting } from "@/services/org/manage/apply/setting/setScheme";
import { useParams } from "react-router";

export default ({ recruitInfo }: { recruitInfo: useOrgRecruitSetting }) => {
  const { orgId } = useParams<{ orgId: string }>();
  const { scheme, receivedApplicationCount } = recruitInfo;
  const [open, setOpen] = useState<boolean>(scheme.open);
  const [maximumApplication, setMaximumApplication] = useState<number>(
    scheme.maximumApplication === -1 ? 0 : scheme.maximumApplication
  );
  const [limitChecked, setLimitChecked] = useState<boolean>(
    scheme.maximumApplication !== -1
  );
  const [questions, setQuestions] = useState<
    { question: string; required: boolean }[]
  >(scheme.questions);
  const [received, setReceived] = useState<number>(receivedApplicationCount);
  const [appointDepartment, setAppointDepartment] = useState<boolean>(
    scheme.appointDepartment
  );

  const history = useIonRouter();

  return (
    <IonList>
      <IonItem>
        <IonLabel>是否开启主页申请通道</IonLabel>
        <IonNote slot={"end"}>
          <IonToggle checked={open} onIonChange={() => setOpen(!open)} />
        </IonNote>
      </IonItem>
      {open ? (
        <>
          <IonItem>
            <IonLabel>是否限制招新名额上限制</IonLabel>
            <IonNote slot={"end"}>
              <IonToggle
                checked={limitChecked}
                onIonChange={(e) => {
                  setLimitChecked(e.detail.checked);
                }}
              />
            </IonNote>
          </IonItem>
          {limitChecked ? (
            <>
              <IonItem>
                <IonLabel>招新人数上限：</IonLabel>
                <IonInput
                  style={{ marginLeft: "-7px" }}
                  value={maximumApplication}
                  inputmode={"numeric"}
                  type={"number"}
                  onIonChange={(e) =>
                    setMaximumApplication(parseInt(e.detail.value!))
                  }
                />
              </IonItem>
              <IonItem>
                <IonLabel>已用招新名额：{received}</IonLabel>
                <IonNote slot="end">
                  <IonButton
                    color="danger"
                    onClick={() => {
                      setReceived(0);
                    }}
                  >
                    清零
                  </IonButton>
                </IonNote>
              </IonItem>
            </>
          ) : (
            ""
          )}

          <IonListHeader style={{ marginTop: 20, marginBottom: 0 }}>
            <h5>申请者审核:</h5>
          </IonListHeader>

          <IonItem>
            <IonLabel style={{ color: "primary", marginLeft: 25 }}>
              1.
              <span style={{ marginLeft: 6 }}>您的姓名</span>
            </IonLabel>
            <IonNote slot="end">
              <IonButton
                color={"primary"}
                fill="clear"
                size="small"
                style={{ fontSize: "15px", marginRight: "-1vw" }}
              >
                必填
                <IonIcon style={{ marginLeft: 2 }} icon={checkmarkCircle} />
              </IonButton>
            </IonNote>
          </IonItem>

          <RecruitQuestions questions={questions} setQuestions={setQuestions} />

          <IonItem style={{ marginTop: "5px" }}>
            <IonLabel>申请者是否需要选择部门</IonLabel>
            <IonNote slot={"end"}>
              <IonToggle
                checked={appointDepartment}
                onIonChange={(e) => {
                  setAppointDepartment(e.detail.checked);
                }}
              />
            </IonNote>
          </IonItem>

          {appointDepartment ? (
            <IonItem>
              <IonLabel>添加各部门招新审核人</IonLabel>
              <IonButton fill="clear" routerLink={"settings/departments"}>
                点击设置
                <IonIcon icon={chevronForward} />
              </IonButton>
            </IonItem>
          ) : (
            ""
          )}

          <IonButton
            style={{ margin: "25px 15px" }}
            expand="block"
            onClick={() => {
              setOrgRecruitSetting({
                orgId: orgId,
                scheme: {
                  open: open,
                  maximumApplication: limitChecked ? maximumApplication : -1,
                  appointDepartment: appointDepartment,
                  questions: questions,
                },
                resetReceivedApplicationCount: received === 0,
              });
              history.goBack();
            }}
          >
            确认
          </IonButton>
        </>
      ) : (
        ""
      )}
    </IonList>
  );
};
