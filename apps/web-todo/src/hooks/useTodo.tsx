import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTodoAPI } from "./useTodoAPI";

export const useTodo = () => {
	const queryClient = useQueryClient();
	const {create, list, remove, complete} = useTodoAPI();

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

	const deleteMutation = useMutation({
		mutationFn: remove,
		onSuccess: onMutationsSuccess
	})

	const completeMutation = useMutation({
		mutationFn: complete,
		onSuccess: onMutationsSuccess
	})

	return {
		todoQuery,
		addTodoMutation,
		deleteMutation,
		completeMutation
	}
}
