#  🇳🇴KommuneAdvisor 
KommuneAdvisor is a web application that lets you find information about and review the Norwegian municipalities, also known as kommuner. A user can search for a given kommune and filter kommuner on county. Kommuner can also be sorted by area, population and ratings, both ascending and descending. From the search results, the user can click on a kommune to view a details page with more information and ratings about this kommune. 


## 💻Project setup

### Frontend
In the project directory, you can run:
- `cd frontend` to navigate to the frontend directory
- `npm start` to install dependencies and run the project in development mode
- `npm test` to install dependencies run the test runner interactively
- `npm run build` to build the app for production to the `build` folder
- `npx run lint` to run prettier and eslint checks

TODO: kommandoer for å kjøre Cypress tester. 

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend
In the project directory, you can run:
- `cd backend` to navigate to the backend directory
- `npm install` to install dependencies
- `npm run dev` to run server using nodemon, automatically restarting server on file changes
- `npx run lint` to run prettier and eslint checks

The backend runs on [http://localhost:8000](http://localhost:8000).


## 🔎Search 
With the search field, the user can search for a kommune. Suggested kommuner based on the user inputs will be displayed on the main page. 
TODO: noe om hvordan dette fungerer. 

### Sorting and filtering
TODO: dette er implementert backend. (Hvorfor og hvordan?) Kobles opp mot verdier frontend. 

### Infinite scroll
TODO: infinite scroll implementasjon. 

### Detail view
From the search results, a user can click into the details page of a kommune. This does a new query to fetch information about the given kommune based on id. The id is also displayed in the url for the details page `/kommune/:id`. 


## 🌍Global state management
The main purpose of global state is to share a state among multiple components in order to avoid prop drilling. In this application we have implemented global state management using [Redux Toolkit](https://redux-toolkit.js.org) for the search field and dropdown menus. A user can search for and filter kommuner, click on a kommune to view the details page, then go back to the search results and see that the values for search field and filter values have persisted. 

We implemented the global states with Redux before fetching data from the backend, and therefore did not know that this could be done in the cache configuration with Apollo client. Although using Redux requires a bit more boilerplate code, it was quite simple to implement and works well with GraphQL. 


## 💅Web accessibility

[Web accessibility](https://monsido.com/web-accessibility) is the need for websites to utilize tools and technologies developed to aid the perception, understanding, contribution, navigation, and interaction of a person with disabilities on the site. We have used the component library [Mantine](https://mantine.dev) in order to achieve this. 

To make the page *perceivable*, 

all buttons have a cursor pointer. The data that is displayed on the details page is described with a label and emoji, which does not depend on language. 
 Alt text

  For images we have text alternatives, using the alt-attribute.


To make the website *understanding*, feedback is given on user interaction. When hovering a kommune card or review, a shadown is added. While fetching data a loading icon is displayed, and if the data cannot be retrieved, then an error message is displayed.


To ensure intuitive *navigation*, the user can view the kommune details page by clicking on the "Show more" button for the given kommune. In order to navigate back to the main page, the user can either click on the logo in the navbar or the back-button. 


The application scales dynamically after screen size, and is therefore mobile responsive for screens larger than 300px. 



## 💾Backend

### MongoDB
TODO: implementasjon. 
MongoDB is a document database. 

### GraphQL
TODO: implementasjon.
We used GraphQL for the backend. 

## 🧪Testing

### Jest
We have used the testing framework Jest to create unit tests, using its built-in functions. One of the tests that were performed is to check whether the app crashes on render, by testing the `App` component. In addition, we have tested user interaction for the search input field. The service function `getRatingDescription` has also been tested, which is used to display the correct description of selected amount of stars. Snapshot tests are useful when wanting to make sure that the UI does not change unexpectedly. The tests generate a json version of a component, to check if this matches an earlier representation. We created snapshot tests for the `KommuneCard` and `ReviewCard` components with use of the react-test-renderer, to ensure that they rendered as expected with data.


### Cypress
TODO


## 🚀Git guidelines and code quality

We have used the formatting tool Prettier and linter ESLint to ensure a common coding style and good code quality. 

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
