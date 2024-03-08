'use strict';

import './popup.css';

(function () {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions

  function main() {

    const createNewNote = document.getElementById('createNewNote');
    const newNoteContainer = document.getElementsByClassName('newNoteContainer');

    createNewNote?.addEventListener('click', () => {
      newNoteContainer[0].classList.add('openWindow');
      newNoteContainer[0].classList.remove('closeWindow');
      chrome.runtime.sendMessage({message: 'createNewNote'});
    })

    // const title = document.getElementById('title') as HTMLInputElement;
    // const text = document.getElementById('text') as HTMLInputElement;
    // const save = document.getElementById('save');

    // save?.addEventListener('click', () => {
    //   chrome.storage.local
    //     .set({ title: title?.value, content: text?.value })
    //     .then(() => {
    //       console.log('Value is set');
    //     });

    //   chrome.storage.local.get(['title', 'content']).then((result) => {
    //     console.log(`Title: ${result.title}\nContent: ${result.content}`);
    //   });
    // });
  }

  document.addEventListener('DOMContentLoaded', main); //restoreCounter;
})();
