import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Axios instance oluşturuluyor
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// GET işlemi için custom hook
export function useGet<T>(key: string[], url: string) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await api.get<T>(url);
      return data;
    },
  });
}

// POST işlemi için custom hook
export function usePost<T, U>(url: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newData: T) => {
      const { data } = await api.post<U>(url, newData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

// PUT işlemi için custom hook
export function usePut<T, U>(url: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: T }) => {
      const { data: responseData } = await api.put<U>(`${url}/${id}`, data);
      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

// DELETE işlemi için custom hook
export function useDelete(url: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      await api.delete(`${url}/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
