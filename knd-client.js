const socket = io.connect()

const msg_output     = document.getElementById('msg-output')
const msg_input      = document.getElementById('msg-input')
const msg_text_field = document.getElementById('msg-text-field')
const msg_submit     = document.getElementById('msg-submit')

socket.on('message', (message) => {
    append(message)
})

msg_input.addEventListener('submit', event => {
    event.preventDefault()
    const message = msg_text_field.value
    socket.emit('message', message)
    msg_text_field.value = ''
})

function append(message) {
    var msg = document.createElement('div')    
    msg.setAttribute('class', 'msg')
    msg.innerHTML = message
    msg_output.append(msg)
}