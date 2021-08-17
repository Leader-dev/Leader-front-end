import { useState } from "react";
import axios from "@/utils/request";
import useSWR from "swr";
import { useThrottleFn } from "@react-cmpt/use-throttle";

export const likeMomentItem = async ({
  trendItemId,
}: {
  trendItemId: string;
}) => {
  await axios.post("/trend/like", { trendItemId });
};

export const unlikeMomentItem = async ({
  trendItemId,
}: {
  trendItemId: string;
}) => {
  await axios.post("/trend/unlike", { trendItemId });
};

export const useLiked = ({
  trendItemId,
  defaultLiked,
}: {
  trendItemId: string;
  defaultLiked: boolean;
}) => {
  const [liked, setLiked] = useState(defaultLiked);
  const { callback } = useThrottleFn(async (status: boolean) => {
    if (status) {
      await unlikeMomentItem({ trendItemId });
    } else {
      await likeMomentItem({ trendItemId });
    }
  }, 512);
  return {
    liked,
    toggleLiked: () => {
      setLiked(!liked);
      callback(liked);
    },
  };
};
