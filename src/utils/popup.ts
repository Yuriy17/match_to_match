/* eslint-disable @typescript-eslint/no-loop-func */

/* This script supports IE9+ */
(function () {
  let modalWindow;

  /* Opening modal window function */
  function openModal() {
    /* Get trigger element */
    const modalTrigger:HTMLCollectionOf<Element> = document.getElementsByClassName('jsModalTrigger');

    /* Set onclick event handler for all trigger elements */
    for (let i = 0; i < modalTrigger.length; i += 1) {
      modalTrigger[i].addEventListener('click', (e):boolean => {
        e.preventDefault();
        const currentLink = e.currentTarget as HTMLElement | null;
        if (!currentLink) return false;
        const target = currentLink.getAttribute('href').substr(1);
        modalWindow = document.getElementById(target);
        if (modalWindow.classList) {
          modalWindow.classList.add('open');
        } else {
          (modalWindow.className += ' open');
        }

        return false;
      });
    }
  }

  function closeModal() {
    /* Get close button */
    const closeButton = document.getElementsByClassName('jsModalClose');
    const closeOverlay = document.getElementsByClassName('jsOverlay');
    // const sendButton = document.getElementsByClassName('jsModalSend');

    /* Set onclick event handler for close buttons */
    for (let i = 0; i < closeButton.length; i += 1) {
      closeButton[i].addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLElement;
        modalWindow = target.parentElement.closest('.modal');

        if (modalWindow.classList) {
          modalWindow.classList.remove('open');
        } else {
          (modalWindow.className = modalWindow.className.replace(
            new RegExp(`(^|\\b)${'open'.split(' ').join('|')}(\\b|$)`, 'gi'), ' ',
          ));
        }
        return false;
      });
    }

    /* Set onclick event handler for modal overlay */
    for (let i = 0; i < closeOverlay.length; i += 1) {
      closeOverlay[i].addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLElement;
        modalWindow = target.parentElement;

        if (modalWindow.classList) {
          modalWindow.classList.remove('open');
        } else {
          (modalWindow.className = modalWindow.className.replace(
            new RegExp(`(^|\\b)${'open'.split(' ').join('|')}(\\b|$)`, 'gi'), ' ',
          ));
        }
        return false;
      });
    }
  }

  /* Handling domready event IE9+ */
  function ready(fn: ()=>void) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* Triggering modal window function after dom ready */
  ready(openModal);
  ready(closeModal);
}());
