window.onload = async () => {
  var db = new Dexie("searchgazeDB");
  db.version(1).stores({
    words: "++id,data,time,x,y"
  });

  var count = {};

  await db.words.each(item => {
    item.data.split(" ").forEach(d => {
      if (!count[d]) {
        count[d] = 0;
      }
      count[d]++;
    });
  });

  words = Object.keys(count);

  function draw(words) {
    d3.select("body")
      .append("svg")
      .attr("width", 600)
      .attr("height", 600)
      .append("g")
      .attr("transform", "translate(300,300)")
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", function(d) {
        return d.size + "px";
      })
      .style("font-family", "Impact")
      .style("fill", function(d, i) {
        return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
      })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")";
      })
      .text(function(d) {
        return d.text;
      });
  }

  d3.layout
    .cloud()
    .size([600, 600])
    .words(
      words.map(function(d) {
        return { text: d[0], size: d.length + 10 };
      })
    )
    .padding(5)
    .font("Impact")
    .fontSize(function(d) {
      return d.size;
    })
    .on("end", draw)
    .start();
};
