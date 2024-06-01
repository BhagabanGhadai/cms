
## ✨ How to use the code

> 👉 **Step 1** - Clone the project

```bash
$ mkdir backend
$ cd backend
$ git clone https://github.com/BhagabanGhadai/cms.git
```

<br />

> 👉 **Step 2** - Install dependencies via `npm`

```bash
$ npm i
```
$ add the values in .env.development file
```

<br />

> 👉 **Step 4** - Edit the `.env` using the template `.env.sample`. 

```env
NODE_ENV=development
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/cms
CSV_URL=
https://docs.google.com/spreadsheets/d/e/2PACX-1vSfwW_Gf7eO8WYmhb5ZKvtOMyWnQeXscKZNBrtVXZnTMOois4mflJfuhYkaOgbDMGEoJqR0pvyWhu29/pub?output=csv
<br />

> 👉 **Step 5** - Start the API server (development mode)

```bash
$ npm run dev

health check api
http://localhost:8080/cases/health-check
```


The API server will start using the `PORT` specified in `.env` file (default 8080).


## ✨ Codebase Structure

```bash
< ROOT / src >
     | 
     |-- config/                              
     |    |-- config.ts             # Configuration                    
     | 
     |-- controllers/
     |    |-- controllers.ts     # controllers 
     |
     |-- Repository/
     |    |-- repository.ts     # database logic 
     |
     |-- Services/
     |    |-- service.ts     # business logic 
     |
     |-- models/                                            
     |    |-- model.ts               # data base Model 
     | 
     |-- routes/                              
     |    |-- users.ts              # Define routes 
     | 
     |-- utils/                              
     |    |-- utils.ts              #  utility files 
     | 
     | 
     |-- index.ts                   # entry poingt 
     |-- app.ts                       # server 
     |                        
     |-- 
```

automated cron job scheduled to run daily at 10 AM and 5 PM to read the data from google doc through csv parser

## API
```bash
fetching all cases for a specific periods
$ http://localhost:8080/cases/aggregate?sd=2024-01-27&ed=2024-04-28

fetching the total number of cases by city, with the capability 
$ http://localhost:8080/cases/aggregate?stats=true