# 🇳🇴KommuneAdvisor

KommuneAdvisor is a web application that lets you find information about and review the Norwegian municipalities, also known as kommuner. A user can search for a given kommune and filter kommuner on county. Kommuner can also be sorted by area, population and ratings, both ascending and descending. From the search results, the user can click on a kommune to view a details page with more information and ratings about this kommune.

## 💻Project setup

### Frontend

In the project directory, you can run:

- `cd frontend` to navigate to the frontend directory
- `npm start` to install dependencies and run the project in development mode
- `npm test` to install dependencies run the test runner interactively
- `npm run build` to build the app for production to the `build` folder
- `npx run lint` to run prettier and eslint checks
- `npm run test:e2e` to run Cypress tests (headlessly)
- `npm run test:e2e-open` to run Cypress tests (with GUI)

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend

In the project directory, you can run:

- `cd backend` to navigate to the backend directory
- `npm install` to install dependencies
- `npm run dev` to run server using nodemon, automatically restarting server on file changes
- `npx run lint` to run prettier and eslint checks

The backend runs on [http://localhost:8000](http://localhost:8000).


## 🌍Global state management

The main purpose of global state is to share a state among multiple components in order to avoid prop drilling. In this application we have implemented global state management using [Redux Toolkit](https://redux-toolkit.js.org) for the search field, dropdown menus and current page. A user can search for and filter kommuner, click on a kommune to view the details page, then go back to the search results and see that the values for search field, filter and page have persisted.

We implemented the global states with Redux before fetching data from the backend, and therefore did not know that this could be done in the cache configuration with Apollo client. Although using Redux requires a bit more boilerplate code, it was quite simple to implement and works well with our GraphQL backend.


## 🔎Search

With the search field, the user can search for a kommune. Suggested kommuner based on the user inputs will be displayed on the main page.
When the user types, the input is sent to the backend which returns kommuner that match the input. The kommuner that match the input are then displayed, sorted after whatever sorting the user has applied (alphabetically if no sorting is applied). The search is also compatible with filtering on counties, which means that when the user filters on a county and enters a search term, the kommuner that match the search term and are in the selected county will be displayed.

### Sorting and filtering

The user has the option sort kommuner by area, population and ratings, both ascending and descending. The user can also filter kommuner on county. If no sorting is applied, kommuner will be sorted alphabetically. The three last letters of the Norwegian alphabet are not sorted as most Norwegians are used to, as Å comes before Ø. This is because these letters are not used in the English alpahbet, and therefore not sorted correctly by default.

### Pagination

The kommune cards are paginated, displaying 24 kommuner at a time. We chose this number since it is divisible by both 4, 3 and 2, making it compatible with the grid. The query for fetching kommuner is paginated, such that one can specify the number of elements per page and get the current page. This is implemented frontend by storing the current page in a global state, and setting the current page to 1 when the user updates the input fields.

### Detail view

From the search results, a user can click into the details page of a kommune. This does a new query to fetch information about the given kommune based on id. The id is also displayed in the url for the details page `/kommune/:id`.


## 💅Web accessibility

[Web accessibility](https://monsido.com/web-accessibility) is the need for websites to utilize tools and technologies developed to aid the perception, understanding, contribution, navigation, and interaction of a person with disabilities on the site. We have used the component library [Mantine](https://mantine.dev) in order to achieve this.

To make our website _perceivable_, the information about a kommune is displayed on the details page with a readable font and described with a label and emoji. All input fields are described with a label as well. When hovering a button, the cursor is changed to pointer, indicating that the user can click. All images have textual alternatives, implemented with the alt-attribute.

To make the website _understanding_, feedback is given on user interaction. When hovering a kommune card or review, a shadown is added. While fetching data a loading icon is displayed, and if the data cannot be retrieved an error message is displayed. When creating a new review, the star rating displays a textual description according to the number of selected stars.

To ensure intuitive _navigation_, the user can view the kommune details page by clicking on the "Show more" button for the given kommune. In order to navigate back to the main page, the user can either click on the logo in the navbar or the back-button.

The website scales dynamically after screen size, and is therefore mobile responsive for screens larger than 300px.


## 💾Backend

The backend is buildt with Node Express.

### MongoDB

MongoDB is a document database. To implemenet mongoDB on the Express backend we have used [mongoose](https://mongoosejs.com/).
The database consists of three collections:
- county
- kommune
- kommuneRating

### GraphQL

To query data from the backend we have buildt a GraphQL interface. Here are the GraphQL endpoints:

#### kommuner

Endpoint to query all kommunes

**Parameters**

_sortBy_ - What to sort by (ex: name / population)

_sortDirection_ - Which way to sort the reults (ex: ascending / descending)

_search_ - Search for kommues (ex: Molde / Trondheim)

_county_ - Filter by county (ex: Møre og Romsdal / Viken)

**Fields**

_\_id_ - Unique identifier, this is set as the national kommune number

_name_ - Name of the kommune

_population_ - The kommunes Population

_areaInSquareKm_ - Size of the kommune in Km2.

_landAreaInSquareKm_ - Size of the kommune in squareKm, excluding water.

_populationByArea_ - Average population pr squareKm

_mapUrl_ - Link to the map image

_snlLink_ - Link to the SNL page

_logoUrl_ - Link to the logo image

_writtenLanguage_ - What written language the kommune uses

_averageRating_ - The average of all kommuneRatings for the kommune

_county_ - The county the kommune belongs to

_kommuneRating_ - All the KommuneRatings for that kommune

#### kommunerCount

Endpoint to query count of all kommuner

**Parameters**

_search_ - Search for kommues (ex: Molde / Trondheim)

_county_ - Filter by county (ex: Møre og Romsdal / Viken)

**Fields**

_kommunerCount_ - Count of how many kommuner matched the filter.

#### county

Endpoint to query all countys

**Parameters**

No parameters

**Fields**

_\_id_ - Unique identifyer, this is set as the national county number

_name_ - Name of the county


## 📚Kommuner data

The kommune weapons and map images are scraped from [Wikipedia](https://no.wikipedia.org/wiki/Norges_kommuner). The numbers and statistics used in the application are gathered from [Statistisk Sentralbyrå (SSB)](https://www.ssb.no/kommunefakta). 

### Average rating

The average rating is calculated by taking the sum of all ratings and dividing it by the number of ratings. This is done in the backend, and the average rating is stored in the database. This is done to avoid having to calculate the average rating for each kommune every time the user visits the details page. The average rating is also updated when a new review is created.

### Timestamp

We have chosen to store the date as a timestamp in the backend. This way it is easy to convert to other date formats and time zones later.


## 🧪Testing

### Jest

We have used the testing framework Jest to create unit tests, using its built-in functions. One of the tests that were performed is to check whether the app crashes on render, by testing the `App` component. In addition, we have tested user interaction for the search input field. The service function `getRatingDescription` has also been tested, which is used to display the correct description of selected amount of stars. Snapshot tests are useful when wanting to make sure that the UI does not change unexpectedly. The tests generate a json version of a component, to check if this matches an earlier representation. We created snapshot tests for the `KommuneCard` and `ReviewCard` components with use of the react-test-renderer, to ensure that they rendered as expected with data.

### Cypress
Cypress is used for end-to-end testing. The naming convention of Cypress IDs is to use kebab-case, rather than camel-case, which is used in other parts of the application. This is done to better distinguish between the two types of IDs. We have created tests for the main page, details page and when adding a review. 


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
