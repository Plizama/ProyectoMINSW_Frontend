import httpClient from "../http-common";

const getByRutAndMonth = (rut, month, year) => {
    return httpClient.get(`/discountHours/getByRutAndMonth/${rut}/${month}/${year}`);
  };

const approveDiscountHours = (rut, date) => {
  return httpClient.put(`/discountHours/approve/${rut}/${date}`);
};

export default { getByRutAndMonth, approveDiscountHours };
