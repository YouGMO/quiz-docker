# Quiz project

Our project aims to provide a comprehensive solution that combines the power of ReactJS and Spring Boot to create a robust and user-friendly web application. With ReactJS on the front-end, we can build dynamic and interactive user interfaces, while Spring Boot handles the server-side logic and provides a scalable and secure back-end infrastructure. MySQL is utilized as the database to store and manage the application's data efficiently.

## Prerequisites

Before running this project, make sure you have the following prerequisites:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/YouGMO/quiz-docker.git

   Switch to the Master Branch 

2. Update the environment variables:

    Open docker-compose.yml and update the environment variables for the backend service (if applicable) and the database service.
    Open .env file and update any necessary environment variables for your project.

3. Build and run the Docker containers:

- docker-compose up -d

4.  Access the application:

    Frontend: Open your web browser and visit http://localhost:3000.
    Backend: Make API requests to http://localhost:8080.

