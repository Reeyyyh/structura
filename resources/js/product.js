document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // SORT PRICE
    // =========================
    const sortPrice = document.getElementById('sort-price');
    const filterForm = document.getElementById('filter-form');

    if (sortPrice && filterForm) {
        sortPrice.addEventListener('change', function () {
            filterForm.submit();
        });
    }

    // =========================
    // CHECKBOX CATEGORY
    // =========================
    const sidebar = document.querySelector("#sidebar");

    if (sidebar && filterForm) {
        const checkboxes = sidebar.querySelectorAll("input[type=checkbox]");

        checkboxes.forEach((el) => {
            el.addEventListener("change", () => {
                filterForm.submit();
            });
        });
    }

    // =========================
    // PRICE INPUT ENTER
    // =========================
    const priceInputs = document.querySelectorAll(
        'input[name="price_from"], input[name="price_to"]'
    );

    priceInputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (filterForm) filterForm.submit();
            }
        });
    });

});
