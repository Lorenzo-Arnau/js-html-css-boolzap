let todayTime = new Date().toLocaleString();
let app = new Vue({
  el: '#root',
  data:{
    lastMessageBool : true,
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
      if (this.lastMessageBool == true) {
        let lastMessage = i.messages[i.messages.length - 1].date;
        let dateTimeArray =lastMessage.split(' ');
        let createdDate = dateTimeArray[1].split(':',2);
        this.selected = i.name;
        this.currentIndex = this.contacts.indexOf(i);
        this.selectedPic = i.avatar;
        this.lastAccessDate = dateTimeArray[0];
        this.lastAccessTime = createdDate[0] +':'+ createdDate[1];
      }else{
        this.selected = i.name;
        this.currentIndex = this.contacts.indexOf(i);
        this.selectedPic = i.avatar;
        this.lastAccessDate = '-data non disponibile-';
        this.lastAccessTime = '-ora non disponibile-';
      }
    },
    addMessage : function(message,status) {
      this.contacts[this.currentIndex].messages = this.contacts[this.currentIndex].messages.concat(
        {
          date: this.sentTime,
          text: message,
          status: status,
        })
        this.lastMessageRead = this.contacts[this.currentIndex].messages[this.contacts[this.currentIndex].messages.length - 1].text;
        let messageList = this.contacts[this.currentIndex].messages;
        if (messageList.length > 0) {
          this.lastMessageBool = true;
        }
        this.newMessage = '';
      },
      receivedMessage : function(){
        let that = this;
        let caseMessage = that.lastMessageRead.toLowerCase();
        console.log(caseMessage);
        let lastTimeChange = this.sentTime.split(' ')[1].split(':',2);
        setTimeout(function() {
          switch (true) {
            case caseMessage.includes('ciao'):
            that.addMessage('ciao a te simpatico utente!','received')
            break;
            case caseMessage.includes('lasciato'):
            that.addMessage('vedrai che torna..','received')
            break;
            case caseMessage.includes('vinto'):
            that.addMessage('complimenti! non è stata tutta fortuna!','received')
            break;
            case caseMessage.includes('come stai'):
            that.addMessage('alla grande! Devo scappare ci sentiamo dopo!','received')
            break;
            case caseMessage.includes('easter'):
            that.addMessage('Lo hai trovato finalmente! Buona pasqua!','received')
            break;
            default:
            that.addMessage('non posso risponderti adesso..ti scrivo dopo!','received')
          }
          that.lastAccessTime = lastTimeChange[0] +':'+ lastTimeChange[1];
        }, 1500);
      },
      createMsgDate : function(currentIndex,idx){
        let createdDate = this.contacts[currentIndex].messages[idx].date.split(' ')[1].split(':',2);
        return createdDate[0] +':'+ createdDate[1];
      },
      lastMessage : function(index){
        let thisText = this.contacts[index].messages[this.contacts[index].messages.length - 1];
          return thisText.text;
      },
      lastAccess : function(index){
        let thisMessage = this.contacts[index].messages[this.contacts[index].messages.length - 1].date.split(' ')[1].split(':',2);
        return thisMessage[0] +':'+ thisMessage[1];
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
      // TODO: La search function può essere cambiata mettendo Includes al posto di startsWith, per avere risultati più completi
      search : function(index){
        if ( index.name.toLowerCase().startsWith(this.searchResult.toLowerCase()) && this.searchResult != '') {
          return true
        }
      },
      popUpOpen :function (index) {
        this.popIndex = index;
      },
      popUpClose : function() {
        this.popIndex = false;
      },
      popUpVisibilityClass: function(index) {
        if(index === this.popIndex) {
          return 'pop-up active'
        }
        return 'pop-up'
      },
      deleteMessage:function(currentIndex,idx){
        let messageList = this.contacts[currentIndex].messages;
        Vue.delete(messageList,idx);
        if (messageList.length <= 0) {
          this.lastMessageBool = false;
          messageList.push(
            {
              date: ' ',
              text: ' ',
              status: ' ',
            })
        }
      },
    },
  });
  Vue.config.devtools = true;
