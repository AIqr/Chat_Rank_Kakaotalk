const mainPath = "/sdcard/ChatRank/";
const Fs = FileStream;
const allsee = "\u200d".repeat(500);
const nn = "\n\n";

var json = {};
json[room] = room;



var json = JSON.parse(Fs.read(mainPath+room)).sender + 1;
/*
1 추가한 후 바로 정렬 돌리고 불러올 때 편하게 불러오기
2. 메시지 오면 일단 저장하고 불러올때 정렬 -> 이게 더 메모리 적게먹을듯?
*/

if (msg == ".채팅순위") {
  //
  replier.reply(
    "채팅 순위입니다" + allsee
  + ""
  );
}
  
if (msg == ".채팅순위리셋) {
  Fs.write(mainPath + room, "{}");
  replier.reply(room + "방에 저장된 채팅순위가 초기화되었습니다.");
}

