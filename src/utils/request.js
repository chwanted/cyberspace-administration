import { BASE_URL, UPLOAD_URL } from "../config/index";
import axios from "axios";
import { Toast } from "vant";

const createRequest = (baseURL, intercept = true) => {
  // 创建axios实例
  const request = axios.create({
    baseURL, // api 的 base_url
  });

  // request拦截器
  request.interceptors.request.use(
    (config) => {
      config.headers = {
        "Access-Control-Allow-Credentials": "*",
        "Content-Type": "application/json",
        _cl: "SERVER",
        _menu_id: "1606",
        _oid: "3",
        _org_name: "AI%u515A%u7FA4",
        _org_type: "102803",
        _region_id: "1",
        _tk: "ff81eb47-efea-49e8-b1e4-63ea064f76ee",
        _type: "2",
        _uid: "5",
        _un: "%u674E%u5170%u7389",
        _uoid: "3",
      };
      return config;
    },
    (error) => {
      // Do something with request error
      Toast.fail({
        message: error.msg || error.message,
        duration: 1000,
      });
      console.error(error); // for debug
      Promise.reject(error);
      return;
    }
  );

  // response 拦截器
  request.interceptors.response.use(
    (response) => {
      const res = response.data;
      // 不需要全局处理， 默认true
      if (!intercept) {
        return res;
      }
      if (res.code !== 0) {
        Toast.fail({
          message: res.msg || res.message,
          duration: 2000,
        });
        console.error(res.msg || res.message);
        return Promise.reject(res);
      } else {
        return res.data;
      }
    },
    (error) => {
      console.error("err" + error);
      Toast.fail({
        message: String(error),
        duration: 2000,
      });
      return Promise.reject(error);
    }
  );

  return request;
};

// 文件中心
export const fileRequest = createRequest(`${UPLOAD_URL}/file`);

// 金融填报
export const userRequest = createRequest(`${BASE_URL}/fill`);
