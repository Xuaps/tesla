describe('Load CNMC consumptions', () => {
  it('show a consumption graph', () => {
    cy.intercept('/prices/2.0TD/*', (req) => {
      const urlParts = req.url.split('/');
      const date = urlParts[urlParts.length - 1].replace('.json', '');
      const prices = [...(Array(24) as any).keys()].reduce(
        (acc, hour) => ({
          ...acc,
          [`${date}T${('0' + hour).slice(-2)}:00:00+00:00`]: 0.123,
        }),
        {},
      );

      req.reply(prices);
    });
    cy.visit('http://localhost:3000');
    cy.get('input[type="file"]').attachFile('consumptions.csv');

    cy.get('[data-cy="heatmap"]').contains('02/12/2021');
    // cy.get('#SvgjsRect1285').invoke('attr', 'val').should('eq', '1.692');
    cy.get('[data-cy="total-price"]').contains('26,48');
    cy.get('[data-cy="total-consumption"]').contains('215,3');
    cy.get('[data-cy="fixed-price"]').contains('9,83');
    !Cypress.env('CI') &&
      cy.get('[data-cy="consumption-segments"]').contains('36.0');
  });

  it('shows N/A for consumptiosn without prices', () => {
    cy.intercept('/prices/2.0TD/*', {
      statusCode: 404,
      body: 'Cypress forced 404',
    });
    cy.visit('http://localhost:3000');
    cy.get('input[type="file"]').attachFile('consumptions.csv');

    cy.get('[data-cy="heatmap"]').contains('02/12/2021');
    cy.get('[data-cy="total-price"]').contains('No disponible');
    cy.get('[data-cy="total-consumption"]').contains('215,3');
    cy.get('[data-cy="fixed-price"]').contains('9,83');
  });
});
