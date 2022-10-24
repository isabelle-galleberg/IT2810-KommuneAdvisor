describe('test the home screen of KommuneAdvisor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('should display main page when opening for the first time', () => {
    cy.get('.logo').should('exist');
    cy.get('.mantine-i0taq').should('exist');
    cy.contains('.mantine-1m3pqry', 'Søk etter kommune')
  })
})