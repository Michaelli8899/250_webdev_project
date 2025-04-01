// handle collapse items for FAQ and tours
// get all collapse items on the page
const collapseItems = document.querySelectorAll('.collapse-item');

// loops through each collapse item and adds an event listener to the question button
collapseItems.forEach(item => {
  const questionBtn = item.querySelector('.collapse-question');
  const icon = item.querySelector('.collapse-icon');
  const answer = item.querySelector('.collapse-answer');

  // click to toggle the answer
  questionBtn.addEventListener('click', () => {
    answer.classList.toggle('hide');
    icon.textContent = answer.classList.contains('hide') ? '+' : '-';
  });
});