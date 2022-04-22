describe('Load CNMC consumptions', () => {
  it('show a consumption graph', () => {
    cy.intercept('/prices/2.0TD/*', (req) => {
      const urlParts = req.url.split('/');
      const date = urlParts[urlParts.length - 1].replace('.json', '');
      const prices = Array(24)
        .fill(0)
        .reduce(
          (acc, _, index) => ({
            ...acc,
            [`${date}T${('0' + index).slice(-2)}:00:00+00:00`]: 0.123,
          }),
          {},
        );

      req.reply(prices);
    });
    cy.visit('http://localhost:3000');
    cy.get('input[type="file"]').attachFile('consumptions.csv');

    // cy.get('#SvgjsRect1285').invoke('attr', 'val').should('eq', '1.692');
    cy.get('[data-cy="total-consumption"]').contains('215,3');
    cy.get('[data-cy="punta-summary"]').contains('50,57');
    cy.get('[data-cy="llano-summary"]').contains('42,9');
    cy.get('[data-cy="valle-summary"]').contains('121,84');
    cy.get('[data-cy="heatmap"]').contains('02/12/2021');
    cy.get('[data-cy="consumption-segments"]').contains('1.769');
  });
});
