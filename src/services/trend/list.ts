import { Timestamp } from "@/types/organization";
import { PuppetInfo } from "@/types/puppet";
import { AnonymousTrend, Trend } from "@/types/trend";
import axios from "@/utils/request";
import useSWR from "swr";

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
