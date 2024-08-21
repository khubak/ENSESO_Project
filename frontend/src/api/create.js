import * as URL from "./urls";
import axios from "axios";
import requestHeaders from "./auth";

const create = async (data) => {
  const requestURL = URL.baseURL + URL.postURL;

  try {
    const response = axios({
      method: "post",
      url: requestURL,
      headers: requestHeaders("POST"),
      data: data,
    });
    return response;
  } catch (error) {
    console.error("There was an error making the request:", error);
    throw error;
  }
};

export default create;