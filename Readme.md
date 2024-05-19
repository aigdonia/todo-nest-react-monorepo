# Todo List Web Application
This is a fullstack todo app provided as part of recruitment process I participated with.

## Hi, Please Read

Application backend is deployed on AWS EC2 instance [here](https://ec2-54-164-189-111.compute-1.amazonaws.com/), however this URL is Https, please consider this is a self signed ssl, so you may have some warnings if you opened it from browser, however, it is safe.

Frontend is served through this repo's ghpages [here](https://aigdonia.github.io/todo-nest-react-monorepo/), this is automatically handled by github actions for frontend only at the moment.

For sake of time I couldn't do much of testing, usually I add unit tests of critical units inside my code

Once you opened the link, please click the blue login button up there, it will authenticate you before you can start using the application.


### Backend
	- Implemented using NestJS
	- Authentication I used Auth0
	- Database I used A NoSQL (MongoDB on Atlas) database due to the nature of the application, additionally I can deploy freely on cloud for demostration.
    - Delpoyed to EC2 instance, I tried serverless framework but consumed some time, so I decided at the end to go old school and deploy to EC2 instance, nginx for reverse proxy and self signed SSL for https access, I may improve this later.
    - Dockerize backend application and added compose for handy usage.
    - Postman collection export can be found [here](https://github.com/aigdonia/todo-nest-react-monorepo/blob/main/docs/todo-server.json?raw=true)

### Frontend
	- Implemented using React with vite to build and serve.
	- Used ReactQuery and React Hooks for data fetching and state management.
	- Used TailwindCSS+Tremor for styling.

### Here is a screenshot of the application

![alt text](https://github.com/aigdonia/todo-nest-react-monorepo/blob/main/apps/web-todo/public/preview.jpeg?raw=true)
