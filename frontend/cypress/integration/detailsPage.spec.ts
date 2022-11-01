describe('test the details page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/kommune/0301');
  });

  // Should contain all necessary information
  it('Should contain all necessary information', () => {
    cy.get('[data-cy="kommune-name"]').should('exist');
    cy.get('[data-cy="kommune-county"]').should('exist');
    cy.get('[data-cy="kommune-rating"]').should('exist');
    cy.get('[data-cy="kommune-logo"]').should('exist');
    cy.get('[data-cy="kommune-map"]').should('exist');
    cy.get('[data-cy="kommune-population"]').should('exist');
    cy.get('[data-cy="kommune-area"]').should('exist');
    cy.get('[data-cy="kommune-written-language"]').should('exist');
  });

  // Check link to SNL has a href
  it('Has anchor tags', () => {
    cy.contains('a');
  });

  // Check back to list arrow
  it('Has a back arrow', () => {
    cy.get('[data-cy="back-arrow"]').click();
    cy.url().then((url) => {
      cy.wrap(url).should('match', /.*\/localhost:3000\/$/i); //fix
    });
  });
});
