$(document).ready( function() {
  var test_els = $('h1, h2, p');

  $.each(test_els, function(i, v) {

    var test_el = $(v);
    var html = test_el.html().trim();
    var new_html = "";
    var ignore = false
    for (var i = 0, len = html.length; i < len; i++) {
      if (html[i]=='<') {
        ignore=true
      }
      if (!ignore) {
        new_html += "<span>"+html[i]+"</span>"
      }else{
        new_html += html[i]
      }
      if (html[i]=='>') {
        ignore=false
      }
    }
    test_el.html(new_html)
  } )

  var els = $('span');

  var distance = function() {
    var direc = [1,-1]
    var base = 200
    var direction = direc[Math.floor(Math.random() * direc.length)]
    return direction*Math.random()*base
  };

  var time = function(i) {
    var base = 2
    //return base/2 + Math.random()*base/2
    return 500 + base*i;
  }

  var scale = function() {
    return Math.random()*2
  }

  for (var i = 0, len = els.length; i < len; i++) {
    var l = $(els[i]);
    p = l.position();
    coop_p = $('img')
    brain_position = {};
    brain_position.left = coop_p.position().left + coop_p.width()/3
    brain_position.top = coop_p.position().top + coop_p.height()/20

    var init = {}
    init.x = brain_position.left - p.left;
    init.y = brain_position.top - p.top;
    l
    .transition({ x: init.x, y: init.y, scale: 0.5}, 0)
    .transition({ x: init.x+1, y: init.y+1}, 3000)
    .transition({ x: distance(), y: distance(), scale: scale()*3}, 2000)
    .transition({ x: distance(), y: distance(), scale: scale()}, time(i))
    .transition({ x: 0, y:0, scale: 1}, time(i)*2, 'cubic-bezier(.74,-0.85,.31,1.63)')
  }
  
})
