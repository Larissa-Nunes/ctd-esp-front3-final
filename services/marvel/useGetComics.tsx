import { useState } from "react";
import { useQuery } from "react-query";
import { getComics } from "./marvel.service";

export function useGetComics() {
  const [limit, setLimit] = useState(12);

  const { data, isLoading } = useQuery(
    ["getComics", limit],
    () => getComics(0, limit),
    {
      keepPreviousData: true
    }
  );

  const limitTotal = data?.data?.total / 12;

  const loadingMoreComics = () =>
    setLimit((prevState) => Math.min(prevState + 12, limitTotal));

  const loadingLessComics = () =>
    setLimit((prevState) => Math.max(prevState - 12, 12));

  return {
    data,
    isLoading,
    loadingMoreComics,
    loadingLessComics,
  }
}
