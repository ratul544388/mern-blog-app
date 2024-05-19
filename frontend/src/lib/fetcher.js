import axios from "axios";

const fetcher = async (url, query = {}) => {
  const { data } = await axios.get(url, { params: query });
  return data;
};

export default fetcher;
