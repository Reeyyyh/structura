describe("Cart Feature - Structura", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("budi@gmail.com");
        cy.get('input[name="password"]').type("A123#abc");
        cy.get('button[type="submit"]').click();
        cy.url({ timeout: 10000 }).should("not.include", "/login");
    });

    it("TC-KRNJ-01 - Nilai 0 (Min-1)", () => {
        cy.visit("http://127.0.0.1:8000/product");
        cy.contains("Produk Cypress Test", {
            timeout: 10000,
        }).click();
        cy.url({
            timeout: 10000,
        }).should("include", "detail-product");
        cy.contains("Add To Cart", {
            timeout: 10000,
        }).click();
        cy.contains("Produk berhasil ditambahkan", {
            timeout: 10000,
        }).should("be.visible");
        cy.visit("http://127.0.0.1:8000/cart");
        cy.contains("Produk Cypress Test", {
            timeout: 10000,
        }).should("be.visible");
        cy.get('button[value="decrease"]').click();
        cy.contains("Tidak ada perubahan pada keranjang.", {
            timeout: 10000,
        }).should("be.visible");
    });

    it("TC-KRNJ-02 - Nilai 1 (Min)", () => {
        cy.visit("http://127.0.0.1:8000/cart");
        cy.contains("1").should("exist");
    });

    it("TC-KRNJ-03 - Nilai 2 (Min+1)", () => {
        cy.visit("http://127.0.0.1:8000/cart");
        cy.get('button[value="increase"]').click({ force: true });
        cy.contains("2").should("exist");
    });

    it("TC-KRNJ-04 - Nilai 5 (Nominal)", () => {
        cy.visit("http://127.0.0.1:8000/cart");
        for (let i = 0; i < 3; i++) {
            cy.get('button[value="increase"]').click({ force: true });
            cy.wait(500);
        }
        cy.contains("5").should("exist");
    });

    it("TC-KRNJ-05 - Nilai 9 (Max-1)", () => {
        cy.visit("http://127.0.0.1:8000/cart");
        for (let i = 0; i < 4; i++) {
            cy.get('button[value="increase"]').click({ force: true });
            cy.wait(500);
        }
        cy.contains("9").should("exist");
    });

    it("TC-KRNJ-06 - Nilai 10 (Max)", () => {
        cy.visit("http://127.0.0.1:8000/cart");
        cy.get('button[value="increase"]').click({ force: true });
        cy.contains("10").should("exist");
    });

    it("TC-KRNJ-07 - Nilai 11 (Max+1)", () => {
        cy.visit("http://127.0.0.1:8000/cart");

        cy.get('button[value="increase"]').click({ force: true });

        cy.wait(5000);

        cy.contains("Produk berhasil ditambahkan.").should("be.visible");

        // sengaja dibuat gagal
        cy.contains("Produk berhasil ditambahkan.").should("not.exist");
    });
});
