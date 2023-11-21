import api from "../api";

const { get } = api;

const getHotel = async (id: string) => {
  try {
    const data = await get("hotel", { _id: id });
    if (data.error) {
      return data;
    }
    return data.result[0];
  } catch (e) {
    console.error("Error fetching hotel data:", e);
    throw e;
  }
};

const hotelAPI = {
  get: getHotel,
};

export default hotelAPI;
