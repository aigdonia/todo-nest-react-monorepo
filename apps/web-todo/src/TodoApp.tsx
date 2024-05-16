import { useAuth0 } from "@auth0/auth0-react";
import TodoList from "./components/TodoList";

export default function TodoApp() {
	const { isAuthenticated, loginWithPopup, logout } = useAuth0();

	return (<>
		<div className="flex flex-col items-start justify-center w-[500px] h-[100vh] mx-auto gap-4">
			<div className="w-full flex flex-row items-center justify-between">
				<div>
					<h1 className="text-2xl text-gray-100">Todo List</h1>
					<span className="text-gray-300"> This list will help you get your stuff done</span>
				</div>
				<div>
					{!isAuthenticated && <button onClick={() => loginWithPopup()}>Login</button>}
					{isAuthenticated && <div>
						<button onClick={() => logout()}>Logout</button>
					</div>}
				</div>
			</div>


			<div className="w-full h-[80vh] border bg-slate-400 border-slate-400 shadow-lg overflow-x-auto overflow-y-hidden rounded">
				{isAuthenticated && <TodoList />}
			</div>

			<p className="text-gray-200">this work is done as part of hiring process.</p>
		</div>
	</>)
}
