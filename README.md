A simple, minimal application (frontend + backend + database) using Express
and PostgreSQL.

- For educational purposes. This repo is intended to be as minimal as possible
  so you can easily look at every single source file.
- It probably is not a good idea to use this in real life for anything that
  matters without significant changes (e.g. for security).
- Intended for hosting on Heroku, but probably easily adapated to other
  hosting providers.

## Run locally

Requirements:

- Postgres (PostgreSQL e.g. https://postgresapp.com/ for Mac), Node, NPM
- Optional: Heroku CLI

One-time setup:

1. Start local Postgres server and create a database called `example_project`
2. Set up the database tables (well, there's only one) with this command:
   `psql example_project < create-db.sql`

Run locally:

```
DATABASE_URL=postgresql://localhost:5432/example_project \
SSL=false \
node server.js
```

Alternatively, if you have the Heroku CLI installed, you can run `heroku
local`, which reads the `.env` file to provide environment variables.

## Run on Heroku

Requirements:

- Heroku CLI

1. Clone this repo and `cd` into it. The rest of these commands should be run
   from this directory.
2. Create an app: `heroku create`
    - You'll have to create a free Heroku account.
    - This application should not exceed usage limits for the free tier.
3. Provision a database as a Heroku add-on: `heroku addons:create
   heroku-postgresql:hobby-dev`
    - This uses the "hobby dev" (free) tier for this add-on.
4. Set up the database: `heroku pg:psql < create-db.sql`
5. Deploy the application: `git push heroku master`
