import axios from "@/utils/request";

/**
 * Get public key for a single asymmetric encryption
 *
 * Key expires after a certain time, and can be only used once
 */
export const getPublicKey = async (): Promise<string> => {
  return (await axios.post("/user/key")).data.publicKey;
};
