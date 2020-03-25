'use strict';

{
  /* ------------------------------ */
  /* Functions                      */
  /* ------------------------------ */
  // -- Return Now Date
  const getNowDate = () => {
    const nd = new Date(),
          ndYear = nd.getFullYear(),
          ndMonth = nd.getMonth() + 1,
          ndMonth2dig = ('0' + ndMonth).slice(-2),
          ndDay2dig = ('0' + nd.getDate()).slice(-2),
          ndHour2dig = ('0' + nd.getHours()).slice(-2),
          ndMinutes2dig = ('0' + nd.getMinutes()).slice(-2),
          ndSeconds2dig = ('0' + nd.getSeconds()).slice(-2),
          returnDate = {
            pointTitle: ndYear + '年' + ndMonth + '月',
            nowDate: ndYear + '-' + ndMonth2dig + '-' + ndDay2dig + ' ' + ndHour2dig + ':' + ndMinutes2dig + ':' + ndSeconds2dig
          };
    return returnDate;
  }

  /* ------------------------------ */
  /* First Preview Settings         */
  /* ------------------------------ */
  // -- Set headline
  const headline = document.querySelector('.headline-date');
  let now = getNowDate();
  headline.innerText = now.pointTitle;
  headline.classList.remove('headline-date--hidden');

  /* ------------------------------ */
  /* User Interfaces                */
  /* ------------------------------ */
  // -- Button function - Use point
  const pointBtn = document.querySelector('.point__btn');
  pointBtn.addEventListener('click', () => {
    let life = document.querySelectorAll('.point__life:not(.point__life--used)'),
        lastlife = life[life.length - 1],
        lastlifeIcon = lastlife.querySelector('.point__icon');
    lastlife.classList.add('point__life--used');
    lastlifeIcon.style.display = 'none';
    now = getNowDate();
    const usedText = '前回は' + now.nowDate + 'に使用しました。',
          lastUsed = document.querySelector('.point__last-used');
    lastUsed.innerText = usedText;
  });
}