import useSWR, { SWRConfiguration, mutate } from 'swr';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Utility function for handling HTTP requests
const httpRequest = async (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse['data']> => {
    const response = await axios({ method, url, data, ...config });
    return response.data;
};

// SWR fetcher using the utility function
const fetcher = (url: string, config?: AxiosRequestConfig) => httpRequest('get', url, null, config);

// useData hook using SWR and the fetcher
export const useData = (url: string, config?: SWRConfiguration) => {
    const { data, error } = useSWR(url, fetcher, config);

    return {
        data,
        isLoading: !error && !data,
        isError: error
    };
};

// Reusable functions for different HTTP methods
export const get = (url: string, config?: AxiosRequestConfig, mutateKey?: string | false) =>
    httpRequest('get', url, null, config).then(responseData => {
        if (mutateKey) {
            mutate(mutateKey);
        }
        return responseData;
    });

export const post = (url: string, data: any, config?: AxiosRequestConfig, mutateKey?: string | false) =>
    httpRequest('post', url, data, config).then(responseData => {
        if (mutateKey) {
            mutate(mutateKey);
        }
        return responseData;
    });

export const put = (url: string, data: any, config?: AxiosRequestConfig, mutateKey?: string | false) =>
    httpRequest('put', url, data, config).then(responseData => {
        if (mutateKey) {
            mutate(mutateKey);
        }
        return responseData;
    });

export const del = (url: string, config?: AxiosRequestConfig, mutateKey?: string | false) =>
    httpRequest('delete', url, null, config).then(responseData => {
        if (mutateKey) {
            mutate(mutateKey);
        }
        return responseData;
    });