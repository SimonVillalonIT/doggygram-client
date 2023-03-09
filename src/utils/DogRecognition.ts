export function GenerateFormData(dataURI: string) {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  const blob = new Blob([ia], { type: mimeString });
  const fileName = `${blob.name}.${blob.type.split("/")[1]}`;
  const file = new File([blob], fileName);
  const formData = new FormData();
  formData.append("image", file, fileName);
  return formData;
}
