describe('Profile Feature - Structura', () => {

  it('TC-PROF-00 - Profile template test', () => {

    // TODO: implement profile test cases

    cy.visit('http://localhost:8000/profile')

    // Pastikan halaman profile terbuka
    cy.get('form').should('exist')

  })

})
