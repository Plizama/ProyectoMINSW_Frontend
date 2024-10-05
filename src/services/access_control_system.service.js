import httpClient from "../http-common";

const uploadFile = (file) => {
  let formData = new FormData();
  formData.append("file", file);

  return httpClient.post('/access-control/process-file', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

const processExtraHours = () => {
  return httpClient.post('/access-control/process-extra-hours');
};

const processDiscounts = () => {
  return httpClient.post('/access-control/process-discounts');
};

export default { uploadFile, processExtraHours, processDiscounts };
