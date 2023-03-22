import { fileRequest } from "@utils/request";

// 40102020501-上传
export const uploadFile = (file) => {
  const { name } = file;
  const payload = new FormData();
  payload.append("upfile", file);
  // payload.append('upType', 'image');
  payload.append("upType", "news-image");
  payload.append("up_name", name);
  return fileRequest.post("/file/upload", payload);
};
