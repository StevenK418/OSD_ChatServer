import { Component } from '@angular/core';
import { InstantChatService } from './services/instant-chat.service.spec';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OSD_ChatServer';
  user: String;
  room: String;
  
  // tslint:disable-next-line:ban-types
  messageText: String;
  messageArray: Array<{user: String , message: String }> = [];
  constructor(private instantChatservice: InstantChatService){
   
    this.instantChatservice.newUserJoined()
      .subscribe(data => this.messageArray.push(data));


    this.instantChatservice.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this.instantChatservice.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  join(){
      this.instantChatservice.joinRoom({user: this.user, room: this.room});
  }

  leave(){
    this.instantChatservice.leaveRoom({user: this.user, room: this.room});
  }

  sendMessage()
  {
    this.instantChatservice.sendMessage({user: this.user, room: this.room, message: this.messageText});
  }
}
