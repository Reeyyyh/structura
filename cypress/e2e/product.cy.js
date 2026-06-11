describe("Product Feature - Structura", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("admin@gmail.com");
        cy.get('input[name="password"]').type("Admin#1234");
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/structuradmin");
        cy.visit("http://127.0.0.1:8000/structuradmin/products/create");
        cy.wait(1500);
        cy.get("body").then(($body) => {
            if ($body.find(".fi-sidebar-close-overlay").length) {
                cy.get(".fi-sidebar-close-overlay").click({ force: true });
            }
        });
    });

    it("TC-PROD-01 - Input produk dengan data valid", () => {
        const productName = "Produk Cypress Test";
        cy.get("#data\\.product_name")
            .type(productName, { force: true })
            .should("have.value", productName);
        cy.get("#data\\.price")
            .type("100000", { force: true })
            .should("have.value", "100000");
        cy.get("#data\\.stock")
            .type("10", { force: true })
            .should("have.value", "10");
        cy.get("#data\\.status")
            .select("available", { force: true })
            .blur()
            .should("have.value", "available");
        cy.get("#data\\.description")
            .type("Deskripsi Produk Cypress", { force: true })
            .blur()
            .should("have.value", "Deskripsi Produk Cypress");
        cy.get("#data\\.category_id")
            .select("5", { force: true })
            .blur()
            .should("have.value", "5");
        cy.get("#data\\.status")
            .invoke("val")
            .then((v) => cy.log("STATUS = " + v));
        cy.get("#data\\.category_id")
            .invoke("val")
            .then((v) => cy.log("CATEGORY = " + v));
        cy.get("#data\\.description")
            .invoke("val")
            .then((v) => cy.log("DESCRIPTION = " + v));
        cy.contains("button", "Create").click({ force: true });
        cy.wait(5000);
        cy.url().then((url) => {
            cy.log("URL AFTER SUBMIT = " + url);
        });
        cy.get("body").then(($body) => {
            cy.log($body.text().substring(0, 1000));
        });
    });

    it("TC-PROD-02 - Input produk dengan nama produk kosong", () => {
        cy.get("#data\\.price").type("100000", { force: true });
        cy.get("#data\\.stock").type("10", { force: true });
        cy.get("#data\\.status").select("available", { force: true });
        cy.get("#data\\.description").type("Deskripsi produk", { force: true });
        cy.get("#data\\.category_id").select("5", { force: true });
        cy.contains("button", "Create").click({ force: true });
        cy.get("#data\\.product_name").then(($el) => {
            expect($el[0].checkValidity()).to.equal(false);
        });
    });

    it("TC-PROD-03 - Input produk dengan harga non-numerik", () => {
        cy.get("#data\\.price").type("ABC", { force: true });
        cy.get("#data\\.price").should("have.value", "");
    });

    it("TC-PROD-04 - Input produk dengan harga kosong", () => {
        cy.get("#data\\.product_name").type("Produk Test", { force: true });
        cy.contains("button", "Create").click({ force: true });
        cy.get("#data\\.price").then(($el) => {
            expect($el[0].checkValidity()).to.equal(false);
        });
    });

    it("TC-PROD-05 - Input produk dengan stok non-numerik", () => {
        cy.get("#data\\.stock").type("ABC", { force: true });
        cy.get("#data\\.stock").should("have.value", "");
    });

    it("TC-PROD-06 - Input produk dengan stok kosong", () => {
        cy.get("#data\\.product_name").type("Produk Test", { force: true });
        cy.contains("button", "Create").click({ force: true });
        cy.get("#data\\.stock").then(($el) => {
            expect($el[0].checkValidity()).to.equal(false);
        });
    });

    it("TC-PROD-07 - Input produk dengan kategori tidak dipilih", () => {
        cy.get("#data\\.product_name").type("Produk Test", { force: true });
        cy.get("#data\\.price").type("100000", { force: true });
        cy.get("#data\\.stock").type("10", { force: true });
        cy.get("#data\\.status").select("available", { force: true });
        cy.get("#data\\.description").type("Deskripsi produk", { force: true });
        cy.contains("button", "Create").click({ force: true });
        cy.get("#data\\.category_id").then(($el) => {
            expect($el[0].checkValidity()).to.equal(false);
        });
    });
});
