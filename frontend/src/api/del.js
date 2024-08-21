import * as URL from "./urls";
import axios from "axios";
import requestHeaders from "./auth";

const del = async (id, params) => {
  const requestURL = URL.baseURL + URL.deleteURL + id;

  try {
    const response = axios({
      method: "delete",
      url: requestURL,
      headers: requestHeaders("DELETE"),
      params: params,
    });
    return response;
  } catch (error) {
    console.error("There was an error making the request:", error);
    throw error;
  }
};

export default del;
