import React from "react";
import { useLocation } from "react-router-dom";

export default function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  // URL SearchParams 복잡한 URL 파라미터에서 얻고 싶은 정보만 빼내서 얻을 수 있는 JS 내장 함수
  console.log(keyword);

  return null;
}
