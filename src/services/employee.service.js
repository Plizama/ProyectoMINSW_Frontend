import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/employees/');
};

const getEmployeeByRut = (rut) => {
    return httpClient.get(`/employees/${rut}`);
};

const getYearsOfService = (rut) => {
    return httpClient.get(`/employees/yearsOfService/${rut}`);
};
export default { getAll, getEmployeeByRut, getYearsOfService };