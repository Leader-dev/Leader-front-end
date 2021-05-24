import axios from "@/utils/request";

interface RegisterProps {
  username: string;
  password: string;
  phone: string;
  authcode: string;
}

/**
 * Register using credentials
 */
export const register = async (data: RegisterProps) => {
  return await axios.post("/user/register", data);
};
