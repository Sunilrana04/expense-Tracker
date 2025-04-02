// // Handle Registration
// const registerForm = document.getElementById("registerForm");
// if (registerForm) {
//     registerForm.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const formData = new FormData(registerForm);
//         const data = Object.fromEntries(formData);

//         const response = await fetch("/api/auth/register", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//         });

//         const result = await response.json();
//         alert(result.message || result.error);
//         if (response.ok) window.location.href = "login.html";
//     });
// }

// // Handle Login
// const loginForm = document.getElementById("loginForm");
// if (loginForm) {
//     loginForm.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const formData = new FormData(loginForm);
//         const data = Object.fromEntries(formData);

//         const response = await fetch("/api/auth/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//         });

//         const result = await response.json();
//         alert(result.message || result.error);
//         if (response.ok) window.location.href = "dashboard.html";
//     });
// }


///  new hai ye 

const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message || result.error);
        if (response.ok) window.location.href = "login.html"; // Redirect to login page on success
    });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message || result.error);
        if (response.ok) window.location.href = "main.html"; // Redirect to dashboard on success
    });
}
