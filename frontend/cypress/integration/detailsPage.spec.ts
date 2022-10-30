// describe('test the details page', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000/kommune/0310');
//   });

//   before(() => {
//     let sendResponse;
//     const trigger = new Promise((resolve) => {
//       sendResponse = resolve;
//     });
//     cy.intercept('**/kommune/*', (request) => {
//       return trigger.then(() => {
//         request.reply();
//       });
//     });
//   });
//   // Check loading spinner
//   it('Should have a loading spinner', () => {
//     //interupt api call

//     cy.get('[data-cy="loading-spinner"]').should('be.visible');
//     sendResponse();
//     cy.get('[data-cy="loading-spinner"]').should('not.be.visible');
//   });
//   // Should contain all necessary information
//   it('Should contain all necessary information', () => {
//     cy.get('[data-cy="kommune-name"]').should('exist');
//     cy.get('[data-cy="kommune-county"]').should('exist');
//     cy.get('[data-cy="kommune-rating"]').should('exist');
//     cy.get('[data-cy="kommune-logo"]').should('exist');
//     cy.get('[data-cy="kommune-map"]').should('exist');
//     cy.get('[data-cy="kommune-population"]').should('exist');
//     cy.get('[data-cy="kommune-area"]').should('exist');
//     cy.get('[data-cy="kommune-written-language"]').should('exist');
//   });

//   // Check link to SNL has a href
//   // Check stars
//   // Check back to list arrow
// });
