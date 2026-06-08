describe("LOGIN TESTING", () => {
    beforeEach(() => {
        cy.visit("/login");
    });

    // TC-LOG-01
    it("TC-LOG-01 - Login dengan data valid", () => {
        cy.get('input[name="email"]').type("budi@mail.com");
        cy.get('input[name="password"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.url().should("not.include", "/login");
    });

    // TC-LOG-02
    it("TC-LOG-02 - Email tidak terdaftar", () => {
        cy.get('input[name="email"]').type("tidakada@mail.com");
        cy.get('input[name="password"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.contains("akun tidak ditemukan").should("be.visible");
    });

    // TC-LOG-03
    it("TC-LOG-03 - Email kosong", () => {
        cy.get('input[name="email"]').clear();
        cy.get('input[name="password"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.contains("email wajib diisi").should("be.visible");
    });

    // TC-LOG-04
    it("TC-LOG-04 - Password salah", () => {
        cy.get('input[name="email"]').type("budi@mail.com");
        cy.get('input[name="password"]').type("SalahPassword123");

        cy.get('button[type="submit"]').click();

        cy.contains("password salah").should("be.visible");
    });

    // TC-LOG-05
    it("TC-LOG-05 - Password kosong", () => {
        cy.get('input[name="email"]').type("budi@mail.com");
        cy.get('input[name="password"]').clear();

        cy.get('button[type="submit"]').click();

        cy.contains("password wajib diisi").should("be.visible");
    });
});
