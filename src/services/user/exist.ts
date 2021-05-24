import axios from "@/utils/request";

interface ExistsByPhoneProps {
  phone: string;
}

interface ExistsByUsernameProps {
  username: string;
}

/**
 * Check if user exists by phone number or username
 *
 * Must pass a phone OR username
 */
export const userExist = async (
  data: ExistsByPhoneProps | ExistsByUsernameProps
): Promise<boolean> => {
  if ("username" in data) {
    return await axios
      .post("/user/exist", { username: data.username })
      .then((res) => {
        return res.data.exist;
      });
  } else {
    return await axios
      .post("/user/exist", { phone: data.phone })
      .then((res) => {
        return res.data.exist;
      });
  }
};
