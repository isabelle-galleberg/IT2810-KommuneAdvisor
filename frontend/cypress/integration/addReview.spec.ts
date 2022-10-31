describe('test add review', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/kommune/0301');
  });

  it('add review', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.query.includes('addKommuneRating')) {
        // Hei eva, her skal du expecte at alle feltene i requesten matcher en fasit.
        // Fasiten ser sånn ut:
        // let test = {
        //   variables: {
        //     name: 'asd',
        //     rating: 3,
        //     title: 'asd',
        //     description: 'asd',
        //     kommuneId: '5403',
        //   },
        //   query:
        //     'mutation ($name: String!, $rating: Int!, $title: String!, $description: String!, $kommuneId: ID!) {\n  addKommuneRating(\n    name: $name\n    rating: $rating\n    title: $title\n    description: $description\n    kommuneId: $kommuneId\n  ) {\n    _id\n    timestamp\n    __typename\n  }\n}',
        // };

        expect(req.body.variables).to.have.property('name', 'asd');
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
    cy.get('[data-cy="btn-open-add-review"').click();
    cy.get('[data-cy="add-review-rating"').click().click();
    cy.get('[data-cy="add-review-name"').type('navn');
    cy.get('[data-cy="add-review-title"').type('tittel');
    cy.get('[data-cy="add-review-description"').type('beskrivelse');

    cy.get('[data-cy="btn-add-review"').click();
  });
});
