[![Netlify Status](https://api.netlify.com/api/v1/badges/9ad97b06-08a9-4972-bdc3-e5c9e7624c6d/deploy-status)](https://app.netlify.com/sites/netlify-movie-react-catalogue-app/deploys)

# Movie Catalogue

Simple movie list viewer with features such as search, filters and pagination.
Made with create-react-app.

Deploys automatically to Netlify on push and merge.

See the result here: [https://netlify-movie-react-catalogue-app.netlify.com](https://netlify-movie-react-catalogue-app.netlify.com)

## Installing

Install modules:

```
yarn
```

Instant run:

```
yarn start
```

Just build a bundle:

```
yarn build
```

## nginx as a development web server

This project also supports faster startup with nginx but it suppports only Windows. This is not so convenient as using the `yarn start` though.

### Setup

1. Install nginx
2. Set path to nginx in files `quit_nginx.bat`, `start_nginx.bat` and `stop_nginx.bat` using variable `nginx_path`
3. Set full path to the `build` directory of the project in a `root` variable at the `location` settings in `movieReactAppLocal.conf`
4. Change the port number in a `listen` variable if needed

### Run nginx

Once you run nginx you can build project and open the `localhost:<your port number>` immediately without waiting for web server to run (of course `yarn start` is still a better option).

1. Run `start_nginx.bat`

### Build and open the project

1. Run `yarn build`
2. Open `localhost:8080` or with your own port you defined at step 3 at Setup
3. There is no watch mode (hopefully will be added) so after you made changes to code just run `yarn build` and refresh the page

### Stop nginx

To release the port nginx is using run `quit_nginx.bat` for smooth termination. If it didn't helps out then use `stop_nginx.bat`. In emergency case push the `kill_nginx.bat` command.

## Deployment

There is a github webhook that triggers every push. It launches the deployment process on [Netlify](https://www.netlify.com/).
Add additional notes about how to deploy this on a live system

## Built With

-   [Create React App](https://github.com/facebook/create-react-app) - Create React apps with no build configuration
-   [Bulma](https://bulma.io/) - free, open source CSS framework based on Flexbox

## Contributing

Pull requests are highly appreciated. If you want to look at stories, bugs and sprints just create an issue with a request to access the [trello board](https://trello.com/b/4HTJP4O2/movies-catalogue-app-on-reactjs) and I'll give you permissions (**you need a trello account for this action**).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details