import axios from "axios";

const BASE_URL = "http://localhost:8080";
// const BASE_URL = "https://carbonoffset-backend-c733.onrender.com";

export async function getTokenData() {
  try {
    const res = await axios.get(`${BASE_URL}/api/token`);
    return { data: res.data.data[0], status: res.status };
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
}

export async function updateTokenPrice(tokenPrice: number, tokenId: string) {
  try {
    console.log("tokenPrice", tokenPrice);
    console.log("tokenId", tokenId);
    const res = await axios.put(
      `${BASE_URL}/api/token/update-token-value/${tokenId}`,
      { tokenPrice }
    );

    return { data: res.data.data, status: res.status };
  } catch (error) {
    console.error("Error updating token price:", error);
    throw error;
  }
}
