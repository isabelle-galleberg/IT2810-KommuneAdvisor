# KommuneAdvisor 
KommuneAdvisor is a web application that lets you find information about and rate the Norwegian municipalities, also known as kommuner. A user can search for a kommune on the main page. Kommuner can be filtered on county and sorted by area, population and ratings. From search results, the user can click on a kommune to view details.

## 💻Project setup

### Frontend

In the project directory, you can run:

- `npm start` to install dependencies and run the project in development mode
- `npm test` to install dependencies run the test runner interactively
- `npm run build` to build the app for production to the `build` folder
- `npx run lint` to run prettier and eslint checks

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend


## 🔎Search

Search result pagination.  Detail view of objects. Sorting and filtering. 

## 🌍Global state management
In this application we have implemented global state management using [Redux Toolkit](https://redux-toolkit.js.org) for the search field and dropdown menus. A user can then filter kommuner, click on a kommune to view the details page, then go back to the search results and see that the filters are persisted. 



## 💁‍♀️Web accessibility
Component library Mantine. The application scales after screen size and is therefore mobile responsive. 

## 💾Backend
MongoDB is a document database. 

### MongoDB

### GraphQL
We used GraphQL for the backend. 

## 🧪Testing

### Jest
We have used the testing framework Jest for some unit tests, using its built-in functions. One of the tests that were performed is to check whether the app crashes on render, by testing the `App` component. In addition, we have tested user interaction for the search input field. The service function `getRatingDescription` has also been tested, which is used to display the correct description of selected amount of stars. Snapshot tests are useful when wanting to make sure that the UI does not change unexpectedly. The tests generate a json version of a component, to check if this matches an earlier representation. We created snapshot tests for the `KommuneCard` and `ReviewCard` components with use of the react-test-renderer, to ensure that they rendered as expected with data.


### Cypress


## 🚀Git guidelines and code quality

We have used formatting tools Prettier and ESLint to ensure a common coding style and good code quality. 

All development tasks are documented in a issue with appropriate labels. After assigning yourself to an issue, the issue should be solved in its own branch. We have disabled pushing to main branch, such that the only way to add code is though merge requests. When merging with main branch, the commits should be squashed.


### Semantic Commit Messages

We have used a simple version of the [conventional commits guidelines](https://www.conventionalcommits.org/en/v1.0.0/).

Format: `<type>: <subject>`

#### Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

References:

- https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
- https://www.conventionalcommits.org/
- https://seesparkbox.com/foundry/semantic_commit_messages
- http://karma-runner.github.io/1.0/dev/git-commit-msg.html stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
