var db = new Dexie("searchgazeDB");
db.version(1).stores({
  words: "++id,data,time,x,y"
});

var gazer = webgazer.setGazeListener((data, elapsedTime) => {
  try {
    var nodes = document.elementFromPoint(data.x, data.y).childNodes;
    if (nodes.length === 1) {
      db.words
        .add({ data: nodes[0], time: elapsedTime, x: data.x, y: data.y })
        .catch(e => {});
    }
  } catch (e) {}
});

gazer.begin();
