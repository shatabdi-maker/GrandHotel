function toggleMenu() {
    var navLinks = document.getElementById("navLinks");
    var menuToggle = document.getElementById("menuToggle");

    if (!navLinks || !menuToggle) return;

    var isOpen = navLinks.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
}

var links = document.querySelectorAll("#navLinks a");

links.forEach(function(link) {
    link.addEventListener("click", function() {
        var navLinks = document.getElementById("navLinks");
        var menuToggle = document.getElementById("menuToggle");

        if (!navLinks || !menuToggle) return;

        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});
