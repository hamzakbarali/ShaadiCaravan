import axios from "axios";
import { API_ROUTE_URL, Local_Storage_Strings } from "./../../../utils/imports.js";

export async function getAllUsersRequest(setUsers) {
  try {
    const api_url = API_ROUTE_URL.get_all_users;
    const accessToken = localStorage.getItem(Local_Storage_Strings.accesstoken);
    console.log('Fetching users...');
    const response = await axios.get(api_url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Response:', response.status);

    if (response.status === 200) {
      console.log('Users:', response.data);
      setUsers(response.data);
    } else {
      setUsers([]);
    }
  } catch (error) {
    if (error.response) {
      if (!error.response.data.success) {
        setUsers([]);
      }
    } else {
      setUsers([]);
    }
  }
}