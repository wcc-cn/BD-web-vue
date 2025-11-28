import axiosInstance from "./axios";


const post = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const get = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, { params: data })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const put = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(url, data)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const del = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(url, { data })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  post, get, put, del
}
