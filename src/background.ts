'use strict';

class note {
  title: string;
  content: string;
  header: string;

  constructor(title: string, content: string, header: string = 'All Notes') {
    this.title = title;
    this.content = content;
    this.header = header;
  }
}

chrome.runtime.onMessage.addListener((request) => {
  const {message, noteTitle, noteText, noteHeader} = request;

  if(message == "saveNote") {
    const newNote:note = new note(noteTitle, noteText, noteHeader);

    console.log(newNote);

    chrome.storage.local.set({ "note": newNote });
  }
});

