import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/employees/');
}
export default { getAll };