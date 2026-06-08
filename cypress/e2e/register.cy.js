describe("REGISTER TESTING", () => {

    beforeEach(() => {
        cy.visit("/register");
        cy.intercept("POST", "/register").as("register");
    });

    it("TC-REG-01 - Register valid", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi@gmail.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.wait("@register");

        cy.url({ timeout: 15000 }).should("include", "/login");
    });

    it("TC-REG-02 - Nama kosong", () => {
        cy.get('input[name="email"]').type("budi@mail.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.get('input[name="name"]:invalid', { timeout: 10000 }).should("exist");
    });

    it("TC-REG-03 - Email format salah", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.get('input[name="email"]:invalid', { timeout: 10000 }).should("exist");
    });

    it("TC-REG-04 - Email sudah terdaftar", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi@gmail.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.wait("@register");

        cy.contains("The email has already been taken", { timeout: 15000 }).should("be.visible");
    });

    it("TC-REG-05 - Password kurang dari 8 karakter", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi2@mail.com");
        cy.get('input[name="password"]').type("Abc12");
        cy.get('input[name="password_confirmation"]').type("Abc12");

        cy.get('button[type="submit"]').click();

        cy.wait("@register");

        cy.contains("at least 8 characters", { timeout: 15000 }).should("be.visible");
    });

    it("TC-REG-06 - Password tanpa simbol", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi3@mail.com");
        cy.get('input[name="password"]').type("Abc12345");
        cy.get('input[name="password_confirmation"]').type("Abc12345");

        cy.get('button[type="submit"]').click();

        cy.wait("@register");

        cy.contains("Password harus", { timeout: 15000 }).should("be.visible");
    });

    it("TC-REG-07 - Konfirmasi password tidak sesuai", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi4@mail.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abcd");

        cy.get('button[type="submit"]').click();

        cy.wait("@register");

        cy.contains("confirmation does not match", { timeout: 15000 }).should("be.visible");
    });

});
