const loginHandler = async (event) => {
    event.preventDefault();

    // get the values from the form.
    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();
    
    if (email && password) {
        //post request
        const response = await fetch('api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: { 'content-Type': 'application/json'}
        });

        if (response.ok) {
            // For a successful login, redirect to messages page.
            document.location.replace('/')
        }
    }
};

const signUpHandler = async (event) => {
    event.preventDefault();
    console.log("Creating User......");

    const email = document.querySelector('#newEmail').value.trim();
    const user_name = document.querySelector('#newUserName').value.trim();
    const password = document.querySelector('#newPassword').value.trim();
    const password2 = document.querySelector('#newPassword2').value.trim();

    // add some functionality here to make sure that both passwords match.
    
    if (user_name && email && password) {
        const response = await fetch('/api/user/create', {
            method: 'POST',
            body: JSON.stringify({ user_name, email, password}),
            headers: { 'Content-Type': 'application/json'},
        });
        
        if (response.ok) {
            //redirect to all messages page.
            document.location.replace('/');
        } else {
            alert(response.statusText)
        }
    }
};


//Event listener on login button to run login function and redirect to messages.
document.querySelector('#login-btn').addEventListener('click', loginHandler);

//Event lestener on sign up button to run sign up, login, and redirect to messages.
document.querySelector('#sign-up-btn').addEventListener('click', signUpHandler);
