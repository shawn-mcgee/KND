const socket = io.connect()

const msg_output     = document.getElementById('msg-output')
const msg_input      = document.getElementById('msg-input')
const msg_text_field = document.getElementById('msg-text-field')
const msg_submit     = document.getElementById('msg-submit')

socket.on('tx_message', (message) => {
    tx_message(message)
})

socket.on('rx_message', (message) => {
    rx_message(message)
})

msg_input.addEventListener('submit', event => {
    event.preventDefault()
    const message = msg_text_field.value.trim()
    if(message !== '') {
        socket.emit('tx_message', message)
        msg_text_field.value = ''
    }
})

function tx_message(message) {
    var element = document.createElement('div')    
    element.setAttribute('class', 'tx_msg')
    element.innerHTML = message

    append(element)
}

function rx_message(message) {
    var element = document.createElement('div')    
    element.setAttribute('class', 'rx_msg')
    element.innerHTML = message

    append(element)
}

function append(element) {
    if(compare(msg_output.scrollTop, msg_output.scrollHeight - msg_output.clientHeight, 1)) {
        msg_output.append(element)
        msg_output.scrollTop  = msg_output.scrollHeight - msg_output.clientHeight
    } else
        msg_output.append(element)
}

function compare(a, b, e) {
    return Math.abs(a - b) <= e
}