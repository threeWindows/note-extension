'use strict';

import './popup.css';

(function () {
  function main() {

    const headers:string[] = ['All Notes', 'Work', 'Home', 'ToDo'];
    const selectHeader = document.getElementById('selectHeader');

    headers.map(header => {
      const option = document.createElement('option');
      option.value = header;
      option.textContent = header;

      if(option.value == 'All Notes') {
        option.selected = true;
      }

      selectHeader?.appendChild(option);
    })    

    let selectedOption: string;
    selectHeader?.addEventListener('change', (event) => {
      if (event.target) {
        selectedOption = (event.target as HTMLSelectElement).value;
      }
    });

    const createNewNote = document.getElementById('createNewNote');
    const newNoteContainer = document.getElementsByClassName('newNoteContainer');

    //Shorten the note if it is too long 
    const shorterNote = document.querySelectorAll('.note span');
    shorterNote.forEach(shNote => {
      let text = shNote.textContent;
      if(text) {
        if(text.length >= 110) {
          text = text.substring(0, 110) + '...';
          shNote.textContent = text;
        }
      }
    })

    const saveButton = document.getElementById('save');
    const title = document.getElementById('title') as HTMLInputElement;
    const note = document.getElementById('note') as HTMLInputElement;
    const appMain = document.getElementById('appMain');

    //Event for save button
    saveButton?.addEventListener('click', () => {
      chrome.runtime.sendMessage({message: 'saveNote', noteTitle: title?.value, noteText: note?.value, noteHeader: selectedOption});

      chrome.storage.local.get(["note"], (result) => {
        const {title, content, header} = result.note;

        const newNoteDiv = document.createElement('div');
        newNoteDiv.classList.add('note');
        newNoteDiv.setAttribute('title', title);
        newNoteDiv.setAttribute('headers', header);

        const newTitle = document.createElement('h3');
        newTitle.textContent = title;

        const newContent = document.createElement('span');
        newContent.textContent = content;

        newNoteDiv.appendChild(newTitle);
        newNoteDiv.appendChild(newContent);

        appMain?.appendChild(newNoteDiv);

        newNoteContainer[0].classList.add('closeWindow');
      });

    

      // chrome.runtime.onMessage.addListener((request) => {
      //   if(request.message == "NewNoteIsSet") {
      //     const {noteObject: {title, content}} = request;

      //     const newNoteDiv = document.createElement('div');
      //     newNoteDiv.classList.add('note');

      //     const newTitle = document.createElement('h3');
      //     newTitle.textContent = title;

      //     const newContent = document.createElement('span');
      //     newContent.textContent = content;

      //     newNoteDiv.appendChild(newTitle);
      //     newNoteDiv.appendChild(newContent);

      //     appMain?.appendChild(newNoteDiv);

      //     newNoteContainer[0].classList.add('closeWindow');
      //   }
      // })
    })

    const leftNote = document.getElementById('leftNote');
    leftNote?.addEventListener('click', () => {
      newNoteContainer[0].classList.remove('openWindow');
      newNoteContainer[0].classList.add('closeWindow');
    })

    const findNote = document.getElementById('findNote') as HTMLInputElement;
    const noteClass = document.getElementsByClassName('note');
    
    findNote?.addEventListener('keyup', () => {
      for(let i=0;i<noteClass.length;i++) {

        let noteTitle = noteClass[i].getAttribute("title");

        if(!noteTitle?.includes(findNote.value)) {
          (noteClass[i] as HTMLElement).style.setProperty('display', 'none');
        }

        if(findNote.value.length == 0) {
          (noteClass[i] as HTMLElement).style.setProperty('display', 'block');
        }  
      }
    })

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
