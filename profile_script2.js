var projects, about, contact, current, foldNumber, sections, counter, d, destination, i, defaultSpeed, p_clone, c_clone, a_clone;

$(document).ready(function() {

  foldNumber = 82.7
  options = { 
    vPanels: 8,
    touchEnabled: false,
    shadingIntesity: .9
  }
  projects = new OriDomi('.projects', options);
  about = new OriDomi('.about', options);
  contact= new OriDomi('.contact', options);

  sections = [projects, about, contact];
  current = about; //we are starting on the middle panel... use this var to keep track...

  //set up initial focus
  contact.setSpeed(0).accordion(foldNumber, 'right', resetSpeeds);
  projects.setSpeed(0).accordion(foldNumber, 'left')

  setNavTriggers();
  setHoverEvents();

});

function setNavTriggers() {
  $('.projects').on('click', function(e) {
    cycle(projects);
    e.stopPropagation();
  });
  $('.about').on('click', function(e) {
    cycle(about);
    e.stopPropagation();
  });
  $('.contact').on('click', function(e) {
    cycle(contact);
    e.stopPropagation();
  });

  $(window).keydown(function(e) {
    if (performance.now() - counter < 850) {return} //prevent clogging 

    counter = performance.now()

    i = sections.indexOf(current)
    if (e.keyCode == 37 && i!==0 ) { //left arrow
      cycle(sections[i-1]);
    } else if (e.keyCode == 39 && i !== 2) { //right arrow
      cycle(sections[i+1]);
    }
  })
};

function setHoverEvents () {
  $('.paper').on('mouseover', function(e) {
    var elId = e.currentTarget.id;
    if (current.el.id !== elId) {
      $('.highlight').hide()
      $('#'+elId+' .highlight').show()
    }
  })
  $('.paper').on('mouseout', function(e) {
    var elId = e.currentTarget.id;
    $('#'+elId+' .highlight').hide()
  })
}

function resetSpeeds () {
  defaultSpeed = 700
  contact.setSpeed(defaultSpeed);
  projects.setSpeed(defaultSpeed);
  about.setSpeed(defaultSpeed);
}

function cycle (destination) {
  if (destination==current) return;

  $('.highlight').hide()
  var dest_i = sections.indexOf(destination)
  var curr_i = sections.indexOf(current)
  var diff = Math.abs(dest_i - curr_i)

  if (diff > 1) {   //need multiple animations
    cycle(sections[1])
    setTimeout( function() { cycle(destination) }, 850)
    return
  }

  direction = dest_i<curr_i ? 'right' : 'left'

  destination.accordion(0);

  //speed up the folding so it syncs with unfolding
  current.setSpeed(500)
         .accordion(foldNumber, direction, resetSpeeds);
  
  //put current on top so links are clickable
  $('.' + current.el.id).removeClass('toppy');
  current = destination;
  $('.' + current.el.id).addClass('toppy');
}
