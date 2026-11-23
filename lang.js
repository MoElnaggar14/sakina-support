// Picks the page's language: ?lang=ar|en, else the browser's language (Arabic first), and keeps it on links.
(function () {
  var param = new URLSearchParams(location.search).get("lang");
  var lang = param === "ar" || param === "en" ? param
    : ((navigator.language || "").toLowerCase().indexOf("ar") === 0 ? "ar" : "en");
  var root = document.documentElement;
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";
  if (lang === "en") root.classList.add("en");
  document.title = root.getAttribute("data-title-" + lang) || document.title;
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("a[data-page]").forEach(function (a) {
      var target = a.classList.contains("lang") ? (lang === "ar" ? "en" : "ar") : lang;
      a.href = a.getAttribute("data-page") + "?lang=" + target;
    });
  });
})();
