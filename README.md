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
- `npm run test:e2e` to run Cypress tests

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

### MongoDB

TODO: implementasjon.
MongoDB is a document database.

### GraphQL

TODO: implementasjon.
We used GraphQL for the backend.

## 📚Data

The kommune logos and maps are scraped from wikipedia: https://no.wikipedia.org/wiki/Norges_kommuner

The numbers and statistics used in the application are gathered from Statistisk Sentralbyrå (SSB)

## Reflection and choices

### Average rating

The average rating is calculated by taking the sum of all ratings and dividing it by the number of ratings. This is done in the backend, and the average rating is stored in the database. This is done to avoid having to calculate the average rating for each kommune every time the user visits the details page. The average rating is also updated when a new review is created.

### Timestamp

We have chosen to store the date as a timestamp in the backend. This way it is easy to convert to other date formats and time zones later.

## 🧪Testing

### Jest

We have used the testing framework Jest to create unit tests, using its built-in functions. One of the tests that were performed is to check whether the app crashes on render, by testing the `App` component. In addition, we have tested user interaction for the search input field. The service function `getRatingDescription` has also been tested, which is used to display the correct description of selected amount of stars. Snapshot tests are useful when wanting to make sure that the UI does not change unexpectedly. The tests generate a json version of a component, to check if this matches an earlier representation. We created snapshot tests for the `KommuneCard` and `ReviewCard` components with use of the react-test-renderer, to ensure that they rendered as expected with data.

### Cypress

The Cypress tests are end-to-end tests.

The naming convention of Cypress IDs is to use kebab-case, rather than camel-case, which is used in other parts of the application. This is done to better distinguish between the two types of IDs.

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

<<<<<<< HEAD

- https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
- https://www.conventionalcommits.org/
- https://seesparkbox.com/foundry/semantic_commit_messages
- # http://karma-runner.github.io/1.0/dev/git-commit-msg.html stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

---

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name

Choose a self-explaining name for your project.

## Description

Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges

On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals

Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation

Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage

Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support

Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap

If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing

State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment

Show your appreciation to those who have contributed to the project.

## License

For open source projects, say how it is licensed.

## Project status

If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.

> > > > > > > main
