import axios from "axios";
import { API_ROUTE_URL, Local_Storage_Strings } from "./../../../utils/imports.js";

export async function deleteUserRequest(userId) {
    try {
      const api_url = API_ROUTE_URL.delete_user.replace(":userId", userId);
      const accessToken = localStorage.getItem(Local_Storage_Strings.accesstoken);
      const response = await axios.delete(api_url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 200) {
        console.log('User deleted successfully');
        return true;
      } else {
        console.error('Failed to delete user:', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error:', error.response);
      return false;
    }
}