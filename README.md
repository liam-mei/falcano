# Flight Logger

Flight logger aims to be an easy to use flight log for pilots and those in training
to become one. Upload planes and then document your flights on each plane with the specific flight information such as hours flown in daylight and nighttime.  Total hours flown are also aggregated and separated into their specific fields and also by license type.

## Main Tech Stack

* [Django](https://www.djangoproject.com/) - Backend database management
* [React](https://reactjs.org/) - The web framework used
* [JWT](https://jwt.io/) - Used to securely transfer user tokens for authorization.
* [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client
* [Stripe](https://stripe.com/) - Online payments company

## Other Tech Stack

* [react-dropzone](https://react-dropzone.netlify.com/) - drag-and-drop for files
* [Parser](https://www.npmjs.com/package/html-react-parser) - HTML to React parser
* [Helmet](https://www.npmjs.com/package/react-helmet) - manages changes to document head
* [react-modal](https://github.com/reactjs/react-modal)
* [react-dom](https://reactjs.org/)

## CSS

* [@material-ui/core](http://material-ui.com/)
* [bootstrap](https://getbootstrap.com/)
* [CSS Grid]()
* [LESS](http://lesscss.org/)

### Prerequisites

For this project install these dependencies by visting the links below.
[Django](https://docs.djangoproject.com/en/2.1/topics/install/),
[npm](https://www.npmjs.com/get-npm) 
or [yarn](https://yarnpkg.com/lang/en/docs/install),
and [pip/pipenv](https://pypi.org/project/pip/) 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


1. For the frontend/react side of the project
   - open a terminal 
   - cd into the /frontend folder and type
```
yarn install
yarn start
``` 
2. for the backend/Django side
   - open a new terminal
   - cd into /backend fold, and type
```
pipenv shell
pipenv install
python manage.py runserver
```
3. Further setup:
   - go to `http://localhost:8000/admin`
   - create a new group `default`
   - add create and delete permission for that group

4. Where to get SkyVector HTML snippits
   - go `skyvector.com`
   - upper left click `Flight Plan`
        - enter Departure and Destination airport codes
            - upper right click `Link`
            - select lower link `Image Link with Chart Snippet`


## Deployed on
* Heroku for backend - https://flightloggercs10.herokuapp.com
* Netlify for frontend - https://stoic-meitner-50ac30.netlify.com/

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

