import axios from "axios";
import { API_ROUTE_URL, Local_Storage_Strings } from "./../../../utils/imports.js";

export async function editUserRequest(userId, updatedData) {
  try {
    const api_url = API_ROUTE_URL.update_user.replace(":userId", userId);
    console.log("okay here");
    const accessToken = localStorage.getItem(Local_Storage_Strings.accesstoken);
    console.log(updatedData);
    const response = await axios.put(api_url, updatedData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Response:', response.status);

    if (response.status === 200) {
      console.log('User updated successfully');
      return true;
    } else {
      console.log('Failed to update user');
      return false;
    }
  } catch (error) {
    console.log('Error:', error);
    return false;
  }
}