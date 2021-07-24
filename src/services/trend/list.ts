import { Timestamp } from "@/types/organization";
import { PuppetInfo } from "@/types/puppet";
import axios from "@/utils/request";
import useSWR from "swr";

interface Trend {
  id: string;
  puppetId: string;
  puppetInfo: PuppetInfo;
  orgName: string;
  orgTitle: string;
  anonymous: boolean;
  sendDate: Timestamp;
  content: string;
  imageUrls: string[];
  likeCount: number;
  liked: boolean;
}

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
        .then((res) => res.data.trends as Trend[])
  );
};
