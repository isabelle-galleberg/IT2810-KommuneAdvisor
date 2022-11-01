describe('test add review', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/kommune/0301');
  });

  it('add review', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.query.includes('addKommuneRating')) {
        expect(req.body.variables).to.have.property('name', 'test-navn');
        expect(req.body.variables).to.have.property('rating', 3);
        expect(req.body.variables).to.have.property('title', 'test-tittel');
        expect(req.body.variables).to.have.property('description', 'test-beskrivelse');
        expect(req.body.variables).to.have.property('kommuneId', '0301');
        req.reply({
          statusCode: 200,
          body: {
            data: {
              addKommuneRating: {
                _id: '636012274cfb6e36e93c226b',
                timestamp: '1667240487995',
                __typename: 'KommuneRating',
              },
            },
          },
        });
      }
    });
    // type new review
    cy.get('[data-cy="btn-open-add-review"').click();
    cy.get('[data-cy="add-review-rating"').click().click();
    cy.get('[data-cy="add-review-title"').type('test-tittel');
    cy.get('[data-cy="add-review-description"').type('test-beskrivelse');
    cy.get('[data-cy="add-review-name"').type('test-navn');

    // add new review
    cy.get('[data-cy="btn-add-review"').click();

    // check if the review list contains the new review
    cy.contains('div', /test-tittel/i).should('exist');
  });
});
