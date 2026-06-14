describe("Stock BVA Testing - Structura", () => {
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

    const fillProductForm = (stock) => {
        cy.get("#data\\.product_name").type(`Produk Stock ${stock}`, {
            force: true,
        });
        cy.get("#data\\.price").type("100000", {
            force: true,
        });
        cy.get("#data\\.stock").type(stock.toString(), {
            force: true,
        });

        cy.get("#data\\.status")
            .select("available", { force: true })
            .invoke("val")
            .then((val) => {
                cy.log("STATUS = " + val);
                console.log("STATUS =", val);
            });

        cy.get("#data\\.description").type("Testing Stock Produk", {
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

    it("TC-STK-01 - Stock 0 (Min-1)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(0);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("not.include", "/edit");
    });

    it("TC-STK-02 - Stock 1 (Min)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(1);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("include", "/edit");
    });

    it("TC-STK-03 - Stock 2 (Min+1)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(2);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("include", "/edit");
    });

    it("TC-STK-04 - Stock 5000 (Nominal)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(5000);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("include", "/edit");
    });

    it("TC-STK-05 - Stock 9998 (Max-1)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(9998);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("include", "/edit");
    });

    it("TC-STK-06 - Stock 9999 (Max)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(9999);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("include", "/edit");
    });

    it("TC-STK-07 - Stock 10000 (Max+1)", () => {
        cy.intercept("GET", "**/products/*/edit").as("editPage");
        fillProductForm(10000);
        cy.contains("button", "Create").click({ force: true });
        cy.wait("@editPage");
        cy.url().should("not.include", "/edit");
    });
});
