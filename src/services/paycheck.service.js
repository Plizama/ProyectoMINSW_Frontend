import httpClient from "../http-common";

const calculatePaychecks = (year, month) => {
  return httpClient.get(`/paychecks/calculate/${year}/${month}`);
};
const getPaycheckDetails = (rut, year, month) => {
    return httpClient.get(`/paychecks/paycheck/${rut}/${year}/${month}`);
  };

export default { calculatePaychecks, getPaycheckDetails };
