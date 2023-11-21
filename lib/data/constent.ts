import api from "../api";

const { get } = api;

const getContent = async (params: {
  _id?: string;
  parent_id?: string;
  hotel?: string;
  path?: string;
}) => {
  try {
    const data = await get("content", params);
    if (data.error) {
      return data;
    }
    return data.result;
  } catch (e) {
    console.error("Error fetching content data:", e);
    throw e;
  }
};

const contentAPI = {
  get: getContent,
};

export default contentAPI;
