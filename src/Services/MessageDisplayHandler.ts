import { message } from "antd";
import "antd/dist/antd.css";

export const successMsg = (msg: string) => {
  return message.success(msg);
};

export const errorMsg = (err: string) => {
  return message.error(err);
};
