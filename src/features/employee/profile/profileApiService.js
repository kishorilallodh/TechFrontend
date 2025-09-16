// services/profileApiService.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/profile/`; 
 
// ✅ Function to get profile of logged in user
const getMyProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // 👉 Token ko header me bhej rahe h
    },
  };
  const response = await axios.get(API_URL + "me", config);
  return response.data; // 👉 Response ka sirf data return kar rahe h
};

const upsertMyProfile = async (profileData, token) => {
  const formData = new FormData();

  // 👉 profileData object ke sare keys FormData me daal dena
  Object.keys(profileData).forEach((key) => {
    if (profileData[key] !== null && profileData[key] !== undefined) {
      formData.append(key, profileData[key]); // 👉 null/undefined ko ignore kar diya
    }
  });

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "me", formData, config);
  return response.data;
};

const getProfileByUserId = async (userId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(`${API_URL}user/${userId}`, config);
    return response.data;
};

// ✅ Export service methods
const profileApiService = {
  getMyProfile,
  upsertMyProfile,
  getProfileByUserId,
};

export default profileApiService;
