document.addEventListener("DOMContentLoaded", function () {

    const sortPrice = document.getElementById('sort-price');
    const filterForm = document.getElementById('filter-form');

    if (sortPrice && filterForm) {
        sortPrice.addEventListener('change', function () {
            filterForm.submit();
        });
    }

    const sidebar = document.querySelector("#sidebar");

    if (sidebar && filterForm) {
        sidebar.querySelectorAll("input[type=checkbox]").forEach((el) => {
            el.addEventListener("change", () => {
                filterForm.submit();
            });
        });
    }

    document.querySelectorAll('input[name="price_from"], input[name="price_to"]')
        .forEach(input => {
            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter' && filterForm) {
                    e.preventDefault();
                    filterForm.submit();
                }
            });
        });
});
