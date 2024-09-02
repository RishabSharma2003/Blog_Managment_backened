import axios from 'axios';
import { API_NOTIFICATION_MESSAGES } from './errorMessages.js';

// const API_URL = '';
const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (config.TYPE?.params) {
            config.params = config.TYPE.params;
        } else if (config.TYPE?.query) {
            config.url = `${config.url}/${config.TYPE.query}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => processResponse(response),
    (error) => Promise.reject(processError(error))
);

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        };
    }
};

const processError = (error) => {
    if (error.response) {
        console.log('error in response', error);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        };
    } else if (error.request) {
        console.log('error in request', error);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        };
    } else {
        console.log('error in response', error);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        };
    }
};

const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: { url: '/login', method: 'POST' },
    uploadFile: { url: '/file/upload', method: 'POST' },
    createPost: { url: '/create', method: 'POST' },
    getAllPost: { url: '/posts', method: 'GET', params: true },
    getPostById: { url: '/post', method: 'GET', query: true },
    updatePost: { url: '/update', method: 'PUT', query: true },
    deletePost: { url: '/delete', method: 'DELETE', query: true },
    newComment: {url:'/comment/new', method:'POST' },
    getAllComments: {url:'/comments', method:'GET', query: true},
    deleteComment: {url:'/comment/delete', method: 'DELETE' , query: true}
};

const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProcess, ShowDownloadProcess) => {
        const headers = {
            'Content-Type': value.url === '/file/upload' ? 'multipart/form-data' : 'application/json',
            authorization: sessionStorage.getItem('accessToken')
        };
        return axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body, // Avoid sending body with DELETE
            responseType: value.responseType,
            headers,
            TYPE: getType(value, body),
            onUploadProgress: function (processEvent) {
                if (showUploadProcess) {
                    let percentageCompleted = Math.round((processEvent.loaded * 100) / processEvent.total);
                    showUploadProcess(percentageCompleted);
                }
            },
            onDownloadProgress: function (processEvent) {
                if (ShowDownloadProcess) {
                    let percentageCompleted = Math.round((processEvent.loaded * 100) / processEvent.total);
                    ShowDownloadProcess(percentageCompleted);
                }
            }
        });
    };
}

const getType = (value, body) => {
    if (value.params) {
        return { params: body };
    } else if (value.query) {
        if (typeof body === 'object') {
            return { query: body?._id };
        } else {
            return { query: body };
        }
    }
    return {};
};

export { API };
