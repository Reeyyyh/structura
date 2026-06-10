// =========================
// PROFILE PANEL
// =========================
document.addEventListener("DOMContentLoaded", function () {
    const editBtn = document.getElementById("editProfileBtn");
    const panel = document.getElementById("editProfilePanel");
    const overlay = document.getElementById("overlay");
    const cancelEditBtn = document.getElementById("cancelEditBtn");

    editBtn?.addEventListener("click", () => {
        panel?.classList.remove("translate-x-full");
        overlay?.classList.remove("hidden");
    });

    overlay?.addEventListener("click", () => {
        panel?.classList.add("translate-x-full");
        overlay?.classList.add("hidden");
    });

    cancelEditBtn?.addEventListener("click", () => {
        panel?.classList.add("translate-x-full");
        overlay?.classList.add("hidden");
    });
});


// =========================
// MOBILE SIDEBAR
// =========================
document.addEventListener("DOMContentLoaded", function () {
    const burgerBtn = document.getElementById("burgerBtn");
    const mobileSidebar = document.getElementById("mobileSidebar");
    const closeSidebar = document.getElementById("closeSidebar");

    burgerBtn?.addEventListener("click", () => {
        mobileSidebar?.classList.remove("-translate-x-full");
    });

    closeSidebar?.addEventListener("click", () => {
        mobileSidebar?.classList.add("-translate-x-full");
    });
});


// =========================
// ADDRESS FORM TOGGLE
// =========================
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleAddressFormBtn");
    const formSection = document.getElementById("addressFormSection");

    toggleBtn?.addEventListener("click", function () {
        formSection?.classList.toggle("hidden");

        if (formSection && !formSection.classList.contains("hidden")) {
            formSection.scrollIntoView({
                behavior: "smooth",
            });
        }
    });
});


// =========================
// RADIO DEFAULT ADDRESS
// =========================
document.addEventListener("DOMContentLoaded", function () {
    const radios = document.querySelectorAll(
        "input[type=radio][name=default_address]"
    );

    radios.forEach((radio) => {
        radio.addEventListener("change", function () {
            radios.forEach((r) => (r.checked = false));
            this.checked = true;
            this.closest("form")?.submit();
        });
    });
});


// =========================
// EDIT ADDRESS PANEL
// =========================
document.addEventListener("DOMContentLoaded", () => {
    const editButtons = document.querySelectorAll(".editAddressBtn");
    const panel = document.getElementById("editAddressPanel");
    const overlay = document.getElementById("addressOverlay");
    const form = document.getElementById("editAddressForm");

    editButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const address = JSON.parse(button.dataset.address || "{}");

            if (!form) return;

            form.action = `/profile/address/${address.id}`;

            if (form.fullname) form.fullname.value = address.fullname ?? "";
            if (form.company) form.company.value = address.company ?? "";
            if (form.address1) form.address1.value = address.address1 ?? "";
            if (form.address2) form.address2.value = address.address2 ?? "";
            if (form.country) form.country.value = address.country ?? "";
            if (form.city) form.city.value = address.city ?? "";
            if (form.postal) form.postal.value = address.postal ?? "";
            if (form.phone) form.phone.value = address.phone ?? "";

            panel?.classList.remove("translate-x-full");
            overlay?.classList.remove("hidden");
        });
    });

    overlay?.addEventListener("click", () => {
        panel?.classList.add("translate-x-full");
        overlay?.classList.add("hidden");
    });
});


// =========================
// EDIT ADDRESS (MANUAL BUTTON)
// =========================
document.addEventListener("DOMContentLoaded", function () {
    const editBtn = document.getElementById("editAddressBtn");
    const panel = document.getElementById("editAddressPanel");
    const overlay = document.getElementById("addressOverlay");
    const cancelEditBtn = document.getElementById("cancelEditBtn");

    const closePanel = () => {
        panel?.classList.add("translate-x-full");
        overlay?.classList.add("hidden");
    };

    editBtn?.addEventListener("click", () => {
        panel?.classList.remove("translate-x-full");
        overlay?.classList.remove("hidden");
    });

    overlay?.addEventListener("click", closePanel);
    cancelEditBtn?.addEventListener("click", closePanel);
});


// =========================
// LOGOUT CONFIRM
// =========================
document.addEventListener("DOMContentLoaded", function () {
    const logoutForm = document.getElementById("logoutForm");

    logoutForm?.addEventListener("submit", function (e) {
        if (!confirm("Yakin ingin logout?")) {
            e.preventDefault();
        }
    });
});


// =========================
// PHONE FORMAT INPUT
// =========================
document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phoneInput");

    phoneInput?.addEventListener("input", function (e) {
        let raw = e.target.value.replace(/\D/g, "");

        if (!raw.startsWith("62")) {
            raw = "62" + raw;
        }

        raw = raw.slice(0, 13);

        let formatted = "+62";
        if (raw.length > 2) formatted += "-" + raw.slice(2, 6);
        if (raw.length > 6) formatted += "-" + raw.slice(6, 10);
        if (raw.length > 10) formatted += "-" + raw.slice(10);

        e.target.value = formatted;
    });
});
