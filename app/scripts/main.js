$(document).ready(function(){
  $('body').prepend(JST.application());
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


function pickEnemy() {
  if (pickEnemyArray.length > 0) {
    var enemySelect = _.sample(pickEnemyArray);
    // display enemySelect
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
  alert('YOU WON!!11!!11!!11');
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
  if (Math.random() > 1/4) {
    basicPunch(attacker, thisEnemy);
  } else {
    criticalPunch(attacker, thisEnemy);
  }
};

Player.prototype.kick = function(enemy){
  var attacker = this;
  var thisEnemy = enemy;
  if (Math.random() > 1/4) {
    basicKick(attacker, thisEnemy);
  } else {
    criticalKick(attacker, thisEnemy);
  }
};

Player.prototype.potion = function(enemy){
  var attacker = this;
  var thisEnemy = enemy;
  if (Math.random() > 1/4) {
    basicPotion(attacker, thisEnemy);
  } else {
    criticalPotion(attacker, thisEnemy);
  }
};

Player.prototype.increaseAttack = function(enemy){
  var attacker = this;
  var thisEnemy = enemy;
  if (Math.random() > 1/4) {
    basicIncreaseAttack(attacker, thisEnemy);
  } else {
    criticalIncreaseAttack(attacker, thisEnemy);
  }
};





/****************************************************
PLAYER ATTACK FUNCTIONS
****************************************************/


/*********
Player attack functions - Punch
*********/

function basicPunch(attacker, enemy){
  var roundDamage = attacker.currentPower + Math.round((Math.random()) * (5 - 0));
  enemy.currentHealth = enemy.currentHealth - roundDamage;
  console.log(attacker.name + ' hit ' + enemy.name + ' for ' + roundDamage + ' damage. ' + enemy.name + ' has ' + enemy.currentHealth + ' health remaining.');
  enemyHealthCheck(attacker, enemy);
}

function criticalPunch(attacker, enemy){
  var roundDamage = attacker.currentPower + Math.round((Math.random()) * (7 - 5) + 5);
  enemy.currentHealth = enemy.currentHealth - roundDamage;
  console.log('CCCCCCOMBO BREAKER!!! ' + attacker.name + ' hit ' + enemy.name + ' for '  + roundDamage + ' damage. ' + enemy.name + ' has ' + enemy.currentHealth + ' health remaining.');
  enemyHealthCheck(attacker, enemy);
}

/*********
Player attack functions - Kick
*********/

function basicKick(attacker, enemy){
  var roundDamage = Math.round(attacker.currentPower * 1) + Math.round((Math.random()) * (10 + 5) - 5);
  enemy.currentHealth = enemy.currentHealth - roundDamage;
  console.log(attacker.name + ' hit ' + enemy.name + ' for ' + roundDamage + ' damage. ' + enemy.name + ' has ' + enemy.currentHealth + ' health remaining.');
  enemyHealthCheck(attacker, enemy);
}

function criticalKick(attacker, enemy){
  var roundDamage = Math.round(attacker.currentPower * 1) + Math.round((Math.random()) * (12 - 10) + 10);
  enemy.currentHealth = enemy.currentHealth - roundDamage;
  console.log('CCCCCCOMBO BREAKER!!! ' + attacker.name + ' hit ' + enemy.name + ' for '  + roundDamage + ' damage. ' + enemy.name + ' has ' + enemy.currentHealth + ' health remaining.');
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
  console.log(attacker.name + ' gained 8 health and now has ' + attacker.currentHealth + ' health remaining');
  enemyHealthCheck(attacker, enemy);
}

function criticalPotion(attacker, enemy){
  attacker.currentHealth = attacker.currentHealth + 12;
  console.log('CCCCCCOMBO BREAKER!!! ' + attacker.name + ' gained 12 health and now has ' + attacker.currentHealth + ' health remaining');
  enemyHealthCheck(attacker, enemy);
}

/*********
Player attack functions - Increase Attack
*********/

function basicIncreaseAttack(attacker, enemy){
  attacker.currentPower = attacker.currentPower + 2;
  console.log(attacker.name + '\'s attack increased');
  enemyHealthCheck(attacker, enemy);
}

function criticalIncreaseAttack(attacker, enemy){
  attacker.currentPower = attacker.currentPower + 4;
  console.log(attacker.name + '\'s attack increased');
  enemyHealthCheck(attacker, enemy);
}





/****************************************************
ENEMY ATTACK FUNCTIONS
****************************************************/


/*********
Enemy attack functions - Randomizer
*********/

function enemyAttack(attacker, enemy){
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
  if (Math.random() > 1/4) {
    enemyBasicPunch(attacker, enemy);
  } else {
    enemyCriticalPunch(attacker, enemy);
  }
}

function enemyBasicPunch(attacker, enemy){
  var roundDamage = enemy.currentPower + Math.round((Math.random()) * (5 - 0));
  attacker.currentHealth = attacker.currentHealth - roundDamage;
  console.log(enemy.name + ' hit ' + attacker.name + ' for ' + roundDamage + ' damage. ' + attacker.name + ' has ' + attacker.currentHealth + ' health remaining.');
  playerHealthCheck(attacker, enemy);
}

function enemyCriticalPunch(attacker, enemy){
  var roundDamage = enemy.currentPower + Math.round((Math.random()) * (7 - 5) + 5);
  attacker.currentHealth = attacker.currentHealth - roundDamage;
  console.log('CCCCCCOMBO BREAKER!!! ' + enemy.name + ' hit ' + attacker.name + ' for '  + roundDamage + ' damage. ' + attacker.name + ' has ' + attacker.currentHealth + ' health remaining.');
  playerHealthCheck(attacker, enemy);
}

/*********
Enemy attack functions - Kick
*********/

function enemyKickRandomizer(attacker, enemy){
  if (Math.random() > 1/4) {
    enemyBasicKick(attacker, enemy);
  } else {
    enemyCriticalKick(attacker, enemy);
  }
}

function enemyBasicKick(attacker, enemy){
  var roundDamage = Math.round(enemy.currentPower * 1) + Math.round((Math.random()) * (10 + 5) - 5);
  attacker.currentHealth = attacker.currentHealth - roundDamage;
  console.log(enemy.name + ' hit ' + attacker.name + ' for ' + roundDamage + ' damage. ' + attacker.name + ' has ' + attacker.currentHealth + ' health remaining.');
  playerHealthCheck(attacker, enemy);
}

function enemyCriticalKick(attacker, enemy){
  var roundDamage = Math.round(enemy.currentPower * 1) + Math.round((Math.random()) * (12 - 10) + 10);
  attacker.currentHealth = attacker.currentHealth - roundDamage;
  console.log('CCCCCCOMBO BREAKER!!! ' + enemy.name + ' hit ' + attacker.name + ' for '  + roundDamage + ' damage. ' + attacker.name + ' has ' + attacker.currentHealth + ' health remaining.');
  playerHealthCheck(attacker, enemy);
}

/*********
Enemy attack functions - Potion
*********/

function enemyPotionRandomizer(attacker, enemy){
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
  console.log(enemy.name + ' gained 8 health and now has ' + enemy.currentHealth + ' health remaining');
  playerHealthCheck(attacker, enemy);
}

function enemyCriticalPotion(attacker, enemy){
  enemy.currentHealth = enemy.currentHealth + 12;
  console.log('CCCCCCOMBO BREAKER!!! ' + enemy.name + ' gained 12 health and now has ' + enemy.currentHealth + ' health remaining');
  playerHealthCheck(attacker, enemy);
}

/*********
Enemy attack functions - Increase Attack
*********/

function enemyIncreaseAttackRandomizer(attacker, enemy){
  if (Math.random() > 1/4) {
    enemyBasicIncreaseAttack(attacker, enemy);
  } else {
    enemyCriticalIncreaseAttack(attacker, enemy);
  }
}

function enemyBasicIncreaseAttack(attacker, enemy){
  enemy.currentPower = enemy.currentPower + 2;
  console.log(enemy.name + '\'s attack increased');
  playerHealthCheck(attacker, enemy);
}

function enemyCriticalIncreaseAttack(attacker, enemy){
  enemy.currentPower = enemy.currentPower + 4;
  console.log(enemy.name + '\'s attack increased');
  playerHealthCheck(attacker, enemy);
}






/****************************************************
HEALTH FUNCTIONS
****************************************************/


function enemyHealthCheck(attacker, enemy){
  if (enemy.currentHealth > 0) {
    setTimeout(function(){enemyAttack(attacker, enemy);}, 1000);
  } else {
    console.log('Congratulations! You defeated ' + enemy.name);
    attacker.currentHealth = attacker.maxHealth;
    currentEnemy = pickEnemy();
  }
}

function playerHealthCheck(attacker, enemy){
  if (attacker.currentHealth < 0) {
    console.log('Game over!!');
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
    }, 3000);
});


/*********
Pop-up selector
*********/

$('#players').on('change', function() {
  value = $(this).val();
  if (value !== "") {
    $('.pop_up_console').fadeOut('slow', function(){
    });
    currentEnemy = pickEnemy();
    if (value === "Jake") {
      heroJake(jake);
    } else if (value === "Faith"){
      heroFaith(faith);
    } else if (value === "Joel") {
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
}

function heroFaith(thisHero){
  hero = faith;
}

function heroJoel(thisHero){
  hero = joel;
}
