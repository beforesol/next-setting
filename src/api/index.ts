import axios from 'axios';

export const get = async (url: string, params: object = {}, headers: object = {}) => {
  try {
    const result = await axios.get(url, {
      ...params,
      withCredentials: true,
      headers: { 
        'Content-Type': 'application/json',
        ...headers 
      },
    });
    const { data } = result;

    return data;
  } catch (e) {
    return console.error('API [GET] Error', e);
  }
};

export const post = async (url: string, body = '', params: object = {}, headers: object = {}) => {
  try {
    const result = await axios.post(url, body, {
      ...params,
      withCredentials: true,
      headers: { 
        'Content-Type': 'application/json',
        ...headers 
      },
    });
    const { data } = result;

    return data;
  } catch (e) {
    return console.error('API [GET] Error', e);
  }
};
