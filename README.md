## Charge-Data-Service

The Charge Data Service is an Application Programming Interface that provides data related to electric vehicle (EV) charging facilities. The API provides information about various aspects of charging facilities such as status, operator information, address information, connections etc.

### Implementation Details

#### Pulling of Open Map API Data and Update only there are changes

Since there is no dedicated API endpoint or websocket endpoint to subscribe to for updated, The implementation is achieved by implementing a task scheduler that pulls charge data every 10 seconds and checks the DateLastStatusUpdate. If the time is greater than the last time, the data is updated in the database. However, this process does not happen for the first time since the database is empty. This happens only for subsequent calls.

#### Listing the data via an endpoint

The implemented system exposes a GraphQL endpoint on `\graphql`, which allows clients to import data from the Open Charge Map API. The endpoint implements relay-style pagination for easy navigation through the data, with forward pagination implemented at this time and backward pagination coming soon

The Open Charge Map API provides various types of data including StatusType, OperatorInfo, and AddressInfo. However, these pieces of data do not have a dedicated resource in the API and are only available through the poi endpoint, which retrieves data for locations that offer EV charging facilities. Therefore, there is no GraphQL federation implemented for them yet. I am currently exploring ways to create a resource for these items in the database, but it may involve an expensive operation of looping through each data and creating the necessary documents. Hence, alternative solutions are also being considered.

### Project Structure

The Open Charge Map API provides various types of data including StatusType, OperatorInfo, and AddressInfo. However, these pieces of data do not have a dedicated resource in the API and are only available through the poi endpoint, which retrieves data for locations that offer EV charging facilities. Therefore, there is no GraphQL federation implemented for them yet. The team is currently exploring ways to create a resource for these items in the database, but it may involve an expensive operation of looping through each data and creating the necessary documents. Hence, alternative solutions are also being considered.

#### Architecture

The project adopts a monorepo approach, which comprises of two services located in the apps folder:

Task Service: This service manages the process of pulling data from Open Map API at scheduled intervals and saving it to the database.

GraphQL Service: This service is responsible for exposing the GraphQL endpoint, allowing users to query the open charge map details from the database.

In addition, the libs folder is used for implementing shared dependencies between the Task Service and GraphQL Service. Currently, the dal library is used as a Data Access Layer to handle all database-related logic.

Please refer to the architectural diagram below for a better understanding.

![Architecture](https://res.cloudinary.com/property-pro-lite/image/upload/v1683536785/architecture_aah6ai.png)

### Development

#### Docker

- Install [Docker](https://www.docker.com/) 😬
- Run `docker-compose up -d`
- Open browser and visit `http://localhost:4000/graphql` and rock it

#### Without Docker

- Replace database_url in .env with your corresponding database url and make sure you save it 👌
- Run `yarn install` to install project dependencies
- Run `yarn start:services` to run the services and you are good
- Open browser and visit `http://localhost:4000/graphql` and rock it

#### Test

There are two major tests. One unit tests testing the task service `tasl.service.spec.ts` that pulls data from Open MAP API and one integration test `graphql.spec.ts` that test the graphql endpoint. Run the command below for test

```
yarn test
```

### Production Packaging

The two main services Graphql Service and Task Service has their respective Dockerfiles that you can use to build their images. You can use this command below to build the images

```
docker build -t ${IMAGETAG} -f apps/${service-folder-name}/Dockerfile .
```

As a side note, please remember to manage your environment variables configurations with kubernetes. There is a .env file in the project roots that has all the environment variables needed, you just need to assign their respective values in your production environment

### Improvement Points

- Implementing of Kubernetes Health Checks endpoint for Kubernetes Liveness, Readness and Start Probe
- Implement Backward Pagination
- Configure jest to resolve path aliases for `apps` folder
- Save the location(latitude, longitude) from Open Map API
