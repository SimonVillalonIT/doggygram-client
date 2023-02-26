import axios from "axios";

export default async function DogDetect(image: string) {
  const blob = DataURIToBlob(image);
  const fileName = `${blob.name}.${blob.type.split("/")[1]}`;
  const file = new File([blob], fileName);
  const formData = new FormData();
  formData.append("image", file, fileName);

  try {
    const { data } = await axios.post(
      (process.env.NEXT_PUBLIC_DogRecognitionAPI as string) + "detect",
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data}`,
        },
      }
    );
    return data.Result;
  } catch (error) {
    console.log("Internal error: " + error);
    console.log(error);
  }
}

export function DataURIToBlob(dataURI: string) {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
}
