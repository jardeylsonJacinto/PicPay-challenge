import axios from 'axios';

export const authorizeTransaction = async (): Promise<boolean> => {
  const response = await axios.get(
    'https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc'
  );
  return response.data;
};
