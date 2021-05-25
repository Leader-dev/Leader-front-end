import axios from "@/utils/request";

interface ChangePasswordProps {
  phone: string;
  authcode: string;
  password: string;
}

export const changePassword = async (data: ChangePasswordProps) => {
  await axios.post("/user/changepassword", data);
};
