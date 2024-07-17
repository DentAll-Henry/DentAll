import axiosInstance from "@/utils/axiosInstance";

const getImages = async (folder: string) => {
  const files = await axiosInstance.post("/files/images", { folder });
  return files;
};

const uploadImage = async (folder: string, file: any) => {
  console.log(file);
  const upload = await axiosInstance.post("/files/upload", {
    folder: folder,
    file: file,
  });
  return upload;
};

export { getImages, uploadImage };
