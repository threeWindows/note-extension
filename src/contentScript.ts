'use strict';

document.addEventListener('click', function (event) {
  const clickedItem = event.target as Node;

  chrome.runtime.sendMessage({ message: 'createQuickNote' });

  let newBtn = document.createElement('button');
  newBtn.textContent = 'ASDASD';

  clickedItem.appendChild(newBtn);
});
