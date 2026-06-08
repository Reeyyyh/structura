describe("LOGIN TESTING", () => {

    beforeEach(() => {
        cy.visit("/login");
    });

    it("TC-LOG-01 - Login valid", () => {

        cy.get('input[name="email"]', { timeout: 10000 })
            .should("be.visible")
            .type("budi@gmail.com");

        cy.get('input[name="password"]', { timeout: 10000 })
            .should("be.visible")
            .type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.url({ timeout: 15000 })
            .should("not.include", "/login");
    });

    it("TC-LOG-02 - Email tidak terdaftar", () => {

        cy.get('input[name="email"]')
            .type("tidakada@gmail.com");

        cy.get('input[name="password"]')
            .type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.contains("Email atau password salah", { timeout: 15000 })
            .should("be.visible");
    });

    it("TC-LOG-03 - Email kosong", () => {

        cy.get('input[name="password"]')
            .type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.get('input[name="email"]:invalid', { timeout: 10000 })
            .should("exist");
    });

    it("TC-LOG-04 - Password salah", () => {

        cy.get('input[name="email"]')
            .type("budi@gmail.com");

        cy.get('input[name="password"]')
            .type("Salah123");

        cy.get('button[type="submit"]').click();

        cy.contains("Email atau password salah", { timeout: 15000 })
            .should("be.visible");
    });

    it("TC-LOG-05 - Password kosong", () => {

        cy.get('input[name="email"]')
            .type("budi@gmail.com");

        cy.get('button[type="submit"]').click();

        cy.get('input[name="password"]:invalid', { timeout: 10000 })
            .should("exist");
    });

});
