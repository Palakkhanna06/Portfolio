(function () {
    "use strict";

    var WEB3FORMS_URL = "https://api.web3forms.com/submit";

    function showFeedback(el, type, message) {
        if (!el) return;
        el.hidden = !message;
        el.textContent = message || "";
        el.className = "contact-form-status";
        if (type) el.classList.add("contact-form-status--" + type);
    }

    function initYear() {
        var y = document.getElementById("year");
        if (y) y.textContent = String(new Date().getFullYear());
    }

    function initForm() {
        var form = document.getElementById("portfolio-contact-form");
        if (!form) return;

        var feedback = document.getElementById("contact-form-status");
        var submitBtn = form.querySelector('[type="submit"]');
        var defaultBtnLabel = submitBtn ? submitBtn.textContent : "Send";

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var accessEl = form.querySelector('[name="access_key"]');
            var access_key = accessEl ? String(accessEl.value || "").trim() : "";

            var fd = new FormData(form);
            var name = String(fd.get("name") || "").trim();
            var email = String(fd.get("email") || "").trim();
            var message = String(fd.get("message") || "").trim();

            if (!access_key) {
                showFeedback(feedback, "error", "Missing Web3Forms access key.");
                return;
            }

            if (!email || !message) {
                showFeedback(feedback, "error", "Email and message are required.");
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending…";
            }
            showFeedback(feedback, "", "");

            fetch(WEB3FORMS_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: access_key,
                    subject: "Portfolio message from " + (name || email),
                    name: name || "(no name)",
                    email: email,
                    message: message,
                    from_name: name || email,
                }),
            })
                .then(function (res) {
                    return res.json().then(function (data) {
                        return { ok: res.ok, data: data };
                    });
                })
                .then(function (result) {
                    if (result.ok && result.data.success) {
                        showFeedback(feedback, "success", "Message sent. Thanks!");
                        form.reset();
                    } else {
                        throw new Error(result.data.message || "Send failed");
                    }
                })
                .catch(function () {
                    showFeedback(feedback, "error", "Could not send. Try again.");
                })
                .finally(function () {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = defaultBtnLabel;
                    }
                });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
            initYear();
            initForm();
        });
    } else {
        initYear();
        initForm();
    }
})();
