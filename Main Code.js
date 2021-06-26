const mainPath = "/sdcard/ChatRank/";
const Fs = FileStream;

var json = {};
json[room] = room;



var json = JSON.parse(Fs.read(mainPath+room)).sender + 1;
/*
1 추가한 후 바로 정렬 돌리고 불러올 때 편하게 불러오기
*/

if (msg == ".채팅순위") {
  //
}
  
if (msg == ".채팅순위리셋) {
  Fs.write(mainPath + room, "{}")
}
  
