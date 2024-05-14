import { useState } from "react"

export default function TodoApp() {
	const list = [
		{
			"_id": "664280dcbe93ab76fc86d9d7",
			"description": "Followup on Expat Living",
			"completed": false,
			"createdAt": "2024-05-13T21:06:36.625Z",
			"__v": 0
		},
		{
			"_id": "664280b4be93ab76fc86d9d4",
			"description": "Prepare Maher's Offboarding",
			"completed": false,
			"createdAt": "2024-05-13T21:05:56.084Z",
			"__v": 0
		}
	]

	const [newTodo, setNewTodo] = useState("");
	function addNewTodoItem() {
		console.log(newTodo);
		setNewTodo("")
	}

	return (<>
		<div className="flex flex-col items-start justify-center w-[500px] h-[100vh] mx-auto gap-4">
			<div>
				<h1 className="text-2xl text-gray-100">Todo List</h1>
				<span className="text-gray-300"> This list will help you get your stuff done</span>
			</div>

			<div className="w-full h-[80vh] border bg-slate-400 border-slate-400 shadow-lg overflow-x-auto overflow-y-hidden rounded">
				<div>
					<input placeholder="Got New stuff to do?" value={newTodo}
						type="text" className="w-full px-4 py-3" autoFocus
						onChange={(e) => setNewTodo(e.target.value)}
						onKeyDown={(e) => { e.target?.value && e.key == "Enter" && addNewTodoItem() }}
					/>
				</div>
				{list.map(el => (
					<div key={el._id} className="my-3 ml-3 mr-4 text-lg">
						<span>{el.description}</span>
					</div>
				))}
			</div>

			<p className="text-gray-200">this work is done as part of hiring process.</p>
		</div>
	</>)
}
