## Project Structure

├── supabase
│   ├── functions
│   │      ├── createUser
│   │      │     ├── index.ts
└── test --- utils for testcase
├── .env --- environment file

## Installation

You must have docker running in your pc

```bash
$ npm install
```

```bash
$ npm install
```

## Running the app

```bash

# start the App
$ npm run start
```

```bash

# start the App
$ npm run serve
```

```bash

#test the api
$ locally we can create user with http://localhost:54321/functions/v1/createUser and remote https://naeiqwtydbstpdqoagsd.supabase.co/functions/v1/createUser body like 
 {
	"username": "John", 
 	"email": "john@doe.com", 
 	"age": 30
}
```