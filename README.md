# Sylvera API Coding challenge

## Quick evaluation


Install `node` and `httpie` (or use `curl` and convert these instructions)

```sh
npm install
PORT=8080 npm run dev

# in another session ...
http GET :8080    # 200 OK

http GET :8080/customers    # 200 OK, list of all customers

http POST :8080/customers   # 400 Bad Request, error messages detailing missing fields

http POST :8080/customers email=test@email.com given_name=gavin family_name=lepidoptera  # 201 Created (id should not be null, needs fixing)
```

Swagger docs:

```sh
npm install
PORT=8080 npm run dev
open http://localhost:8080/api-docs/
```


## Missing Features

I only implemented Customer model are routes; nothig for orders, items etc.

As `id` is currently `null`, there is no way to update a record. You can modify existing customers though.

Test coverage is spotty; tests are a mess. Failing tests do not have descriptive errors.

Logging merges server logs with database logs in `stdout`, so it can be difficult to debug. Would be better sent to distinct files, or FIFO pipes and consumed by a logging aggregator.

Types are a bit weak. Using String to represent an UUID could be improved on. Introducing a specific type to represent shared Strings would be better.
ie in `interfaces.ts`,

```ts
export interface Customer {
  id: CustomerId;
  ...
}

export interface Order {
  id: OrderId;
  customer_id: CustomerId;
  ...
}
  ```


## Other features

I generated the skeleton of this project using `typescript-express-starter`, which adds a host of features for development and deployment.
