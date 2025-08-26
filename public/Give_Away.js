function validateForm(event) {

    event.preventDefault();
    const form = event.target;

    const animalSelected = form.querySelector('input[name="Animal"]:checked');

    const breedSelected = form.querySelector('input[name="Breed"]:checked');

    const ageSelected = form.querySelector('select[name="Age"]').value;

    const genderSelected = form.querySelector('input[name="gender"]:checked');

    const ownerName = form.querySelector('input[name="name_of_owner"]').value;

    const email = form.querySelector('input[name="email"]').value;

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }

    if (!animalSelected || !breedSelected || !ageSelected || !genderSelected || !ownerName  || validateEmail(email) == false) {
        alert("Please make sure all fields are filled out correctly.");
    } else {
        alert("Form submitted successfully!");
        form.submit();
    }
}

document.getElementById("givePetForm").addEventListener("submit", validateForm);