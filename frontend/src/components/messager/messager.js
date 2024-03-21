// messager.js

let currentSetMessage = null;
let messageTimeout = null;

export function subscribeToMessages(setMessage) {
    currentSetMessage = setMessage;
    return () => {
      currentSetMessage = null;
      clearTimeout(messageTimeout);
    };
  }
  
function displayMessage(text, type) {
    if (currentSetMessage) {
        clearTimeout(messageTimeout);
        currentSetMessage({ text, type });
        messageTimeout = setTimeout(() => currentSetMessage({ text: '', type: '' }), 8000);
    }
}
  

export function info(message) {
    displayMessage(message, 'info');
}
  
export function error(message) {
    displayMessage(message, 'error');
}