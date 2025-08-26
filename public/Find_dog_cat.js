function validateForm(event) {

    event.preventDefault();
    const form = event.target;

    const animalSelected = form.querySelector('input[name="Animal"]:checked');

    const breedSelected = form.querySelector('input[name="Breed"]:checked');

    const ageSelected = form.querySelector('select[name="Age"]').value;

    const genderSelected = form.querySelector('input[name="gender"]:checked');

    if (!animalSelected || !breedSelected || !ageSelected || !genderSelected) {
        alert("Please make sure all fields are filled out.");
    } else {
        alert("Form submitted successfully!");
        form.submit();
    }
}

document.getElementById("findPetForm").addEventListener("submit", validateForm);