const socket = io('http://localhost:3000')

const output_container = document.getElementById('output-container')
const input_container  = document.getElementById('input-container')
const message_input    = document.getElementById('message-input')

socket.on('chat-message', data => {
    console.log(data)
    appendMessage(data)
})

input_container.addEventListener('submit', e => {
    e.preventDefault()
    const msg = message_input.value;
    socket.emit('chat-message', msg)
    message_input.value = ''
})

function appendMessage(message) {
    const message_element = document.createElement('div')
    message_element.innerText = message

    output_container.append(message_element)
}