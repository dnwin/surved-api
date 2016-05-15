SurvedAPI
=================
* API for Surved survey app.
* Built on a Javascript stack: Sequelize.js, Node.js, Express.js

###### Server requirements
* Linux (Ubuntu 14+)
* MySQL
* Node v6 & npm

###### Installation
* Clone the repository
* Install modules using `npm install`
* Start app with `npm start`

###### `.env` Configuration
* Configure the `.env` file in root to set environment variables.
Formatting is `Key=Value` followed by newline.

Key | Value | Description
--- | --- | ---
`JWT_SECRET` | Str | Secret string used for auth token creation (Required).
`PORT` | Int | Sets the port of the server (Optional)
`NODE_ENV` | Const Str | Server environment: `production`, `development`, `test` (Optional, default = `development`)

###### Tests
* You can run the tests by executing `npm test`.

---

## Authentication `/auth/*`
This route does not require an authentication token

###### Registration `GET /auth/register`
Allows the user to register for a new account. Will respond with a JWT token on success.

Key | Type | Description | Constraints
--- | --- | --- | ---
email | Str | User email | not-null, unique
password | Str | User password, stored as a hash |
firstName | Str | User first name |
lastName | Str | User last name |
Example:
`{
  "email" : "test@user.com",
  "firstName" :"test",
  "lastName" : "user",
  "password" : "testpassword"
}`

---

## API

###### Authenticating API routes
All routes under `/api/v1` and `/admin/v1` will require JWT authentication.
You can get a token through the `/auth` route.
The token needs to be included in the header of every API call in the format:

Key | Value | Description
--- | --- | ---
`Authorization` | `Bearer yourtokengoeshere` | Authorization token request header


## Admin API `/admin/v1/*`
Route designed for administration of all tables. The user token accessing it will need to be role `admin`.

###### Filtering the API
- You can match fields with values within a List All route by using:
```
GET /api/route/?filter[field]=value
```

- You can also filter for multiple fields:
```
?filter[name]=ac&filter[website]=goog&filter[companyId]=2
```

###### Pagination Limits and Offset
- You can limit how many records by using:
```
GET /api/route/?page[limit]=5
```

- You can offset records by using (offset=1 means you exclude the first record):
```
GET /api/route/?page[offset]=5
```

- You can combine the two to simulate pagination (show 10 pages at a time):
Page 1: `/api/route/?page[offset]=0&page[limit]=10`
Page 2: `/api/route/?page[offset]=10&page[limit]=10`


