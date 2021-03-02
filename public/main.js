fetch('/api/messages')
  .then(response => response.json())
  .then(messages => {
    const messagesEl = document.getElementById('messages');
    for (let message of messages) {
      messagesEl.innerHTML += `<li>${message.body}</li>`;
    }

    const messageCountEl = document.getElementById('message-count');
    messageCountEl.innerText = messages.length;
  });

function sendMessage() {
  const newMessageBody = document.getElementById('new-message-input').value;
  fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messageBody: newMessageBody }),
  }).then(() => {
    const sendIndicatorEl = document.getElementById('send-indicator');
    sendIndicatorEl.innerText = 'Sent!';
  });
}
