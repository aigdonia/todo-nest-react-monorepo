import ReactDOM from 'react-dom/client'
import TodoApp from './TodoApp.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Auth0Provider } from '@auth0/auth0-react';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Auth0Provider
		domain='dev-unr521cluqvwc41c.us.auth0.com'
		clientId='6UchndCYL35Ba3wAV2kS5eVabpTuojPo'

		authorizationParams={{
			redirect_uri: window.location.origin
		}}
		cacheLocation='localstorage'
	>
		<QueryClientProvider client={queryClient}>
			<TodoApp />
		</QueryClientProvider>
	</Auth0Provider>
)
