function checkUserName(userName) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (usernameRegex.test(userName) && userName.length >= 1) {
    return true;
  }
  else{
        alert("Invalid username. A username can contain letters (both upper and lowercase) and digits only.");
        return false;
    }
}
function checkPassword(password) {
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
  if (passwordRegex.test(password) && hasLetter && hasDigit && password.length >= 4) {
    return true;
  }
  else{
    alert("Invalid password. A password must be at least 4 characters long (characters are to be letters and digits only), have at least one letter and at least one digit.");
    return false;
}
}

function validateForm(event) {

    event.preventDefault();
    const form = event.target;

    const username = form.querySelector('input[name="username"]').value;

    const password = form.querySelector('input[name="password"]').value;

    const isUsernameValid = checkUserName(username);
    const isPasswordValid = checkPassword(password);

    if (isUsernameValid && isPasswordValid) {
        alert("Form submitted successfully!");
        form.submit();
    }
}

document.getElementById("accountForm").addEventListener("submit", validateForm);