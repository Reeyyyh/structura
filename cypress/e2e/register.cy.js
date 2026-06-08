describe("AUTH - REGISTER TESTING (Structura)", () => {
    beforeEach(() => {
        cy.visit("/register");
    });

    // TC-REG-01
    it("TC-REG-01 - Register valid", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi@mail.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.url().should("not.include", "/register");
    });

    // TC-REG-02
    it("TC-REG-02 - Nama kosong", () => {
        cy.get('input[name="name"]').clear();
        cy.get('input[name="email"]').type("budi@mail.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.contains("name").should("exist");
    });

    // TC-REG-03
    it("TC-REG-03 - Email format salah", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.contains("email").should("exist");
    });

    // TC-REG-04
    it("TC-REG-04 - Email sudah terdaftar", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi@gmail.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.contains("sudah terdaftar").should("exist");
    });

    // TC-REG-05
    it("TC-REG-05 - Password kurang dari 8 karakter", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi2@mail.com");
        cy.get('input[name="password"]').type("Abc123");
        cy.get('input[name="password_confirmation"]').type("Abc123");

        cy.get('button[type="submit"]').click();

        cy.contains("password").should("exist");
    });

    // TC-REG-06
    it("TC-REG-06 - Password tanpa simbol", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi3@mail.com");
        cy.get('input[name="password"]').type("Abc12345");
        cy.get('input[name="password_confirmation"]').type("Abc12345");

        cy.get('button[type="submit"]').click();

        cy.contains("password").should("exist");
    });

    // TC-REG-07
    it("TC-REG-07 - Konfirmasi password tidak sama", () => {
        cy.get('input[name="name"]').type("Budi123");
        cy.get('input[name="email"]').type("budi4@mail.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('input[name="password_confirmation"]').type("A123#abcd");

        cy.get('button[type="submit"]').click();

        cy.contains("match").should("exist");
    });
});
