import { Timestamp } from "@/types/organization";
import { PuppetInfo } from "@/types/puppet";
import axios from "@/utils/request";
import useSWR from "swr";

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

interface Trend {
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

type AnonymousTrend = Overwrite<
  Trend,
  {
    anonymous: true;
    puppetId: null;
    puppetInfo: null;
    orgName: null;
    orgtitle: null;
  }
>;

export const useTrendList = ({
  pageNumber,
  pageSize,
}: {
  pageNumber: number;
  pageSize: number;
}) => {
  return useSWR(
    ["/trend/list", pageNumber, pageSize],
    (u, pageNumber, pageSize) =>
      axios
        .post(u, { pageNumber, pageSize })
        .then((res) => res.data.trends as (Trend | AnonymousTrend)[])
  );
};
