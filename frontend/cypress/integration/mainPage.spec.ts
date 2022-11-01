beforeEach(() => {
  cy.visit('http://localhost:3000/');
});
describe('input fields', () => {
  it('should have a filter for county', () => {
    cy.get('[data-cy="inp-filter-county"]').should('be.visible');
  });
  it('should have a field for sorting', () => {
    cy.get('[data-cy="inp-sort"]').should('be.visible');
  });
  it('should have a field for search', () => {
    cy.get('[data-cy="inp-search-kommune"]').should('be.visible');
  });
});

describe('filter functionallity', () => {
  it('Should filter by county', () => {
    cy.get('[data-cy="inp-filter-county"]').type('Oslo{downArrow}{enter}');
    cy.get('[data-cy="kommune-card"]').each((kommune) => {
      cy.wrap(kommune)
        .find('[data-cy="kommune-county"]')
        .should('contain', 'Oslo');
    });
  });
  it('Should be able to search', () => {
    cy.get('[data-cy="inp-search-kommune"]').type('Gol');
    cy.get('[data-cy="kommune-card"]').should('have.length', 1);

    cy.get('[data-cy="inp-search-kommune"]').type('keeper');
    cy.get('[data-cy="kommune-card"]').should('not.exist');
  });
});

describe('kommune list', () => {
  it('Should display the list of the kommuner', () => {
    cy.get('[data-cy="kommune-list"]').should('exist');
    cy.get('[data-cy="kommune-card"]').should('exist');
  });
  it('Each list item should have the name, county, rating and the logo of the kommune', () => {
    cy.get('[data-cy="kommune-card"]').each((kommune) => {
      cy.wrap(kommune).find('[data-cy="kommune-name"]').should('exist');
      cy.wrap(kommune).find('[data-cy="kommune-county"]').should('exist');
      cy.wrap(kommune).find('[data-cy="kommune-rating"]').should('exist');
      cy.wrap(kommune).find('[data-cy="kommune-logo"]').should('exist');
    });
  });
  it('test link to kommune detials page', () => {
    cy.get('[data-cy="kommune-card"]')
      .first()
      .then((kommune) => {
        const kommuneName = kommune.find('[data-cy="kommune-name"]').text();
        cy.wrap(kommune).find('[data-cy="btn-show-details"]').click();
        cy.url().then((url) => {
          cy.wrap(url).should('match', /.*\/kommune\/[0-9]{4}$/i);
          cy.get('[data-cy="kommune-name"]').should('have.text', kommuneName);
        });
      });
  });
});
