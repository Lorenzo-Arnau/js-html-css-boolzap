var todayTime = new Date().toLocaleString();
var app = new Vue({
 el: '#root',
 data:{
   popActive : 'active',
   popIndex : false,
   lastMessageRead: '',
   searchResult: '',
   notify : false,
   notifyStatus:'Attiva',
   sentTime: todayTime,
   selected : 'Michele',
   selectedPic :'_1',
   lastAccessDate :'10/01/2020',
   lastAccessTime:'16:15',
   currentIndex:0,
   newMessage:'',
   contacts: [
          {
          name: 'Michele',
          avatar: '_1',
          visible: true,
          messages: [
           {
             date: '10/01/2020 15:30:55',
             text: 'Hai portato a spasso il cane?',
             status: 'sent'
           },
           {
             date: '10/01/2020 15:50:00',
             text: 'Ricordati di dargli da mangiare',
             status: 'sent'
           },
           {
             date: '10/01/2020 16:15:22',
             text: 'Tutto fatto!',
             status: 'received'
           }
          ],
          },
          {
          name: 'Fabio',
          avatar: '_2',
          visible: true,
          messages: [
           {
             date: '20/03/2020 16:30:00',
             text: 'Ciao come stai?',
             status: 'sent'
           },
           {
             date: '20/03/2020 16:30:55',
             text: 'Bene grazie! Stasera ci vediamo?',
             status: 'received'
           },
           {
             date: '20/03/2020 16:35:00',
             text: 'Mi piacerebbe ma devo andare a fare la spesa.',
             status: 'sent'
           }
          ],
          },
          {
          name: 'Samuele',
          avatar: '_3',
          visible: true,
          messages: [
           {
             date: '28/03/2020 10:10:40',
             text: 'La Marianna va in campagna',
             status: 'received'
           },
           {
             date: '28/03/2020 10:20:10',
             text: 'Sicuro di non aver sbagliato chat?',
             status: 'sent'
           },
           {
             date: '28/03/2020 16:15:22',
             text: 'Ah scusa!',
             status: 'received'
           }
          ],
          },
          {
          name: 'Luisa',
          avatar: '_4',
          visible: true,
          messages: [
           {
             date: '10/01/2020 15:30:55',
             text: 'Lo sai che ha aperto una nuova pizzeria?',
             status: 'sent'
           },
           {
             date: '10/01/2020 15:50:00',
             text: 'Si, ma preferirei andare al cinema',
             status: 'received'
           }
          ],
          },
          ]


 },
 methods:{
    selectedUser : function(i) {
      var lastMessage = i.messages[i.messages.length - 1].date;
      var dateTimeArray =lastMessage.split(' ');
      var createdDate = dateTimeArray[1].split(':',2);
      this.selected = i.name;
      this.currentIndex = this.contacts.indexOf(i);
      this.selectedPic = i.avatar;
      this.lastAccessDate = dateTimeArray[0];
      this.lastAccessTime = createdDate[0] +':'+ createdDate[1];
    },
    addMessage : function(message,status) {
      this.contacts[this.currentIndex].messages = this.contacts[this.currentIndex].messages.concat(
      {
        date: this.sentTime,
        text: message,
        status: status,
      })
      this.lastMessageRead = this.contacts[this.currentIndex].messages[this.contacts[this.currentIndex].messages.length - 1].text;
      console.log(this.lastMessageRead);
      console.log(this.sentTime);
      this.newMessage = '';
    },
    receivedMessage : function(){
      let that = this;
      var lastTimeChange = this.sentTime.split(' ')[1].split(':',2);
      setTimeout(function() {
        switch (that.lastMessageRead.toLowerCase()) {
          case 'ciao':
            that.addMessage('ciao a te simpatico utente!','received')
            break;
          case 'come stai?':
            that.addMessage('alla grande! Devo scappare ci sentiamo dopo!','received')
            break;
          case 'easter egg':
            that.addMessage('Lo hai trovato finalmente!','received')
            break;
          default:
            that.addMessage('non posso risponderti adesso..ti scrivo dopo!','received')
        }
        that.lastAccessTime = lastTimeChange[0] +':'+ lastTimeChange[1];
      }, 1500);
    },
    createDate : function(currentIndex,idx){
        var createdDate = this.contacts[currentIndex].messages[idx].date.split(' ')[1].split(':',2);
        return createdDate[0] +':'+ createdDate[1];
    },
    lastMessage : function(index){
      return  this.contacts[index].messages[this.contacts[index].messages.length - 1].text;
    },
    changeNotify : function(){
      if (this.notify === false) {
        this.notify = true;
        this.notifyStatus='Disattiva';
      }else {
        this.notify = false;
        this.notifyStatus='Attiva';
      }
      return this.notify
    },
   search : function(index){
     if ( index.name.toLowerCase().startsWith(this.searchResult.toLowerCase()) && this.searchResult != '') {
       return true
     }
   },
   popUp :function (index) {
     this.popIndex = index;
     console.log( this.popIndex);
   },
   popUpClass: function(index) {
     if(index === this.popIndex) {
       return 'pop-up ' + this.popActive
     }
      return 'pop-up'
   },

 },
});

Vue.config.devtools = true;
