describe('Product Feature - Structura', () => {

  it('TC-PROF-00 - Product template test', () => {

    // TODO: implement Product test cases

    cy.visit('http://localhost:8000/product')

    // Pastikan halaman profile terbuka
    cy.get('form').should('exist')

  })

})
