describe('test the home screen of KommuneAdvisor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('should display main page when opening for the first time', () => {
    cy.get('.logo').should('exist');
    cy.contains('.mantine-1m3pqry', 'Søk etter kommune');
    cy.contains('.mantine-1m3pqry', 'Filtrer på fylke');
  })

  it('test routning', () => {
    cy.contains('button', 'Vis mer').click();
    cy.get('.backArrow').click();
    cy.contains('button', 'Vis mer').click();
    cy.get('.logo').click();
    cy.contains('.mantine-1m3pqry', 'Søk etter kommune');
  })

})