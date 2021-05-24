import axios from "@/utils/request";

interface LoginProps {
  username: string;
  password: string;
}

/**
 * Login using credentials. Login status is saved using session
 */
export const login = async (data: LoginProps) => {
  return await axios.post("/user/login", data);
};
