import http from "@/utils/http";

export const queryDetectResultPage = (data: any) => {
  return http.get("/detect_result/query_detect_result_page", data);
};

export const deleteDetectResult = (data: any) => {
  return http.del(`/detect_result/delete/${data.id}`, data);
};
