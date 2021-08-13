export interface OrgRecruitScheme {
  open: boolean;
  maximumApplication: number;
  appointDepartment: boolean;
  questions: { question: string; required: boolean }[];
}

export interface OrgRecruitSchemeInfo {
  scheme: OrgRecruitScheme;
  receivedApplicationCount: number;
}

export interface NotificationOverview {
  id: string;
  title: string;
  unread: boolean;
  sendDate: number;
}

export interface NotificationDetail extends NotificationOverview {
  applicationId: string;
  content: string;
  imageUrls: string[];
}
