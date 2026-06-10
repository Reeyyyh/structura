describe("Profile Feature - Structura", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8000/login");

        cy.get('input[name="email"]').type("budi@gmail.com");

        cy.get('input[name="password"]').type("A123#abc");

        cy.get('button[type="submit"]').click();

        cy.url().should("not.include", "/login");

        cy.visit("http://localhost:8000/profile/address");

        cy.get("#toggleAddressFormBtn").click();

        cy.get("#addressFormSection").should("be.visible");
    });

    it("TC-PROF-01 - Pengisian data profil dengan data valid", () => {
        cy.get("#addressFormSection").within(() => {
            cy.get('input[name="fullname"]').clear().type("Budi Santoso");
            cy.get('input[name="address1"]')
                .clear()
                .type("Jl. Soekarno Hatta No. 10");
            cy.get('input[name="country"]').clear().type("Indonesia");
            cy.get('input[name="city"]').clear().type("Malang");
            cy.get('input[name="postal"]').clear().type("65141");
            cy.get('input[name="phone"]').clear().type("081234567890");

            cy.get('button[type="submit"]').click();
        });

        cy.contains(/berhasil|success/i).should("exist");
    });

    it("TC-PROF-02 - Pengisian data profil dengan nama penerima kosong", () => {
        cy.get("#addressFormSection").within(() => {
            cy.get('input[name="fullname"]').clear();

            cy.get('button[type="submit"]').click();
        });

        cy.contains(/nama|fullname|required|wajib/i).should("exist");
    });

    it("TC-PROF-03 - Pengisian data profil dengan alamat kosong", () => {
        cy.get("#addressFormSection").within(() => {
            cy.get('input[name="address1"]').clear();

            cy.get('button[type="submit"]').click();
        });

        cy.contains(/alamat|address|required|wajib/i).should("exist");
    });

    it("TC-PROF-04 - Pengisian data profil dengan negara kosong", () => {
        cy.get("#addressFormSection").within(() => {
            cy.get('input[name="country"]').clear();

            cy.get('button[type="submit"]').click();
        });

        cy.contains(/negara|country|required|wajib/i).should("exist");
    });

    it("TC-PROF-05 - Pengisian data profil dengan kota kosong", () => {
        cy.get("#addressFormSection").within(() => {
            cy.get('input[name="city"]').clear();

            cy.get('button[type="submit"]').click();
        });

        cy.contains(/kota|city|required|wajib/i).should("exist");
    });

    it("TC-PROF-06 - Pengisian data profil dengan kode pos non-angka", () => {
        cy.get("#addressFormSection").within(() => {
            cy.get('input[name="fullname"]').clear().type("Budi Santoso");
            cy.get('input[name="address1"]').clear().type("Jl. Soekarno Hatta");
            cy.get('input[name="country"]').clear().type("Indonesia");
            cy.get('input[name="city"]').clear().type("Malang");
            cy.get('input[name="postal"]').clear().type("ABC123");
            cy.get('input[name="phone"]').clear().type("081234567890");

            cy.get('button[type="submit"]').click();
        });

        cy.url().should("include", "/profile/address");
        cy.contains(/berhasil|success/i).should("not.exist");
    });

    it("TC-PROF-07 - Pengisian data profil dengan kode pos kosong", () => {
        cy.get("#addressFormSection").within(() => {
            cy.get('input[name="postal"]').clear();

            cy.get('button[type="submit"]').click();
        });

        cy.contains(/kode pos|postal|required|wajib/i).should("exist");
    });

    it("TC-PROF-08 - Pengisian data profil dengan nomor HP non-angka", () => {
        cy.get("#addressFormSection").within(() => {
            cy.get('input[name="fullname"]').clear().type("Budi Santoso");
            cy.get('input[name="address1"]').clear().type("Jl. Soekarno Hatta");
            cy.get('input[name="country"]').clear().type("Indonesia");
            cy.get('input[name="city"]').clear().type("Malang");
            cy.get('input[name="postal"]').clear().type("65141");
            cy.get('input[name="phone"]').clear().type("08ABCD123");

            cy.get('button[type="submit"]').click();
        });

        cy.contains(/berhasil|success/i).should("not.exist");
    });

    it("TC-PROF-09 - Pengisian data profil dengan nomor HP kosong", () => {
        cy.get("#addressFormSection").within(() => {
            cy.get('input[name="phone"]').clear();

            cy.get('button[type="submit"]').click();
        });

        cy.contains(/nomor|phone|required|wajib/i).should("exist");
    });
});
