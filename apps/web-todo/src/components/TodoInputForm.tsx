import { FormEvent, useState } from "react";
import { useTodo } from "../hooks/useTodo";

export default function TodoInputForm() {
	const [value, setValue] = useState("");
	const { addTodoMutation } = useTodo();

	function handleFormSubmit(e:FormEvent) {
		e.preventDefault();
		if (value.trim()) {
			addTodoMutation.mutate(value)
			setValue("")
		}
	}

	return (<form onSubmit={handleFormSubmit}>
		<input placeholder="Got New stuff to do?" value={value}
			type="text" className="w-full px-4 py-3 text-black" autoFocus
			onChange={(e) => setValue(e.target.value)}
		/>
	</form>)
}
