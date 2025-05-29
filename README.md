Refrigerator Application

Application for dealing with products in the refrigerator using Java/Spring Boot/Angular/PostgreSql(H2DB). 
Application:

• Provide CRUD functionality for products

Main requirements are:

• Application must be single page app communicating via API to backend service

• User should be able to:
- Create, Update and Delete product
- See the list of existing products in the refrigerator

• Form for editing product should contain three fields:
- Name - String - input field
- TimeStored - DateTime - input field
- BestBeforeDate – Date - input field

Database used is PostgreSql and I downloaded PostgreSql image from Docker Hub and is running using Docker. 
For the convenience I also enabled using H2 in-memory database by removing configuration from application.properties file.

On the frontend, the user interacts with Angular application that provides the user interface and handles the user interactions. 
The Angular frontend communicates with the Spring backend via APIs. 
Spring Boot handles the data processing, business logic, and database interactions. 
The Spring application then interfaces with the database, such as PostgreSQL to store and retrieve data. 
This separation of concerns, Angular handling UI and Spring Boot managing the business logic and data makes this architecture modular and scalable, 
perfect for building robust, full‑stack applications.