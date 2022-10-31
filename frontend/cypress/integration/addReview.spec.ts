describe('test add review', () => {
  // beforeEach(() => {
  //   cy.visit('http://localhost:3000/kommune/0301');
  // });
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3000/kommune/0301', (req) => {
      if (req.body.operationName === 'GET_REVIEWS') {
        req.reply({
          statusCode: 200,
          body: {
            kommune: [
              {
                kommuneRating: [
                  { name: 'navn', title: 'tittel', description: 'beskrivelse' },
                ],
              },
              // ...
            ],
          },
        });
      }
    });
  });

  it('add review', () => {
    cy.get('[data-cy="btn-add-review"').click();
    cy.get('[data-cy="add-review-name"').type('navn');
    cy.get('[data-cy="add-review-title"').type('tittel');
    cy.get('[data-cy="add-review-description"').type('beskrivelse');
    cy.get('[data-cy="add-review-rating"').click();

    cy.get('[data-cy="btn-add-review"');//.click();
  });



});