const axios = require('axios');

const app = new Vue({
    el: '#app',
    data: {
        title: 'Nestjs Chat',
        name: '',
        text: '',
        messages: [],
        socket: null
    },
    methods: {
        sendMessage() {
            if (this.validateInput()) {
                const message = {
                    name: this.name,
                    text: this.text
                }
                this.socket.emit('msgToServer', message)
                this.text = ''
            }
        },
        receivedMessage(message) {
            this.messages.push(message)
        },
        validateInput() {
            return this.name.length > 0 && this.text.length > 0
        }
    },
    created() {
        this.socket = io('http://localhost:3002')
        this.socket.on('msgToClient', (message) => {
            this.receivedMessage(message)
        })
    }
})