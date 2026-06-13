describe("Price BVA Testing - Structura", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:8000/login");
        cy.get('input[name="email"]').type("admin@gmail.com");
        cy.get('input[name="password"]').type("Admin#1234");
        cy.get('button[type="submit"]').click();
        cy.url({ timeout: 50000 }).should("include", "/structuradmin");
        cy.visit("http://127.0.0.1:8000/structuradmin/products/create");
        cy.wait(1500);
        cy.get("body").then(($body) => {
            if ($body.find(".fi-sidebar-close-overlay").length) {
                cy.get(".fi-sidebar-close-overlay").click({ force: true });
            }
        });
    });

    const fillProductForm = (price) => {
        cy.get("#data\\.product_name").type(`Produk Harga ${price}`, {
            force: true,
        });
        cy.get("#data\\.price").type(price.toString(), { force: true });
        cy.get("#data\\.stock").type("10", { force: true });

        cy.get("#data\\.status")
            .select("available", { force: true })
            .invoke("val")
            .then((val) => {
                cy.log("STATUS = " + val);
                console.log("STATUS =", val);
            });

        cy.get("#data\\.description").type("Testing Harga Produk", {
            force: true,
        });

        cy.get("#data\\.category_id")
            .select("5", { force: true })
            .invoke("val")
            .then((val) => {
                cy.log("CATEGORY = " + val);
                console.log("CATEGORY =", val);
            });
    };

    it("TC-HRG-01 - Harga 999 (Min-1)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(999);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("not.include", "/edit");
    });

    it("TC-HRG-02 - Harga 1000 (Min)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(1000);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("include", "/edit");
    });

    it("TC-HRG-03 - Harga 1001 (Min+1)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(1001);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("include", "/edit");
    });

    it("TC-HRG-04 - Harga 50000000 (Nominal)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(50000000);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("include", "/edit");
    });

    it("TC-HRG-05 - Harga 99999999 (Max-1)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(99999999);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("include", "/edit");
    });

    it("TC-HRG-06 - Harga 100000000 (Max)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(100000000);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("include", "/edit");
    });

    it("TC-HRG-07 - Harga 100000001 (Max+1)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(100000001);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("not.include", "/edit");
    });
});
