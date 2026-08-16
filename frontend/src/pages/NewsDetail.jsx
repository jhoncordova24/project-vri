import React from "react";
import { useParams } from "react-router-dom";
import { useNewsDetail } from "../hooks/useNewsDetail";
import NewsDetailContent from "../components/NewsDetail/NewsDetail";

export default function NewsDetail() {
  const { id } = useParams();
  const { newsItem, otherNews, loading, error } = useNewsDetail(id);

  return (
    <NewsDetailContent
      newsItem={newsItem}
      otherNews={otherNews}
      loading={loading}
      error={error}
    />
  );
}
