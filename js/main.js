'use strict';

{
  /*
   * Button function - Use point
   */
  const pointBtn = document.querySelector('.point__btn');
  pointBtn.addEventListener('click', () => {
    let life = document.querySelectorAll('.point__life:not(.point__life--used)'),
        lastlife = life[life.length - 1],
        lastlifeIcon = lastlife.querySelector('.point__icon');
    lastlife.classList.add('point__life--used');
    lastlifeIcon.style.display = 'none';
  });
}