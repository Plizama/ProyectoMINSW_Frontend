import httpClient from "../http-common";

const getByRutAndMonth = (rut, month, year) => {
    return httpClient.get(`/extraHours/getByRutAndMonth/${rut}/${month}/${year}`);
  };

const approveExtraHours = (rut, date) => {
  return httpClient.put(`/extraHours/approve/${rut}/${date}`);
};

export default { getByRutAndMonth, approveExtraHours };
