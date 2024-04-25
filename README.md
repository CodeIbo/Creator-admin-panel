# Creator777 - Full Stack Application

> The goal of application was create ecosystem which one can create content to pages without deploying changes and be scalable as easy as possible. Stack of application include Backend ( **Mysql 8.033** , **Node.js & express** suported via **sequelizer** ). Admin Panel ( **React 18.2** ). Front-End ( **Angular 14.06** ) . Stack is [dockerized](https://www.docker.com/ 'dockerized'), for more accessability in diffrent enviroment. Every section is described in separate repository

1. [API - Gtihub](https://github.com/Ibonom/Creator777-API)
2. [Front-end - Gtihub](https://github.com/Ibonom/Creator777-Front-end)

<br>

# Description Admin Panel (React-app)

This React Admin Panel is designed to facilitate efficient management of web applications. Built using Material-UI (MUI) components, the panel offers a polished interface and robust functionality. Network requests are handled via Axios, ensuring streamlined and reliable HTTP communication.

Key features include:

- **User Authentication**: User login state is persistently stored in cookies to maintain session continuity even after the browser is closed.
- **Dynamic Rendering**: Forms and data display tables are dynamically rendered based on JSON files. This design choice simplifies modifications and enhances the expandability of the panel.

## Installation

### Step by Step

1. Clone the repository:&nbsp; `git clone [repository-url]`
2. Create file **.env** based on **env.example** and fill all positions (:heavy_exclamation_mark:Important). If you don't have install [Docker Engine](https://docs.docker.com/get-docker/)
3. Create containers based on docker-compose.yml:&nbsp; `docker compose up`
4. Attach shell to container **blogpanel**:&nbsp; `docker exec -it `
5. Install dependencies
6. Start panel:&nbsp; `npm start`

## TODO

- [ ] **Welcome Screen Creation**: Design and implement a welcome screen that greets users upon successful login. This feature aims to enhance user experience by providing a friendly and informative entry point to the application.

- [ ] **Integration with External Analytics Tools**: Integrate an analytics panel to monitor website traffic. This will involve connecting with external tools to display real-time analytics, helping us understand user interactions and improve site performance.

- [ ] **Refactoring Form and Table Components**: Break down the existing Form and Table components into smaller, more manageable units. This effort will reduce the complexity of our codebase, making it easier to maintain and extend these components.

- [ ] **Writing Tests**: Develop and write tests to ensure all components function correctly and meet expected behaviors. This will improve reliability and stability across the application.

- [ ] **Unique Design Implementation**: Create a unique design aesthetic for the application by replacing Material-UI (MUI) components with custom components that utilize local CSS styles. This will allow us to have greater control over the visual aspects and improve performance by reducing dependencies.
