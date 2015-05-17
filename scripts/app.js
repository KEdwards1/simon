window.addEventListener('load', function(){
var computerPattern = [];
var bank = ['red', 'yellow', 'green', 'blue'];
var playerPattern = [];
//this function converts the player move array and computer pattern array 
//to strings and checks to see if they match. Continues the game upon match, ends upon mismatch.
var checkCorrect = function() {
    if (playerPattern.toString() === computerPattern.toString()) {
      playerPattern = [];
      $('#messages').text('You matched the pattern correctly! Good job!');
      window.setTimeout(showComputerPattern, 1500);
    } else {
      computerPattern = [];
      playerPattern = [];
      $('#messages').text('You did not enter the pattern correctly. Game over!');
      $('#start').text('Restart')
      $('#start').show()
    }
  }
  //Grabs the player's move by running an event listener on all color tiles
  //until the appropriate number of clicks is recorded. At the end checkCorrect 
  //is invoked to check if the player's entry was correct.
var getPlayerPattern = function() {
    var clicks = 0;
    var intervalID = window.setInterval(function() {
      $('.tile').off().on('mouseup', function() {
        selectedTile(event.target.id);
        playerPattern.push(event.target.id);
        clicks += 1
      })
      if (clicks >= computerPattern.length) {
        clearInterval(intervalID);
        $('.tile').off()
        checkCorrect()
      }
    }, (200))
  }
  //Toggle the selected class on and off in order to present an animation of the color tile being lit
var selectedTile = function(color) {
    window.setTimeout(function() {
      $('#' + color).addClass('selected')
      document.querySelector('#'+color+'-sound').load()
      document.querySelector('#'+color+'-sound').play()
      window.setTimeout(function() {
        $('#' + color).removeClass('selected')
      }, 200)
    }, 200)
  }
  //This function generates a pattern by randomly selecting a color from the color bank array
  //At the end getPlayerPattern is invoked to get user input.
var showComputerPattern = function() {
  $('#messages').text('');
  $('#start').hide();
  random = bank[Math.floor((Math.random() * 4))]
  computerPattern.push(random)
  var count = 0;
  var intervalID = window.setInterval(function() {
    selectedTile(computerPattern[count])
    count += 1
    if (count >= computerPattern.length) {
      clearInterval(intervalID)
    }
  }, 300)
  getPlayerPattern()
}


$('#start').on('click', showComputerPattern)

})