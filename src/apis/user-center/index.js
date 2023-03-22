import { userRequest } from "@utils/request";

// 40102020501-新增
export const addFinancial = (params = {}) => {
  return userRequest.post("/save", params);
};
