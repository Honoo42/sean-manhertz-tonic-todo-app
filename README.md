# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## TODO App
This is a demonstation of creating a Todo application. The tech stack used is:
Frontend : React with TypeScript and materialUI Modules for CSS styling
Backend: Express.js
Database: MongoDB

## Running the Back end
1. Install dependencies by running `yarn`
2. navigate to the backend package (`cd backend`)
3. Run `npx tsc` to compile the package into the dist folder
4. Run `node backend/dist/index.js` from the root of the project
5. In a separate terminal hit `curl http://localhost:5000/api/todos` to receive a response and make sure the server is working

## Running the Front end
1. Install dependencies by running yarn
2. Navigate to the front-end package (`cd todo-app`)
3. Run yarn start. The package should build and automatically open up a new window at localhost:3000
4. While set up to hit a mongodb database, an implementation using local storage for the persistence layer can be swapped in. The instance can be found in the `utils` folder.

## Additional Notes
An env.example file has been added to the package. This is to facilitate MongoDB credentials.