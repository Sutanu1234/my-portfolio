document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".input-wrapper").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from refreshing the page

        // Collect form data
        const formData = {
            name: document.querySelector('input[name="name"]').value,
            email: document.querySelector('input[name="email"]').value,
            title: document.querySelector('input[name="subject"]').value || "No Subject",
            message: document.querySelector('textarea[name="message"]').value
        };

        // Initialize EmailJS
        emailjs.init("dqu6FzYthVM5OvzP9"); // Replace with your EmailJS Public Key

        // Send Email
        emailjs.send("service_lula7vl", "template_phrteqr", formData)
            .then(response => {
                alert("Message sent successfully!");
                document.querySelector(".input-wrapper").reset(); // Clear form after success
            })
            .catch(error => {
                console.error("Error sending email:", error);
                alert("Failed to send message. Please try again.");
            });
    });
});
