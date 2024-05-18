import { useAuth0 } from "@auth0/auth0-react";
import TodoList from "./components/TodoList";
import { Button } from "@tremor/react";

export default function TodoApp() {
	const { isAuthenticated, loginWithPopup, logout } = useAuth0();

	return (<>
		<div className="flex flex-col items-start justify-center w-[500px] h-[100vh] mx-auto gap-4 text-dark-tremor-content-emphasis">
			<div className="w-full flex flex-row items-center justify-between">
				<div>
					<h1 className="text-2xl">Todo List</h1>
					<span > This list will help you get your stuff done</span>
				</div>
				<div>
					{!isAuthenticated && <Button onClick={() => loginWithPopup()}>Login</Button>}
					{isAuthenticated && <div>
						<Button onClick={() => logout()}>Logout</Button>
					</div>}
				</div>
			</div>


			<div className="w-full h-[80vh] overflow-y-auto rounded">
				{isAuthenticated && <TodoList />}
			</div>

			<p >this work is done as part of hiring process.</p>
		</div>
	</>)
}
