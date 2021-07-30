import { Timestamp } from "./organization";
import { PuppetInfo } from "./puppet";

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export interface Trend {
  id: string;
  puppetId: string;
  puppetInfo: PuppetInfo;
  orgName: string;
  orgTitle: string;
  anonymous: false;
  sendDate: Timestamp;
  content: string;
  imageUrls: string[];
  likeCount: number;
  liked: boolean;
}

export type AnonymousTrend = Overwrite<
  Trend,
  {
    anonymous: true;
    puppetId: null;
    puppetInfo: null;
    orgName: null;
    orgTitle: null;
  }
>;
