import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
} from 'axios';
import { mapData, mapError } from './mapData';

const { CancelToken } = axios;

interface PromiseWithCancel<R> extends Promise<R> {
  cancel?: () => void;
}

export default class Request {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setToken = (token: string) => {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  get = <T = any, R = AxiosResponse<T>>(
    url: string,
    config: AxiosRequestConfig = {}
  ): PromiseWithCancel<R> => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .get(url, apiConfig)
      .then(mapData)
      .catch(mapError);

    request.cancel = () => cancel();
    return request;
  };

  post = <T = any, R = AxiosResponse<T>>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {}
  ) => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .post(url, body, apiConfig)
      .then(mapData)
      .catch(mapError);
    request.cancel = () => cancel();
    return request;
  };

  put = <T = any, R = AxiosResponse<T>>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {}
  ) => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .put(url, body, apiConfig)
      .then(mapData)
      .catch(mapError);
    request.cancel = () => cancel();
    return request;
  };

  patch = <T = any, R = AxiosResponse<T>>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {}
  ) => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .patch(url, body, apiConfig)
      .then(mapData)
      .catch(mapError);
    request.cancel = () => cancel();
    return request;
  };

  delete = <T = any, R = AxiosResponse<T>>(
    url: string,
    config: AxiosRequestConfig = {}
  ): PromiseWithCancel<R> => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .delete(url, apiConfig)
      .then(mapData)
      .catch(mapError);
    request.cancel = () => cancel();
    return request;
  };
}
