describe('Load CNMC consumptions', () => {
  it('show a consumption graph', () => {
    cy.intercept('/prices/2.0TD/*', (req) => {
      const urlParts = req.url.split('/');
      const date = urlParts[urlParts.length - 1].replace('.json', '');
      const prices = [...(Array(24) as any).keys()].reduce(
        (acc, hour) => ({ ...acc, [`${date}T${('0' + hour).slice(-2)}:00:00+00:00`]: 0.123 }),
        {},
      );

      req.reply(prices);
    });
    cy.visit('http://localhost:3000');
    cy.get('input[type="file"]').attachFile('consumptions.csv');

    cy.get('[data-cy="heatmap"]').contains('02/12/2021');
    // cy.get('#SvgjsRect1285').invoke('attr', 'val').should('eq', '1.692');
  });
});
