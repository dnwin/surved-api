SurvedAPI
=================
* API for Surved survey app.
* Built on a Javascript stack: Sequelize.js, Node.js, Express.js

###### Installation
* Clone the repository
* Install modules using `npm install`
* Start app with `npm start`

###### `.env` Configuration
* Configure the `.env` file in root to set environment variables.
Formatting is `Key=Value` followed by newline.

Key | Value | Description
--- | --- | ---
`JWT_SECRET` | Str | Secret string used for auth token creation, do not expose this value or upload it to your repo.
`PORT` | Int | Sets the port of the server (Optional)
`NODE_ENV` | Const Str | Server environment: `production`, `development`, `test` (Optional, defaults to `development`)

###### Setting up Mysql
* This app requires MySQL 5.7 with native `json` support.
Ubuntu 16 comes with it fully supported. 
For Ubuntu 14.04 instructions: https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-14-04

###### Tests
* You can run the tests by executing `npm test`.

---

## Authentication

###### Registration and Login `/auth/`
This route does not require an authentication token

`GET /auth/registration`
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


