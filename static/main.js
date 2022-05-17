const app = new Vue({
    el: '#app',
    data: {
     title: 'Nestjs Chat',
     name: '',
     text: '',
     messages: [],
     socket: null,
     token: "mkddkmdkmdkmdmkdkmdmkmkdmkdmk"
    },
    methods: {
        getMessages() {
            axios.get('/messages')
            .then(response => {
                this.messages = response.data;
            })
        },
     sendMessage() {
      if(this.validateInput()) {
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
     this.socket = io('http://localhost:3002', {
         query: {
             token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjgwY2FiZGI5YjcyMDBkNWYwMGY3MzUiLCJpYXQiOjE2NTI3MjE4NDksImV4cCI6MTY1Mjc2NTA0OX0.hEaubA4zxHNVdipVYq_VnXKRllp6fjdTDScpRWuaRRw"
             }
             })
     this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message)
     })
    }
   })