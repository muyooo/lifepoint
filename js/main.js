'use strict';

{
  /* ------------------------------ */
  /* Functions                      */
  /* ------------------------------ */
  // -- Return Now Date
  const getNowDate = () => {
    const get2Digits = (target) => {
            const result = ('0' + target).slice(-2);
            return result;
          },
          nd = new Date(),
          ndYear = nd.getFullYear(),
          ndMonth = nd.getMonth() + 1,
          ndMonth2dig = get2Digits(ndMonth),
          ndDay2dig = get2Digits(nd.getDate()),
          ndHour2dig = get2Digits(nd.getHours()),
          ndMinutes2dig = get2Digits(nd.getMinutes()),
          ndSeconds2dig = get2Digits(nd.getSeconds()),
          returnDate = {
            pointTitle: ndYear + '年' + ndMonth + '月',
            yearMonthForCompare: ndYear + ndMonth2dig.toString(),
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
  // -- LocalStrage
  try {
    // -- LocalStrage settings
    const types = [
            {name: 'beer', maxPoint: 2},
            {name: 'eatout', maxPoint: 4}
          ],
          typesLen = types.length,
          getTypeSettings = (i) => {
            const result = {
              type: types[i].name,
              maxPoint: types[i].maxPoint,
              restPoint: types[i].name + 'RestPoint',
              lastUsed: types[i].name + 'LastUsed'
            };
            return result;
          };
    // -- Recovery point
    const lastLoginYM = localStorage.getItem('lastLoginYM'),
          loginYM = now.yearMonthForCompare;
    if (lastLoginYM && loginYM > lastLoginYM) {
      for(let i = 0; i < typesLen; i++) {
        const target = getTypeSettings(i);
        localStorage.setItem(target.restPoint, target.maxPoint);
      }
      alert('月が変わったのでポイントが回復しました。');
    }
    localStorage.setItem('lastLoginYM', loginYM);
    for(let i = 0; i < typesLen; i++) {
      // -- Redisplay current point
      const target = getTypeSettings(i),
            nowTargetPointNum = localStorage.getItem(target.restPoint) == null ? target.maxPoint : localStorage.getItem(target.restPoint),
            lostTargetPointNum = target.maxPoint - nowTargetPointNum,
            targetPointSection = (() => {
              const pointSections = document.querySelectorAll('.point'),
                    pointSectionsLen = pointSections.length;
              for(let i = 0; i < pointSectionsLen; i++) {
                const pointSectionType = pointSections[i].getAttribute('data-type');
                if(pointSectionType == target.type) {
                  return pointSections[i];
                }
              }
            })(),
            targetPointObjects = targetPointSection.querySelectorAll('.point__life');
      for(let i_ = 1; i_ <= lostTargetPointNum; i_++) {
        const targetPointObj = targetPointObjects[target.maxPoint - i_],
              targetPointIcon = targetPointObj.querySelector('.point__icon');
        targetPointObj.classList.add('point__life--used');
        targetPointIcon.style.display = 'none';
      }
      // -- Redisplay last used time
      const lastUsed = localStorage.getItem(target.lastUsed),
            lastUsedObj = targetPointSection.querySelector('.point__last-used');
      lastUsedObj.innerText = lastUsed;
    }
  } catch(e) {
    alert('localStrage未対応のブラウザのため、ポイントの使用状況が保存されません。');
    console.log('Error:' + e);
  }
  // -- Preview hidden contents
  const pointSection = document.querySelector('.points');
  pointSection.classList.remove('points--hidden');

  /* ------------------------------ */
  /* User Interaction               */
  /* ------------------------------ */
  // -- Button function - Use point
  const pointBtns = document.querySelectorAll('.point__btn'),
        pointBtnsLen = pointBtns.length;
  for(let i = 0; i < pointBtnsLen; i++) {
    pointBtns[i].addEventListener('click', () => {
      const targetPoint = document.querySelectorAll('.point')[i],
            life = targetPoint.querySelectorAll('.point__life:not(.point__life--used)'),
            lifeLen = life.length;
      if (lifeLen == 0) {
        alert('残りポイントがありません。');
        return;
      }
      let lastlife = life[lifeLen - 1],
          lastlifeIcon = lastlife.querySelector('.point__icon');
      lastlife.classList.add('point__life--used');
      lastlifeIcon.style.display = 'none';
      now = getNowDate();
      const usedText = '前回は' + now.nowDate + 'に使用しました。',
            targetLastUsed = targetPoint.querySelector('.point__last-used'),
            targetType = targetPoint.getAttribute('data-type'),
            targetRestPoint = targetType + 'RestPoint',
            targetUsedTime = targetType + 'LastUsed';
      targetLastUsed.innerText = usedText;
      localStorage.setItem(targetUsedTime, usedText);
      const restPoint = localStorage.getItem(targetRestPoint) - 1;
      localStorage.setItem(targetRestPoint, restPoint);
    });
  }
}