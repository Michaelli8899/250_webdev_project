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

submitButton.addEventListener('click', function() {
  nameError.textContent  = '';
  emailError.textContent = '';
  phoneError.textContent = '';
  zipError.textContent   = '';

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
});
  