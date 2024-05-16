import { useTodo } from "../hooks/useTodo";
import TodoInputForm from "./TodoInputForm";

export default function TodoList() {
	const {todoQuery} = useTodo();

	const {data: list, isLoading, isError, error} = todoQuery

	return (<>
		{isError && <span>Error Happened {error.message} {error.name}</span>}
		{/* {list && <TodoInputForm onEnter={addNewTodoItem} />} */}
		{list && <TodoInputForm />}
		{isLoading && <div>Loading Todos...</div>}
		{list && list?.map((el) => (
			<div key={el._id} className="my-3 ml-3 mr-4 text-lg text-black">
				<span>{el.description}</span>
			</div>
		))}
	</>)
}
