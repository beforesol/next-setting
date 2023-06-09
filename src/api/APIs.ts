import { get } from '@src/api';

const test = (id: number) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;

  return get(url);
};

const APIs = {
  test
};

export default APIs;
