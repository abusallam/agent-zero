document.addEventListener('DOMContentLoaded', () => {
    console.log("Integration script loaded. Attaching event listeners...");

    const formCard = document.querySelector('.rounded-lg.border.bg-card');
    if (!formCard) {
        console.error("Could not find the main form card container.");
        return;
    }

    // Login form
    if (window.location.pathname.includes('login')) {
        const loginButton = formCard.querySelector('button.btn-primary');
        if (loginButton) {
            console.log("Login button found. Attaching click listener.");
            loginButton.addEventListener('click', async (event) => {
                event.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                const response = await fetch('/api_login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('jwt_token', data.token);

                    formCard.innerHTML = `
                        <div class="flex flex-col p-6 space-y-1">
                            <div class="font-semibold tracking-tight text-2xl text-center">Login Successful</div>
                            <div class="text-sm text-muted-foreground text-center">You can now access the Agent Zero application.</div>
                        </div>
                        <div class="p-6 pt-0 space-y-4">
                            <button id="goToAppButton" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full btn-primary">
                                Go to App
                            </button>
                        </div>
                    `;
                    const goToAppButton = document.getElementById('goToAppButton');
                    if(goToAppButton) {
                        goToAppButton.addEventListener('click', () => {
                            window.location.href = '/app';
                        });
                    }
                } else {
                    alert(`Login failed: ${data.message}`);
                }
            });
        } else {
            console.error("Login button not found within the form card.");
        }
    }

    // Signup form
    if (window.location.pathname.includes('signup')) {
        const signupButton = formCard.querySelector('button.btn-primary');
        if (signupButton) {
            console.log("Signup button found. Attaching click listener.");
            signupButton.addEventListener('click', async (event) => {
                event.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirmPassword').value;

                if (password !== confirmPassword) {
                    alert("Passwords do not match.");
                    return;
                }

                const response = await fetch('/api_register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Registration successful! Please log in.');
                    window.location.href = '/auth/login.html';
                } else {
                    alert(`Registration failed: ${data.message}`);
                }
            });
        } else {
            console.error("Signup button not found within the form card.");
        }
    }
});
