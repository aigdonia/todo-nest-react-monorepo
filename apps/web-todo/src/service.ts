import { AxiosInstance, AxiosResponse } from 'axios';
import { TodoItem } from './types';

export const createAPI = (apiInstance: AxiosInstance) => {
	return {
		async list(): Promise<TodoItem[]> {
			return (await apiInstance.get('/todo')).data
		},
		async create(body: string): Promise<TodoItem> {
			return (await apiInstance.post('/todo', { "todo": body })).data
		},
		async complete(todoId: string):Promise<AxiosResponse> {
			return await apiInstance.put(`/todo/${todoId}`, { completed: true })
		},
		async delete(todoId: string) {
			return await apiInstance.delete(`/todo/${todoId}`)
		}
	}
}


