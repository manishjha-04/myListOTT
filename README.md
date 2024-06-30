---

# MyListOTT

## Description

This is the Backend Implementation of any Over-the-Top (OTT) app where we are implementing the My List feature.

### Performance Optimization

1. **Caching with Redis:** To minimize the load on the MongoDB database and reduce response times, the API caches frequently accessed data in Redis. This is especially useful for read-heavy endpoints.
2. **Efficient Indexing:** MongoDB collections are indexed on commonly queried fields to speed up read operations.
3. **Paginated Queries** Queries are paginated so that alot of entries don't become a heavy load upon fetches.


## Installation

1. Clone the repository:
   ```
   git clone https://github.com/manishjha-04/myListOTT.git
   ```
2. Navigate to the project directory:
   ```
   cd mylistott
   ```
3. Create a new file named `.env` in the root directory of the project.

4. Open the `.env` file in a text editor and add the following lines:

   ```
   MONGODB_URI=<your_mongodb_uri>
   PORT=<your_desired_port>
   ```

   Replace `<your_mongodb_uri>` with the URI of your MongoDB database. For example:

   ```
   MONGODB_URI=mongodb://localhost:27017/mylist
   ```

   Replace `<your_desired_port>` with the port number you want your server to listen on. For example:

   ```
   PORT=3000
   ```

5. Install dependencies:
   ```
   npm install
   ```

## Usage

For development, run:

```
npm run dev
```
To start the server, run:

```
npm start
```

To build the project, run:

```
npm run build
```

To run tests, execute:

```
npm test
```

To load the data, run:

```
npm run load
```



## Dependencies

- [dotenv](https://www.npmjs.com/package/dotenv): "^16.4.5"
- [express](https://www.npmjs.com/package/express): "^4.19.2"
- [mongodb](https://www.npmjs.com/package/mongodb): "^6.5.0"
- [mongoose](https://www.npmjs.com/package/mongoose): "^8.2.4"

## Dev Dependencies

- [@types/express](https://www.npmjs.com/package/@types/express): "^4.17.21"
- [@types/node](https://www.npmjs.com/package/@types/node): "^20.11.30"
- [ts-node](https://www.npmjs.com/package/ts-node): "^10.9.2"
- [typescript](https://www.npmjs.com/package/typescript): "^5.4.3"

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Author

- [Manish Jha](https://github.com/manishjha-04)
