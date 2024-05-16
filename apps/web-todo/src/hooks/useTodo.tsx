import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTodoAPI } from "./useTodoAPI";

export const useTodo = () => {
	const queryClient = useQueryClient();
	const {create, list} = useTodoAPI();

	const onMutationsSuccess = () => {
		queryClient.invalidateQueries({
			queryKey: ['todolist']
		})
	}

	const todoQuery = useQuery({
		queryKey: ['todolist'],
		queryFn: list
	});

	const addTodoMutation = useMutation({
		mutationFn: create,
		onSuccess: onMutationsSuccess
	})

	return {
		addTodoMutation,
		todoQuery
	}
}
