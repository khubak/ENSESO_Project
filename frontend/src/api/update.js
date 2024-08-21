import * as URL from "./urls";
import axios from "axios";
import requestHeaders from "./auth";

const update = async (id, data) => {
  const requestURL = URL.baseURL + URL.updateURL + id;

  try {
    const response = axios({
      method: "put",
      url: requestURL,
      headers: requestHeaders("PUT"),
      data: data,
    });
    return response;
  } catch (error) {
    console.error("There was an error making the request:", error);
    throw error;
  }
};

export default update;
