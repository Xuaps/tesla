describe('Load CNMC consumptions', () => {
    it('show a consumption graph', () => {
        cy.visit('http://localhost:3000');
        cy.get('input[type="file"]').attachFile('consumptions.csv');

        cy.get('.summary').contains('57,51');
    });
});
