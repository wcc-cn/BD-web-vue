import http from "@/utils/http";

export const addVideo = (data: any) => {
  return http.post("/video/add", data);
};

export const getVideoPage = (data: any) => {
  return http.get("/video/query_video_page", data);
};

export const delete_video = (data: any) => {
  return http.del(`/video/delete/${data.id}`, data);
};
