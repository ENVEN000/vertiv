(function () {
  "use strict";

  // Vista previa abriendo archivos directamente: los enlaces a carpetas apuntan a index.html
  if (location.protocol === "file:") {
    document.querySelectorAll("a[href]").forEach(function (a) {
      var h = a.getAttribute("href");
      if (!h || /^(https?:|tel:|mailto:|#)/.test(h)) return;
      if (h === "./" || h === "") { a.setAttribute("href", "index.html"); return; }
      var parts = h.split("#");
      if (/\/$/.test(parts[0])) {
        a.setAttribute("href", parts[0] + "index.html" + (parts[1] ? "#" + parts[1] : ""));
      }
    });
  }

  // Menú móvil
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("menu-principal");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  // Formulario de contacto
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = form.querySelector(".form-status");
  form.addEventListener("submit", function (ev) {
    var mode = form.getAttribute("data-mode");
    if (form.querySelector('[name="_gotcha"]').value) { ev.preventDefault(); return; }
    if (mode === "whatsapp") {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var d = new FormData(form);
      var lines = [
        "Hola, soy " + d.get("nombre") + (d.get("empresa") ? " (" + d.get("empresa") + ")" : "") + ".",
        "Necesito: " + d.get("consulta") + ".",
        d.get("ciudad") ? "Ciudad: " + d.get("ciudad") + "." : "",
        "Mensaje: " + d.get("mensaje"),
        "Mi teléfono: " + d.get("telefono") + (d.get("email") ? " · Correo: " + d.get("email") : "")
      ].filter(Boolean);
      var url = "https://wa.me/" + form.getAttribute("data-wa") + "?text=" + encodeURIComponent(lines.join("\n"));
      status.textContent = "Abriendo WhatsApp con su consulta…";
      window.open(url, "_blank", "noopener");
      return;
    }
    // Formspree por fetch (con respaldo al envío normal si falla)
    ev.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    status.textContent = "Enviando…";
    fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (r) {
        if (r.ok) { form.reset(); status.textContent = "Gracias. Recibimos su consulta y le responderemos pronto."; }
        else { status.textContent = "No pudimos enviar el formulario. Escríbanos por WhatsApp o llámenos."; }
      })
      .catch(function () { status.textContent = "No pudimos enviar el formulario. Escríbanos por WhatsApp o llámenos."; });
  });
})();
