describe('Cart Feature - Structura', () => {

  it('TC-KRNJ-00 - Cart template test', () => {

    // TODO: implement cart test cases

    cy.visit('http://localhost:8000/cart')

    // Pastikan halaman profile terbuka
    cy.get('form').should('exist')

  })

})
