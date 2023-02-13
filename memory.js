const container = document.getElementById('card');
const flippedCard = [];
const winCheck = [];
let score;
let xy; //xy = values for create at winningCheck
const players = [
  './images/bronny.png', 
  './images/davis.png', 
  './images/doncic.png', 
  './images/durant.png',
  './images/edwards.png',
  './images/giannis.png',
  './images/harden.png',
  './images/herro.png',
  './images/jokic.png',
  './images/lamelo.png',
  './images/lebron.png',
  './images/lonzo.png',
  './images/morant.png',
  './images/shaq.png',
  './images/steph.png',
  './images/tatum.png',
  './images/young.png',
  './images/zion.png',
  ];

function create(x)  
{
  xy = x;
  winCheck.length = 0;

  //clearing main div before creating new childelements inside it
  if(container.innerHTML !== '')
  {
    container.innerHTML = '' ;
    score = 0;
    document.getElementById('score').innerHTML = `Score: ${score}`;
    console.log(' ');
    
  }

  //based on the choosen level the displayformat will be changed
  if(x === 4)
  {
    document.getElementById('card').style.gridTemplateColumns = 'repeat(2, 1fr)';

    console.log('Lvl: ' + 1);
  }
  else if(x === 16)
  {
    document.getElementById('card').style.gridTemplateColumns = 'repeat(4, 1fr)';

    console.log('Lvl: ' + 2);
  }
  else if(x === 36)
  {
    document.getElementById('card').style.gridTemplateColumns = 'repeat(6, 1fr)';

    console.log('Lvl: ' + 3);
  }


  //generating a random number for the divs
  const saveRand = [];
  for(let i = 0; i < x/2; i++)
  {
    saveRand.push(i);
    saveRand.push(i);
  }
 
  //creating the div elements 
  for(let i = 0; i < x; i++)
  {
    
    //chooses random number for div and removes it later
    let assignNum = Math.floor(Math.random()* saveRand.length);

    let divv = document.createElement('div');

   //based on level selection the divv gets a specific css class so that the display is correct
    if(x === 4)
    {
      divv.className ='cards';
    }
    else if(x === 16)
    {
      divv.className ='cards2';
    }
    else if(x === 36)
    {
      divv.className ='cards3';
    }


   
    //assigning the id, and adding the element to the main div
    divv.id = saveRand[assignNum];
    winCheck.push(divv.id);
    console.log('ID: ' + divv.id);
    saveRand.splice(assignNum, 1);
    container.appendChild(divv);
    

    document.querySelectorAll('.cards').forEach(element => {
      element.addEventListener('click', flipping);    
    });

    document.querySelectorAll('.cards2').forEach(element => {
      element.addEventListener('click', flipping);    
    });

    document.querySelectorAll('.cards3').forEach(element => {
      element.addEventListener('click', flipping);    
    });
    
  }
}

//adding flip css, declaring a id to each element
function flipping()
{
  this.classList.add('flip');
  this.style.backgroundImage = `url('${players[this.id]}')`;
  flipped(this);
}

//adds a score, checks if the flipped cards are the same, wincheck checks if userhas won
//if true: removing Eventlistener, removing the ids from wincheck
//if false: flipping card back after showing it for 1,2 sec
function flipped(card)
{
  flippedCard.push(card);
  if(flippedCard.length === 2)
  {
    score = score + 1;
    document.getElementById('score').innerHTML = `Score: ${score*10}`;

    if(flippedCard[0].id === flippedCard[1].id)
    {
      console.log('Correct pair');
      flippedCard[0].removeEventListener('click', flipping);
      flippedCard[1].removeEventListener('click', flipping);
      winCheck.pop(flippedCard[0].id);
      winCheck.pop(flippedCard[1].id);
      flippedCard.length = 0;
    }
    else
    {
      console.log('Incorrect pair');
      window.setTimeout(clearCards, 1100);
    }

    window.setTimeout(winningCheck, 400);
  }
} 

//flips the cards back and removes the image
function clearCards()
{
  flippedCard[0].classList.toggle('flip');
  flippedCard[0].style.backgroundImage = 'url()';
  flippedCard[1].classList.toggle('flip');
  flippedCard[1].style.backgroundImage = 'url()';
  
  flippedCard.length = 0;

}

//if winCheck ==0 all cards are paired correctly and the user has finished the game
//after lettin the user know how many moves he needed the level he is at gets loaded again
//mean the user can play a new round if he wants to
function winningCheck()
{
  if(winCheck.length === 0)
    {
      alert(`You won with ${score} Moves!`);
      create(xy);
    }
    console.log('Wincheck '+ winCheck.length);
    
  
}




