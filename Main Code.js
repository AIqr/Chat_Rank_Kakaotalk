const scriptName = "챗순위";

const Fs = FileStream;
const Path = "/sdcard/ChatRank/";
const allsee = "‍".repeat(500);

var file = {};
var arr = [];

var temp = [];
var allChatSum = 0;

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  try {
    
    //if (room != "카톡봇 테스트방") return;
    if (!Fs.read(Path + room)) reset(room);
    
    
    file = JSON.parse(Fs.read(Path + room));
    
    if (file.todayDate != new Date().getDate()) {
      file.todayDate = new Date().getDate();
      file.today = [];
      Fs.write(Path + room, JSON.stringify(file));
      return;
    }
    
    if (msg == ".ㄹ") {
      reset(room);
      return;
    }
    
    if (msg == ".ㄹㅇ") {
      file["today"] = [];
      Fs.write(Path + room, JSON.stringify(file));
      return;
    }
    
    
    
    if (msg == ".전체채팅") {
      
      temp = [];
      allChatSum = 0;
      
      arr = file["total"].sort((a, b) => b.times - a.times).map((i) => i.name);
      //replier.reply(arr)
      
      for (i = 0; i < arr.length; i++) 
        allChatSum += file["total"].find(e => e.name == arr[i]).times;
      
      
      for (i = 0; i < arr.length; i++) {
        
        var tempInfo = file["total"].find(e => e.name == arr[i]);
        
        temp.push(
          (i + 1) + "등: " + arr[i]
          + "\n채팅: " + tempInfo.times + "회"
          + " ("+(tempInfo.times*100/allChatSum).toFixed(2) + "%)"
          + "\n마지막 챗: " + '"'+tempInfo.lastMsg+'"' + " ("+ tempInfo.lastChat +")"
        );
        
      }
      replier.reply(
        "전체 채팅 통계\n"+allsee + "\n"
        + room + "방의 채팅횟수: " + allChatSum + "회\n\n"
        + temp.join("\n\n"));
    }
    
    
    if (msg == ".내채팅" || msg.startsWith(".채팅 ")) {
      if (msg != ".내채팅") sender = msg.substr(4);
      
      try{
      
        var tempInfo_2 = file["total"].find(e => e.name == sender);
        allChatSum = 0;
      
        for (i = 0; i < file.total.length; i++) 
          allChatSum += file.total[i].times;
        
      
        replier.reply(
          "이름: " + sender
          + "\n채팅횟수: " + tempInfo_2.times
          + " ("+(tempInfo_2.times*100/allChatSum).toFixed(2) + "%)"
          + "\n마지막 챗: " + '"'+tempInfo_2.lastMsg+'"' + " ("+ tempInfo_2.lastChat +")"
        );
      } catch(e) {
        replier.reply("해당 이름의 유저가 없습니다.");
      }
    }
    
    
    
    
    if (!file["total"].find(e => e.name == sender)) {
    
      file["total"].push( {
        "name": sender, 
        "times": 1, 
        "lastChat": time(),
        "lastMsg": msg
      } );
      
      file["today"].push( {
        "name": sender, 
        "times": 1, 
        "lastChat": time(),
        "lastMsg": msg
      } );

    } else {
      
      if (!file["today"].find(e => e.name == sender)) {
      
  
        file["today"].push( {
          "name": sender, 
          "times": 1, 
          "lastChat": time(),
          "lastMsg": msg
        } );
        
        file["total"].find(e => e.name == sender).times += 1;
        file["total"].find(e => e.name == sender).lastChat = time();
        file["total"].find(e => e.name == sender).lastMsg = msg;
        
      } else {
        file["today"].find(e => e.name == sender).times += 1;
        file["today"].find(e => e.name == sender).lastChat = time();
        file["today"].find(e => e.name == sender).lastMsg = msg;
        file["total"].find(e => e.name == sender).times += 1;
        file["total"].find(e => e.name == sender).lastChat = time();
        file["total"].find(e => e.name == sender).lastMsg = msg;
      }
    }
    
    Fs.write(Path + room, JSON.stringify(file));
    
   if (msg == ".ㅌ") {
      replier.reply(JSON.stringify(file, null, 4));
    }
  
  
  
  
    
  }  catch (e) {
    replier.reply(e + e.lineNumber);
  }
}

function reset(room) {
  file = {};
  file["today"] = [];
  file["total"] = [];
  file["todayDate"] = new Date().getDate();
  Fs.write(Path + room, JSON.stringify(file));
}

function time() {
  var day = new Date();
  return (
    day.getDate() + "일 " + (day.getHours() > 12 ? "오후 "
    + (day.getHours() - 12).toString() : day.getHours().toString())) + "시 "
    + day.getMinutes() + "분 " + day.getSeconds() + "초";
}
