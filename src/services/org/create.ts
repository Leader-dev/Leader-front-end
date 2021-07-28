import axios from "@/utils/request";
import { uploadImage } from "@/services/external/uploadImage";

interface CreateOrgArgs {
  name: string;
  instituteName: string;
  address: string;
  introduction: string;
  phone: string[];
  email: string[];
  typeAliases: string[];
  poster: File;
}

export const createOrg = async ({
  name,
  instituteName,
  address,
  introduction,
  phone,
  email,
  typeAliases,
  poster,
}: CreateOrgArgs) => {
  const posterUrl = await uploadImage(poster);
  // console.log(posterUrl)
  await axios.post("/org/create", {
    publicInfo: {
      name: name,
      instituteName: instituteName,
      address: address,
      introduction: introduction,
      phone: phone,
      email: email,
      typeAliases: typeAliases,
      posterUrl: posterUrl,
    },
  });
};
