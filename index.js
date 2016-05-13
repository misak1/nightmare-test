var Nightmare = require('nightmare');
var vo = require('vo');
var uniq = function(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}
vo(function* () {
  var nightmare = Nightmare({openDevTools:true, show: true });
  //var nightmare = Nightmare({ show: false });
  var link = yield nightmare
    .viewport(1600, 900)
    .useragent('hoge3')
    .goto('http://yahoo.com')
    //.goto('http://localhost:49199')
    //.authentication('user', 'passwd') // use basic auth 
    .evaluate(function () {
      //return document.getElementsByTagName('a')[0].href;
      var i = document.getElementsByTagName('a');
      var j = 0;
      var ah = [];
      while (j < i.length) {
        var fullURL = i[j].href;
        ah.push(fullURL);
        j++;
      }
      return ah;
    });
  yield nightmare.end();
  return link;
})(function (err, result) {
  if (err) return console.log(err);
  //console.log(result);
  console.log(uniq(result));
});
