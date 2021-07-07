import axios from "@/utils/request";

interface CheckAuthcodeProps {
  phone: string;
  authcode: string;
}

export const checkAuthcode = async (data: CheckAuthcodeProps) => {
  const d = (await axios.post("/user/check-authcode", data)).data;
  if (d.code !== 200) {
    throw d.error;
  }
};

interface ChangePasswordProps {
  phone: string;
  password: string;
}

export const changePassword = async (data: ChangePasswordProps) => {
  const d = (await axios.post("/user/change-password", data)).data;
  if (d.code !== 200) {
    throw d.error;
  }
};
