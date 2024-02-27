import { BASE_URL, xAuth } from "../constans/urls";
import axios from "axios";

export async function handleFetchData(data) {
  const response = await axios.post(BASE_URL, data, {
    headers: {
      "X-Auth": xAuth,
    },
  });

  const fetchData = await axios.post(
    BASE_URL,
    {
      action: "get_items",
      params: { ids: response.data.result },
    },
    {
      headers: {
        "X-Auth": xAuth,
      },
    }
  );
  return fetchData.data;
}
