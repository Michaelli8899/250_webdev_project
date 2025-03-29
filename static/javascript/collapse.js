const collapseItems = document.querySelectorAll('.collapse-item');

collapseItems.forEach(item => {
  const questionBtn = item.querySelector('.collapse-question');
  const icon = item.querySelector('.collapse-icon');
  const answer = item.querySelector('.collapse-answer');

  questionBtn.addEventListener('click', () => {
    answer.classList.toggle('hide');
    icon.textContent = answer.classList.contains('hide') ? '+' : '-';
  });
});