# Cucinapp
## Collections Microservice

A basic microservice to create, update and delete collections of recipes.

- Dockerized in order to be integrated into a full app in the future.
- API file included in order to specify supported operations.
- Implemented using C# and MySQL.
- Added required schemas and resolvers for API Gateway

Note: Given the requirementes to Dockerize a .NET Core applicaction, the commands to properly create and run the docker images are as follow:

```
docker-compose build --no-cache
docker-compose up --no-build
```