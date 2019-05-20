# Contributing to Chess 95

Thanks for taking the time to contribute! 😄

## Getting Started

### You will need to have these installed first

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node 8+](https://nodejs.org/en/)
- [Docker 18+](https://docs.docker.com/install/)
- [Docker Compose 1.21+](https://docs.docker.com/compose/install/)

### Make a fork or clone the github repository:

```bash
git clone https://github.com/victorfeijo/chess95
```

### Install all project dependencies:

```bash
npm i
```

## Development

The project comes packaged with a docker-compose file preconfigured for hot-reloading.

```bash
npm run dev
```

Running the command above in the root directory starts Docker-ized instances of the client, API, and database.

## Configuration

The API and client configuration files share the same structure and can be found in their respective /src/config folders. In a development environment, values are referenced inside the docker-compose configuration files.

The authentication feature is not being used at this project, so if you want to learn more about it check the [full documentation](https://github.com/agencyenterprise/aeboilerplate/blob/master/docs/documentation.md#configuration).

# Testing

The Chess 95 comes with tests for both the API and client. We **highly encourage** you to maintain them during development.

You can find API tests in the `api/spec` folder and the client tests inside each React components folder.

**To run client-side tests,**

```shell
npm run client-test
```

**To run server-side tests,**

```shell
npm run api-test-watch
```

## Deployment

Chess 95 is currently being deployed to Heroku. Feel free to try any other cloud provider of your choice, AEboilerplate was built to be deployed anywhere.

### Setting up your Heroku application

Prerequisites:

- [Heroku cli](https://www.npmjs.com/package/heroku)
- [Heroku](https://www.heroku.com/) account
- This boilerplate relies on an authentication process to work properly. Make sure you have been through the [authentication configuration](#authentication).

1. In your project directory, run `heroku login` and enter your credentials.
2. Run `heroku create APP_NAME` to create your Heroku application. Copy your application URL for later steps.
3. Navigate to your application in the [heroku apps dashboard](https://dashboard.heroku.com/apps) and go to the Resources tab. Under Add-ons, add a [postgres](https://elements.heroku.com/addons/heroku-postgresql) database by searching for postgres in the search field. A `DATABASE_URL` [configuration variable](https://devcenter.heroku.com/articles/config-vars) is generated upon creation.
4. As described in the Configuration section, the current application is not using authentication but in order to work it needs to be configured. For each chosen provider a set of environment variables needs to be provided. By default Google, Facebook and Linkedin are the current providers, so for each of these providers a collection of variables should be set. Navigate to your application's Settings tab in your Heroku dashboard. Click on Reveal Vars and set the following values:
   - `GOOGLE_ID`, `FACEBOOK_ID` and `LINKEDIN_ID`: the clients ID's or random values
   - `GOOGLE_SECRET`, `FACEBOOK_SECRET` and `LINKEDIN_SECRET`: the clients secret's or random values
   - `GOOGLE_CALLBACK_URL`, `FACEBOOK_CALLBACK_URL` and `LINKEDIN_CALLBACK_URL`: Respectively `https://[YOUR_HEROKU_APPLICATION_URL].herokuapp.com/api/auth/google/callback`, `https://[YOUR_HEROKU_APPLICATION_URL].herokuapp.com/api/auth/facebook/callback` and `https://[YOUR_HEROKU_APPLICATION_URL].herokuapp.com/api/auth/linkedin/callback`
   - `SUCCESS_LOGIN_REDIRECT_URL`: `https://[YOUR_HEROKU_APPLICATION_URL].herokuapp.com/connect`

### Deploying to Heroku

Deploy your application to Heroku by running:

```shell
git push heroku master
```

## Pull Requests

So, you want to write some code? Great! To begin hacking, I encourage you to read [Git Style Guide](https://github.com/agis/git-style-guide) and [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/). If you want to do a big change to the code, don't isolate yourself and write all alone. Open a issue first so we can discuss more about it. Afterward, feel free to open a issue or a pull request at any time.
