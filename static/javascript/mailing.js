// retrieve the filled status from localStorage
const filled = localStorage.getItem('filled')

// check if the filled status is 'true' and show the success message
if (filled == 'true') {
  document.querySelector('.success-message').classList.remove('hide');
}

// set the filled status to 'false' to reset filled
localStorage.setItem('filled', 'false');

// check validation
const form = document.querySelector('.mailing-list-form');

const submitButton = form.querySelector('.primary-button');

const nameField  = form.querySelector('#name');
const emailField = form.querySelector('#email');
const phoneField = form.querySelector('#phone');
const zipField   = form.querySelector('#zip');

const nameError  = form.querySelector('#nameError');
const emailError = form.querySelector('#emailError');
const phoneError = form.querySelector('#phoneError');
const zipError   = form.querySelector('#zipError');


// validate form on submit
submitButton.addEventListener('click', function() {
  // set default content
  nameError.textContent  = '';
  emailError.textContent = '';
  phoneError.textContent = '';
  zipError.textContent   = '';

  // check validty for all fields
  if (!nameField.checkValidity()) {
    nameError.textContent = 'Please enter your name.';
  }

  if (!emailField.checkValidity()) {
    emailError.textContent = 'Please enter a valid email address';
  } 

  if (!phoneField.checkValidity()) {
    phoneError.textContent = 'Please enter a valid phone number.';
  }

  if (!zipField.checkValidity()) {
    zipError.textContent = 'Please enter a valid zip code.';
    
  }
  // send message if all fields are valid
  if (nameField.checkValidity() && emailField.checkValidity() && phoneField.checkValidity() && zipField.checkValidity()) {
    form.submit();
    // show success message
    document.querySelector('.success-message').classList.remove('hide');

    // allert user
    alert('Thank you for signing up!');

    //set filled status to true to ensure success message is shown after refresh
    localStorage.setItem('filled', 'true');
  } 

});
  

