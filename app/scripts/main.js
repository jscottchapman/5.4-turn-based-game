$(document).ready(function(){
  $('body').prepend(JST.application());
  $('.actionButton').prop('disabled', true);
});


/****************************************************
INSTANCES
****************************************************/

/**********
Player Instances
**********/

// (name, currentHealth, maxHealth, currentPower, startingPower)

var faith = new Player('Faith', 100, 100, 10, 10);
var joel = new Player('Joel', 120, 120, 8, 8);
var jake = new Player('Jake', 80, 80, 12, 12);

var findJake = document.getElementById("playerDisplayJake");
var findFaith = document.getElementById("playerDisplayFaith");
var findJoel = document.getElementById("playerDisplayJoel");

var findWuTangJake = document.getElementById("enemyDisplayWutangJake");
var findSedatedJake = document.getElementById("enemyDisplaySedatedJake");
var findPithyJake = document.getElementById("enemyDisplayPithyJake");

var actionImage = $('.actionPopup');
var heroBuff = $('.heroBuff');
var enemyBuff = $('.enemyBuff');

/**********
Enemy Instances
**********/

var wuTangJake = new Enemy({
  name: "Wu-Tang Jake",
  greeting: "May the Wu be with you.",
  brag: "Wu Tang Jake ain't nothing to mess with!",
  currentHealth: 90,
  maxHealth: 90,
  currentPower: 9,
  startingPower: 9,
});


var pithyJake = new Enemy({
  name: "Pithy Jake",
  greeting: "No judgements here",
  brag: "I told you to follow your heart...not lose your head!",
  currentHealth: 110,
  maxHealth: 110,
  currentPower: 7,
  startingPower: 7,
});

var sedatedJake = new Enemy({
  name: "Sedated Jake",
  greeting: "Sorry I'm late, I just woke up.  Prepare to die.",
  brag: "I can't believe I got out of bed for this.",
  currentHealth: 70,
  maxHealth: 70,
  currentPower: 12,
  startingPower: 12,
});


// Pick a Random enemy using a the damage value and a random number generator
//var enemy-array =[sedated-jake, pithy-jake, wu-tang-jake]

var pickEnemyArray = [wuTangJake, sedatedJake, pithyJake];

function selectWuTangJake () {
  findWuTangJake.style.display = "block";
  $("#greeting_brag_update").text(wuTangJake.greeting);
}

function selectSedatedJake () {
  findSedatedJake.style.display = "block";
  $("#greeting_brag_update").text(sedatedJake.greeting);
}

function selectPithyJake () {
  findPithyJake.style.display = "block";
  $("#greeting_brag_update").text(pithyJake.greeting);
}

function pickEnemy() {
  if (pickEnemyArray.length > 0) {
    var enemySelect = _.sample(pickEnemyArray);

    $('.enemyName').text(enemySelect.name);

    enemyHealthStatus(enemySelect);
    if (enemySelect === wuTangJake) {
      selectWuTangJake();
    }
    else if (enemySelect === sedatedJake) {
      selectSedatedJake();
    }
    else if (enemySelect === pithyJake) {
      selectPithyJake();
    }
    else {
      return true;
    }

    pickEnemyArray = _.filter(pickEnemyArray, function(object){
      return object !== enemySelect;
    });
    return enemySelect;
  } else {
    youWon();
  }
}

var hero;
var currentEnemy;


function youWon() {
  if(alert('YOU WON!!11!!11!!11')){}
  else window.location.reload();
}




/****************************************************
CONSTRUCTORS
****************************************************/

function Player(name, currentHealth, maxHealth, currentPower, startingPower) {
  this.name = name || "";
  this.currentHealth = currentHealth || 10;
  this.maxHealth = maxHealth || 10;
  this.currentPower = currentPower || 3;
  this.startingPower = startingPower || 3;
}

function Enemy(options){
  this.name = options.name;
  this.greeting = options.greeting;
  this.damage = options.damage;
  this.brag = options.brag;
  this.currentHealth = options.currentHealth;
  this.maxHealth = options.maxHealth;
  this.currentPower = options.currentPower;
  this.startingPower = options.startingPower;
}




/****************************************************
PROTOTYPES
****************************************************/


Player.prototype.punch = function(enemy){
  var attacker = this;
  var thisEnemy = enemy;
  actionImage.css({'background-image': 'url(./templates/assets/img/boom.png)', 'display': 'block'});
  $('#enemy_attack_update').text('');
  if (Math.random() > 1/4) {
    basicPunch(attacker, thisEnemy);
  } else {
    criticalPunch(attacker, thisEnemy);
  }
};

Player.prototype.kick = function(enemy){
  var attacker = this;
  var thisEnemy = enemy;
  actionImage.css({'background-image': 'url(./templates/assets/img/kapow.png)', 'display': 'block'});
  $('#enemy_attack_update').text('');
  if (Math.random() > 1/4) {
    basicKick(attacker, thisEnemy);
  } else {
    criticalKick(attacker, thisEnemy);
  }
};

Player.prototype.potion = function(enemy){
  var attacker = this;
  var thisEnemy = enemy;
  heroBuff.css({'background-image': 'url(./templates/assets/img/beer.png)', 'display': 'block'});
  $('#enemy_attack_update').text('');
  if (Math.random() > 1/4) {
    basicPotion(attacker, thisEnemy);
  } else {
    criticalPotion(attacker, thisEnemy);
  }
};

Player.prototype.increaseAttack = function(enemy){
  var attacker = this;
  var thisEnemy = enemy;
  heroBuff.css({'background-image': 'url(./templates/assets/img/attack.png)', 'display': 'block'});
  $('#enemy_attack_update').text('');
  if (Math.random() > 1/4) {
    basicIncreaseAttack(attacker, thisEnemy);
  } else {
    criticalIncreaseAttack(attacker, thisEnemy);
  }
};





/****************************************************
PLAYER ATTACK FUNCTIONS
****************************************************/
/****************************************************
PLAYER HEALTH DISPLAY FUNCTIONS
****************************************************/

function enemyHealthStatus(enemy){
$(".enemyHealthNumber").text(enemy.currentHealth).append(' <img src="./templates/assets/img/life_heart.png">');
}


/*********
Player attack functions - Punch
*********/

function basicPunch(attacker, enemy){
  var roundDamage = attacker.currentPower + Math.round((Math.random()) * (5 - 0));
  enemy.currentHealth = enemy.currentHealth - roundDamage;
  if (enemy.currentHealth < 0){
    enemy.currentHealth = 0;
  }
  enemyHealthStatus(enemy);
  $('#player_attack_update').text(attacker.name + ' punched ' + enemy.name + ' for ' + roundDamage + ' damage');
  enemyHealthCheck(attacker, enemy);
}

function criticalPunch(attacker, enemy){
  var roundDamage = attacker.currentPower + Math.round((Math.random()) * (7 - 5) + 5);
  enemy.currentHealth = enemy.currentHealth - roundDamage;
  if (enemy.currentHealth < 0){
    enemy.currentHealth = 0;
  }
  enemyHealthStatus(enemy);
  $('#player_attack_update').text('CCCCCCOMBO BREAKER!!! ' + attacker.name + ' punched ' + enemy.name + ' for '  + roundDamage + ' damage');
  enemyHealthCheck(attacker, enemy);
}

/*********
Player attack functions - Kick
*********/

function basicKick(attacker, enemy){
  var roundDamage = Math.round(attacker.currentPower * 1) + Math.round((Math.random()) * (10 + 5) - 5);
  enemy.currentHealth = enemy.currentHealth - roundDamage;
  if (enemy.currentHealth < 0){
    enemy.currentHealth = 0;
  }
  enemyHealthStatus(enemy);
  $('#player_attack_update').text(attacker.name + ' kicked ' + enemy.name + ' for ' + roundDamage + ' damage');
  enemyHealthCheck(attacker, enemy);
}

function criticalKick(attacker, enemy){
  var roundDamage = Math.round(attacker.currentPower * 1) + Math.round((Math.random()) * (12 - 10) + 10);
  enemy.currentHealth = enemy.currentHealth - roundDamage;
  if (enemy.currentHealth < 0){
    enemy.currentHealth = 0;
  }
  enemyHealthStatus(enemy);
  $('#player_attack_update').text('CCCCCCOMBO BREAKER!!! ' + attacker.name + ' kicked ' + enemy.name + ' for '  + roundDamage + ' damage');
  enemyHealthCheck(attacker, enemy);
}

/*********
Player attack functions - Potion
*********/

function basicPotion(attacker, enemy){
  attacker.currentHealth = attacker.currentHealth + 8;
  if (attacker.currentHealth > attacker.maxHealth) {
    attacker.currentHealth = attacker.maxHealth;
  }
  attackerHealthStatus(attacker);
  $('#player_attack_update').text(attacker.name + ' drank a beer and gained 8 health');
  enemyHealthCheck(attacker, enemy);
}

function criticalPotion(attacker, enemy){
  attacker.currentHealth = attacker.currentHealth + 12;
  attackerHealthStatus(attacker);
  $('#player_attack_update').text('CCCCCCOMBO BREAKER!!! ' + attacker.name + ' drank a beer and gained 12 health');
  enemyHealthCheck(attacker, enemy);
}

/*********
Player attack functions - Increase Attack
*********/

function basicIncreaseAttack(attacker, enemy){
  attacker.currentPower = attacker.currentPower + 2;
  $('#player_attack_update').text(attacker.name + '\'s attack increased');
  enemyHealthCheck(attacker, enemy);
}

function criticalIncreaseAttack(attacker, enemy){
  attacker.currentPower = attacker.currentPower + 4;
  $('#player_attack_update').text(attacker.name + '\'s attack increased');
  enemyHealthCheck(attacker, enemy);
}






/****************************************************
ENEMY ATTACK FUNCTIONS
****************************************************/

/***************************************************
Enemy Health Display function
***************************************************/
function attackerHealthStatus(attacker){
$(".playerHealthNumber").text(attacker.currentHealth).append(' <img src="./templates/assets/img/life_heart.png">');
}

/*********
Enemy attack functions - Randomizer
*********/

function enemyAttack(attacker, enemy){
  $('#greeting_brag_update').text(enemy.brag);
  var randomNumber = Math.random();
  if (randomNumber < 1/4 ) {
    enemyPunchRandomizer(attacker, enemy);
  } else if (randomNumber < 1/2) {
    enemyKickRandomizer(attacker, enemy);
  } else if (randomNumber < 3/4) {
    enemyPotionRandomizer(attacker, enemy);
  } else {
    enemyIncreaseAttackRandomizer(attacker, enemy);
  }
}

/*********
Enemy attack functions - Punch
*********/

function enemyPunchRandomizer(attacker, enemy){
  actionImage.css({'background-image': 'url(./templates/assets/img/zam.png)', 'display': 'block'});
  if (Math.random() > 1/4) {
    enemyBasicPunch(attacker, enemy);
  } else {
    enemyCriticalPunch(attacker, enemy);
  }
}

function enemyBasicPunch(attacker, enemy){
  var roundDamage = enemy.currentPower + Math.round((Math.random()) * (5 - 0));
  attacker.currentHealth = attacker.currentHealth - roundDamage;
  if (attacker.currentHealth < 0){
    attacker.currentHealth = 0;
  }
  attackerHealthStatus(attacker);
  $('#enemy_attack_update').text(enemy.name + ' punched ' + attacker.name + ' for ' + roundDamage + ' damage.');
  playerHealthCheck(attacker, enemy);
}

function enemyCriticalPunch(attacker, enemy){
  var roundDamage = enemy.currentPower + Math.round((Math.random()) * (7 - 5) + 5);
  attacker.currentHealth = attacker.currentHealth - roundDamage;
  if (attacker.currentHealth < 0){
    attacker.currentHealth = 0;
  }
  attackerHealthStatus(attacker);
  $('#enemy_attack_update').text('CCCCCCOMBO BREAKER!!! ' + enemy.name + ' punched ' + attacker.name + ' for '  + roundDamage + ' damage.');
  playerHealthCheck(attacker, enemy);
}

/*********
Enemy attack functions - Kick
*********/

function enemyKickRandomizer(attacker, enemy){
  actionImage.css({'background-image': 'url(./templates/assets/img/pow.png)', 'display': 'block'});
  if (Math.random() > 1/4) {
    enemyBasicKick(attacker, enemy);
  } else {
    enemyCriticalKick(attacker, enemy);
  }
}

function enemyBasicKick(attacker, enemy){
  var roundDamage = Math.round(enemy.currentPower * 1) + Math.round((Math.random()) * (10 + 5) - 5);
  attacker.currentHealth = attacker.currentHealth - roundDamage;
  if (attacker.currentHealth < 0){
    attacker.currentHealth = 0;
  }
  attackerHealthStatus(attacker);
  $('#enemy_attack_update').text(enemy.name + ' kicked ' + attacker.name + ' for ' + roundDamage + ' damage.');
  playerHealthCheck(attacker, enemy);
}

function enemyCriticalKick(attacker, enemy){
  var roundDamage = Math.round(enemy.currentPower * 1) + Math.round((Math.random()) * (12 - 10) + 10);
  attacker.currentHealth = attacker.currentHealth - roundDamage;
  if (attacker.currentHealth < 0){
    attacker.currentHealth = 0;
  }
  attackerHealthStatus(attacker);
  $('#enemy_attack_update').text('CCCCCCOMBO BREAKER!!! ' + enemy.name + ' kicked ' + attacker.name + ' for '  + roundDamage + ' damage.');
  playerHealthCheck(attacker, enemy);
}

/*********
Enemy attack functions - Potion
*********/

function enemyPotionRandomizer(attacker, enemy){
  enemyBuff.css({'background-image': 'url(./templates/assets/img/beer.png)', 'display': 'block'});
  if (Math.random() > 1/4) {
    enemyBasicPotion(attacker, enemy);
  } else {
    enemyCriticalPotion(attacker, enemy);
  }
}

function enemyBasicPotion(attacker, enemy){
  enemy.currentHealth = enemy.currentHealth + 8;
  if (enemy.currentHealth > enemy.maxHealth) {
    enemy.currentHealth = enemy.maxHealth;
  }
  enemyHealthStatus(enemy);
  $('#enemy_attack_update').text(enemy.name + ' drank a beer and gained 8 health');
  playerHealthCheck(attacker, enemy);
}

function enemyCriticalPotion(attacker, enemy){
  enemy.currentHealth = enemy.currentHealth + 12;
  enemyHealthStatus(enemy);
  $('#enemy_attack_update').text('CCCCCCOMBO BREAKER!!! ' + enemy.name + ' drank a beer and gained 12 health');
  playerHealthCheck(attacker, enemy);
}

/*********
Enemy attack functions - Increase Attack
*********/

function enemyIncreaseAttackRandomizer(attacker, enemy){
  enemyBuff.css({'background-image': 'url(./templates/assets/img/attack.png)', 'display': 'block'});
  if (Math.random() > 1/4) {
    enemyBasicIncreaseAttack(attacker, enemy);
  } else {
    enemyCriticalIncreaseAttack(attacker, enemy);
  }
}

function enemyBasicIncreaseAttack(attacker, enemy){
  enemy.currentPower = enemy.currentPower + 2;
  $('#enemy_attack_update').text(enemy.name + '\'s attack increased');
  playerHealthCheck(attacker, enemy);
}

function enemyCriticalIncreaseAttack(attacker, enemy){
  enemy.currentPower = enemy.currentPower + 4;
  $('#enemy_attack_update').text(enemy.name + '\'s attack increased');
  playerHealthCheck(attacker, enemy);
}






/****************************************************
HEALTH FUNCTIONS
****************************************************/


function enemyHealthCheck(attacker, enemy){
  if (enemy.currentHealth > 0) {
    setTimeout(function(){
      actionImage.css({'display': 'none'});
      heroBuff.css({'display': 'none'});
      enemyBuff.css({'display': 'none'});
    }, 750);
    setTimeout(function(){enemyAttack(attacker, enemy);}, 1000);
  } else {
    setTimeout(function(){
      actionImage.css({'display': 'none'});
      heroBuff.css({'display': 'none'});
      enemyBuff.css({'display': 'none'});
    }, 750);
    $('.enemyDisplay').fadeOut(3000, function(){});
    setTimeout(function(){(alert('Congratulations! You defeated ' + enemy.name));}, 750);
    attacker.currentHealth = attacker.maxHealth;
    attackerHealthStatus(attacker);
    setTimeout(function(){currentEnemy = pickEnemy();}, 2000);
  }
}

function playerHealthCheck(attacker, enemy){
  setTimeout(function(){
    actionImage.css({'display': 'none'});
    heroBuff.css({'display': 'none'});
    enemyBuff.css({'display': 'none'});
  }, 750);
  if (attacker.currentHealth <= 0) {
    if(alert('Game over!!')){}
    else window.location.reload();
    enemy.currentPower = enemy.startingPower;
  }
}





/****************************************************
RESPONSIVE INTERACTIONS
****************************************************/

/*********
Attack buttons
*********/

$('.punchButton').on('click', function(){
  hero.punch(currentEnemy);
});

$('.kickButton').on('click', function(){
  hero.kick(currentEnemy);
});

$('.potionButton').on('click', function(){
  hero.potion(currentEnemy);
});

$('.increaseAttackButton').on('click', function(){
  hero.increaseAttack(currentEnemy);
});

$('.actionButton').click(function(){
    $('.actionButton').prop('disabled', true);
    setTimeout(function(){
        $('.actionButton').prop('disabled', false);
    }, 1850);
});


/*********
Pop-up selector
*********/

$('#playerList').on('change', function() {
  value = $(this).val();
  if (value !== "0") {
    $('.pop_up_console_screen').fadeOut('slow', function(){});
    $('.pop_up_console').fadeOut('slow', function(){});
    $('.actionButton').prop('disabled', false);
    currentEnemy = pickEnemy();
    if (value === "selectJake") {
      heroJake(jake);
    } else if (value === "selectFaith"){
      heroFaith(faith);
    } else if (value === "selectJoel") {
      heroJoel(joel);
    } else {
      return "";
    }
  }
});

/*********
Hero assignment and visibility functions
*********/

function heroJake(thisHero){
  hero = jake;
  attackerHealthStatus(jake);
  findJake.style.display = "block";
  $('.playerName').text("Jake");
}

function heroFaith(thisHero){
  hero = faith;
  attackerHealthStatus(faith);
  findFaith.style.display = "block";
  $('.playerName').text("Faith");

}

function heroJoel(thisHero){
  hero = joel;
  attackerHealthStatus(joel);
  findJoel.style.display = "block";
  $('.playerName').text("Joel");
}
