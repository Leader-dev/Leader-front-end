import axios from "@/utils/request";

interface ExistsByUsernameProps {
  phone: string;
}

/**
 * Check if user exists by phone number
 *
 * Must pass a phone
 */
export const userExist = async (
  data: ExistsByUsernameProps
): Promise<boolean> => {
  return await axios.post("/user/exist", { phone: data.phone }).then((res) => {
    return res.data.exist;
  });
};
