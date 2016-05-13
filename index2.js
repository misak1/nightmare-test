var Nightmare = require('nightmare');
var fs = require('fs');

var urls = [];
//urls.push('https://rpm.newrelic.com/accounts/xxxxxxxxxxxxxxxxxxxxxxxxxxx');
//urls.push('https://rpm.newrelic.com/accounts/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
//urls.push('https://rpm.newrelic.com/accounts/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
urls.push('https://www.yahoo.com/');
urls.push('https://www.yahoo.com/#Aside');
urls.push('https://www.yahoo.com/#Main');
urls.push('https://www.yahoo.com/#Navigation');
urls.push('https://www.yahoo.com/beauty/');
urls.push('https://www.yahoo.com/celebrity/');
urls.push('https://www.yahoo.com/celebrity/daisy-ridley-tops-askmens-2016-crush-list-155353326.html');
urls.push('https://www.yahoo.com/celebrity/kelly-ripa-opens-up-about-what-really-happened-133705662.html');
urls.push('https://www.yahoo.com/katiecouric/army-veteran-completes-26-marathons-after-losing-135703113.html');
urls.push('https://www.yahoo.com/movies/');
urls.push('https://www.yahoo.com/music/');
urls.push('https://www.yahoo.com/news/');
urls.push('https://www.yahoo.com/news/man-whose-weight-loss-journey-183017302.html');
urls.push('https://www.yahoo.com/news/momma-goose-asks-officer-help-213100012.html');
urls.push('https://www.yahoo.com/news/mommy-goose-approaches-police-officers-222800466.html');
urls.push('https://www.yahoo.com/news/n-korea-stages-second-mass-spectacular-mark-end-155703489.html');
urls.push('https://www.yahoo.com/news/seal-trainee-dies-during-basic-training-085001368.html');
urls.push('https://www.yahoo.com/news/steep-decline-in-us-recruits-to-isis-fbi-chief-212138680.html');
urls.push('https://www.yahoo.com/news/unconventional-12-ted-cruz-s-last-1426653936271414.html');
urls.push('https://www.yahoo.com/news/wildfires-canada-135432656.html');
urls.push('https://www.yahoo.com/politics/');
urls.push('https://www.yahoo.com/style/');
urls.push('https://www.yahoo.com/tech/');
urls.push('https://www.yahoo.com/tv/');
urls.push('https://yahoo.uservoice.com/forums/341361-yahoo-home');

var uniq = function(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}
var i = 0;
for(u in urls) {
  var url = urls[u];
  var filename = './tmp/' + i + '.png';
  fs.appendFile('/tmp/urls.txt',url+'\n');
  //new Nightmare()
  var nightmare = new Nightmare({openDevTools:false, show: false })
    .viewport(1600, 900)
    .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
    .goto(url)
    //.wait(1000)
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
    })
    .run(function (err, result) {
      if (err) return console.log(err);
      console.log(result);
      console.log('Done!');
    });
  nightmare.end();
  i++;
}
