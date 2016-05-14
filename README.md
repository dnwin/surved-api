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


