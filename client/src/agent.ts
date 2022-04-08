import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Projects } from "./models/project";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
    get: <T>(url: string, config?: AxiosRequestConfig<any> | undefined) =>
        axios.get<T>(url, config).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
    patch: <T>(url: string) => axios.patch<T>(url).then(responseBody),
};

const Project = {
    list: () => requests.get<Projects[]>('https://localhost:7047/api/projects'),
    delete: (projectId:number) => requests.del<void>(`https://localhost:7047/api/projects/${projectId}`),
    addProject:(project: Projects) => requests.post<Projects>(`https://localhost:7047/api/projects`,project),

};


const agent = {
    Project

};
export default agent;