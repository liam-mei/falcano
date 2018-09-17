# Flight Logger

Flight logger aims to be an easy to use flight log for pilots, and those in training
to become one. Track your hours on specific planes, for certain licenses and your 
total hours flown, all in one convientent place.

## Built With

* [Django](https://www.djangoproject.com/) - Backend database management
* [React](https://reactjs.org/) - The web framework used
* [JWT](https://jwt.io/) - Used to securely transfer user tokens for authorization.

### Prerequisites

For this project install these dependencies by visting the links below.
[Django](https://docs.djangoproject.com/en/2.1/topics/install/),
[npm](https://www.npmjs.com/get-npm) 
or [yarn](https://yarnpkg.com/lang/en/docs/install),
and [pip/pipenv](https://pypi.org/project/pip/) 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
For the react side of the project, cd into the /frontend folder and type
```
yarn start
``` 
for the Django side, cd into /backend fold, and type
```
pipenv shell
pipenv install
python manage.py runserver
```



## Deployment

Deploying on the react side is relatively easy, typing
```
yarn build
```
while in the frontend folder will get you started, making it easy to deploy on a site like
[netlify](https://www.netlify.com/docs/manual-deploys/)(go here to learn more about drag and drop deployment)

It will be a bit more involved with the backend(Django). The link below will get you started.
[heroku](https://devcenter.heroku.com/articles/git)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

