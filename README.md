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
* Install mysql `sudo apt-get install mysql-server`
* Create user/database and edit `config/config-db.json` with the correct credentials
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

###### About the API
* All API routes use the `JSON(application/json)` format.
* All routes except authentication are secured by a JSON Web token.

---

## Authentication `/auth/*`
This route does not require an authentication token.

###### Registration `GET /auth/register`
If the user does not already have an account, they may register a new account by using this endpoint. The response will contain a JSON Web Token as shown below.

Key | Type | Description | Constraints
--- | --- | --- | ---
email | Str | User email | not-null, unique
password | Str | User password, stored as a hash |
firstName | Str | User first name |
lastName | Str | User last name |
role | Str | User role |
Example Request Body:
```json
{
  "email" : "test@user.com",
  "firstName" :"test",
  "lastName" : "user",
  "password" : "testpassword",
  "role" : "user"
}
```

Example Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqb3NlY2FuQGhlbHAuY29tIiwiZmlyc3ROYW1lIjoiSm9zZSIsImxhc3ROYW1lIjoiU290byIsImV4cCI6MTQ3Njc2MjQzMywiaWF0IjoxNDc2MTU3NjMzfQ.tbxBpx37diBUqQ4pDnP4CH5mTa7-aLyT5CVKlkSxzR8"
}
```
###### Login `POST /auth/login`
If the user has an account already registered, they may log in using this endpoint. The response will contain a JSON Web Token as shown below.

Key | Type | Description | Constraints
--- | --- | --- | ---
email | Str | User email | not-null
password | Str | User password | not-null
Example Request Body:
```json
{
 "email" : "existing@email.com",
 "password" : "secret"
}
```

Example Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqb3NlY2FuQGhlbHAuY29tIiwiZmlyc3ROYW1lIjoiSm9zZSIsImxhc3ROYW1lIjoiU290byIsImV4cCI6MTQ3Njc2MjQzMywiaWF0IjoxNDc2MTU3NjMzfQ.tbxBpx37diBUqQ4pDnP4CH5mTa7-aLyT5CVKlkSxzR8"
}
```

---

## API

###### Authenticating API routes
All routes under `/api/v1` and `/admin/v1` will require JWT authentication.
You can get a token through the `/auth` route.
The token needs to be included in the header of every API call in the format:

Key | Value | Description
--- | --- | ---
`Authorization` | `Bearer yourtokengoeshere` | Authorization token request header

## Client API `/api/v1`
Route for usage in client application.

###### GET `/api/v1/surveys`
Returns all surveys available along with questions and answers.

###### POST `/api/v1/useranswers`
Post all answers to a survey.
Should be in the format:
`{
    Answers: [{
        id: 1
    }, {
        id: 2
    }]
}`
Client should post an array of id's belonging to single survey at a time.

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

#### Routes
- The following REST routes allow the following methods:
* `GET /api/route/`
* `GET /api/route/:id`
* `POST /api/route/`
* `PUT /api/route/:id`
* `DELETE /api/route/:id`

- Calling `DELETE` on record will set the `status` field to `inactive` in the database.
- Some routes will allow for posting of foreign keys (marked by Ref `TableName`). The format is: `TableName : { id: 1 } `

###### Surveys `/admin/v1/surveys/:id`
Field | Type | Description | Constraints
--- | --- | --- | ---
name | Str | Name of survey | Not-null
description | Str | Description of survey |

###### Questions `/admin/v1/questions/:id`
Field | Type | Description | Constraints
--- | --- | --- | ---
name | Str | The question string | Not-null
Survey | Ref `Survey` | id for associated survey |
QuestionType | Ref `QuestionType` | Associated QuestionType id |

Example:
`{
   "name" : "How do I use this api?",
   "Survey" : {
       "id" : 1
   },
   "QuestionType" : {
       "id" : 2
   }
}`


###### QuestionTypes `/admin/v1/questiontypes/:id`
Field | Type | Description | Constraints
--- | --- | --- | ---
name | Str | Name of QuestionType | Not-null

###### Answers `/admin/v1/answers/:id`
Field | Type | Description | Constraints
--- | --- | --- | ---
name | Str | The answer string | Not-null
Question | Ref `Question` | Associated question id |

###### UserAnswers `/admin/v1/useranswers/:id`
Field | Type | Description | Constraints
--- | --- | --- | ---
User | Ref `User` | Associated user id | Not-null
Answer | Ref `Answer` | Associated answer id |
