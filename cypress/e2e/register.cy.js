describe("REGISTER TESTING", () => {
    beforeEach(() => {
        cy.visit("/register");
        cy.intercept("POST", "**/register").as("register");
    });

    it("TC-REG-01 - Registrasi valid", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi@gmail.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.wait("@register");

        cy.location("pathname", { timeout: 15000 }).should("eq", "/login");
    });

    it("TC-REG-02 - Nama kosong", () => {
        cy.get('input[name="email"]').type("budi@mail.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.get(".text-red-500", { timeout: 15000 }).should(
            "contain.text",
            "name",
        );
    });

    it("TC-REG-03 - Email salah", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.get(".text-red-500", { timeout: 15000 }).should(
            "contain.text",
            "email",
        );
    });

    it("TC-REG-04 - Email sudah terdaftar", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi@gmail.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.wait("@register");

        cy.contains("already been taken", { timeout: 15000 }).should(
            "be.visible",
        );
    });

    it("TC-REG-05 - Password kurang 8", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi2@mail.com");
        cy.get('input[name="password"]').type("Abc12");
        cy.get('input[name="password_confirmation"]').type("Abc12");

        cy.get('button[type="submit"]').click();

        cy.wait("@register");

        cy.contains("at least 8 characters", { timeout: 15000 }).should(
            "be.visible",
        );
    });

    it("TC-REG-06 - Password tanpa simbol", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi3@mail.com");
        cy.get('input[name="password"]').type("Abc12345");
        cy.get('input[name="password_confirmation"]').type("Abc12345");

        cy.get('button[type="submit"]').click();

        cy.contains(/symbol|harus/i, { timeout: 15000 }).should("be.visible");
    });

    it("TC-REG-07 - Password tidak sama", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi4@mail.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abcd");

        cy.get('button[type="submit"]').click();

        cy.contains(/match|tidak sesuai/i, { timeout: 15000 }).should(
            "be.visible",
        );
    });
});
