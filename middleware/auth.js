
// =========================Function for auth of Roaunz API
const authResponseApi = async () => {
  try {
    const response = await axios.post(
      `https://api.sports.roanuz.com/v5/core/${process.env.ROANUZ_PROJECT_KEY}/auth/`,
      { api_key: ROANUZ_API_KEY },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const token = response.data.data.token;
    return token;
  } catch (error) {
    return error.message;
  }
};
