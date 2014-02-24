var projects, about, contact, current, foldNumber, foldArray, counter, d, destination, i, defaultSpeed, p_clone, c_clone, a_clone;

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

  foldArray = [projects, about, contact];
  current = about; //we are starting on the middle panel... use this var to keep track...

  //set up initial focus
  contact.setSpeed(0).accordion(foldNumber, 'right', resetSpeeds);
  projects.setSpeed(0).accordion(foldNumber, 'left')

  setNavTriggers();
  setHoverEvents();

  $('.cover').on('mouseover', function() {$('.cover').show()})
});

function setNavTriggers() {
  console.log('set nav triggers');

  //click folded divs to cyle to them
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

    i = foldArray.indexOf(current)
    if (e.keyCode == 37 && i!==0 ) { //left arrow
      cycle(foldArray[i-1]);
    } else if (e.keyCode == 39 && i !== 2) { //right arrow
      cycle(foldArray[i+1]);
    }
  })
};

function setHoverEvents () {
  $('.paper').on('mouseover', function(e) {
    var elId = e.currentTarget.id;
    if (current.el.id !== elId) {
      $('.cover').hide()
      $('#'+elId+' .cover').show()
    }
  })
  $('.paper').on('mouseout', function(e) {
    var elId = e.currentTarget.id;
    $('#'+elId+' .cover').hide()
  })
}

function resetSpeeds () {
  defaultSpeed = 700
  contact.setSpeed(defaultSpeed);
  projects.setSpeed(defaultSpeed);
  about.setSpeed(defaultSpeed);
}

function cycle (destination) {
  $('.cover').hide()

  if (Math.abs(foldArray.indexOf(destination) - foldArray.indexOf(current)) >1 ) {   //need multiple animations
    cycle(foldArray[1])
    setTimeout( function() { cycle(destination) }, 850)
    return
  }

  if (destination==current) {
    console.log('DOING NOTHING');
    return;
  }

  if (foldArray.indexOf(destination) < foldArray.indexOf(current)) {
    direction = "right";
  } else {
    direction = "left";
  }

  destination.accordion(0);

  current.setSpeed(500).accordion(foldNumber, direction, resetSpeeds); //speed up the folding so it syncs with unfolding
  //set the current sections z-index so links work!

  $('.' + current.el.id).removeClass('toppy');
  current = destination;
  $('.' + current.el.id).addClass('toppy');

}
