import http from "@/utils/http";

export const login = (data: any) => {
  return http.post("/user/login", data);
};

export const query_user_page = (data: any) => {
  return http.get("/user/query_user_page", data);
};

export const delete_user = (data: any) => {
  return http.del(`/user/delete/${data.id}`, data);
};

export const edit_user = (data: any) => {
  return http.post('/user/edit_user', data);
};

