import { useTodo } from "../hooks/useTodo";
import TodoInputForm from "./TodoInputForm";
import { Callout, Icon } from '@tremor/react';
import { RiDeleteBin7Fill, RiCheckboxLine, RiCheckboxBlankLine, RiAlarmWarningLine } from '@remixicon/react'
import { Card } from '@tremor/react'
import { InfinitySpin } from "react-loader-spinner";
import { TodoItem } from "../types";
import clsx from "clsx";

/**
 * The TodoListItem component renders a single todo item with options to mark as complete or delete.
 * @param  - The `TodoListItem` component takes a `todo` prop, which is an object of type `TodoItem`.
 * The `todo` object has properties like `_id` for unique identification, `description` for the task
 * description, and `completed` to indicate if the task is completed or not.
 * @returns The `TodoListItem` function is returning JSX code that represents a single todo item
 * displayed in a Card component. The todo item includes a checkbox icon, the description of the todo,
 * and a delete button icon. The checkbox icon changes based on whether the todo item is completed or
 * not. The user can click on the checkbox to mark the todo as complete, and click on the delete button
 * to delete the
 */
function TodoListItem({ todo }: { todo: TodoItem }) {
	const { completeMutation, deleteMutation } = useTodo()
	return (<Card
		key={todo._id}
		className={clsx("flex flex-row justify-between items-start py-3 pl-3 pr-4 text-lg text-slate-400", {'text-slate-600':todo.completed})}
	>
		<div onClick={() => { !todo.completed && completeMutation.mutate(todo._id) }}>
			<Icon size="sm" variant="simple"
				icon={todo.completed ? RiCheckboxLine : RiCheckboxBlankLine}
				className={`${clsx(todo.completed?'cursor-not-allowed':'cursor-pointer')}`}
				color={todo.completed ? "zinc" : "sky"}
				tooltip={todo.completed ? undefined :"Complete this Todo"}
			/>
		</div>
		<p className="flex-grow">{todo.description}</p>
		{!todo.completed && <button onClick={() => { deleteMutation.mutate(todo._id) }}>
			<Icon size="sm" icon={RiDeleteBin7Fill} tooltip="Delete This Todo" variant="shadow" color="rose" />
		</button>}
	</Card>)
}

/* TodoList component lists todos after fetching them from server using useQuery based query, also
  * renders todo input form a loader spinner and basic error display */
export default function TodoList() {
	const { todoQuery } = useTodo();

	const { data: list, isLoading, isError, error } = todoQuery

	return (<>
		{isError && <div className="w-full h-80 flex flex-col items-center justify-center">
			<Callout
				className="mt-4 w-11/12"
				title={error.message}
				icon={RiAlarmWarningLine}
				color="rose"
			>
				Error {error.name} occured while initializing / fetching todos
			</Callout>
		</div>}
		{isLoading && <div className="w-full h-80 flex flex-col items-center justify-center">
			<InfinitySpin width="200" color="#0ea5e9" />
			<div>loading todos</div>
		</div>}
		{list && <TodoInputForm />}
		{list && <div className="mt-5 flex flex-col gap-2">
			{list?.map((el) => (
				<TodoListItem todo={el} key={el._id} />
			))}
		</div>}
	</>)
}
