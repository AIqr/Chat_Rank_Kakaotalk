const scriptName = "챗순위";

const Fs = FileStream;
const Path = "/sdcard/ChatRank/";


var allsee = "\u200d".repeat (500);

var file = {};
var arr = [];

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  try {
   //if (room != "카톡봇 테스트방") return;
    
    if (!Fs.read(Path + room)) reset(room);
    if (msg == ".ㅅㅇㄹㅅ") reset(room)
    
    file = JSON.parse(Fs.read(Path + room));
    
    if (!file["today"].find(e => e.name == sender)) {
      file["today"].push(
      {
        "name": sender,
        "times": 1
      }
      );
    } else {
      file["today"].find(e => e.name == sender).times += 1;
    }
    
    
    Fs.write(Path + room, JSON.stringify(file));
    
    
    if (msg == ".ㅌ") {
      replier.reply(JSON.stringify(file, null, 4))
      replier.reply(JSON.stringify(file["total"].find(e => e.name == sender).score))
    
    }
  
    
    if (msg == ".채팅순위") {
      
      arr = file["today"].sort((a,b) => b.times-a.times).map((i) => i.name);
      //replier.reply(arr)
      
      var temp = [];
      for (i=0; i<arr.length; i++) {
        temp.push((i+1) + "등: " + arr[i]
        + "\n채팅: " + file["today"].find(e => e.name == arr[i]).times + "회");
      }
      
     replier.reply(allsee + "\n"+temp.join("\n\n"));
    }
    
    
    
  } catch(e) {
    replier.reply(e + e.lineNumber);
  }
}


function reset(room) {
      file = {};
      file["today"] = [];
      Fs.write(Path + room, JSON.stringify(file));
      return;
}
