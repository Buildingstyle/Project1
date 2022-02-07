//creating loop to loop through all the items on the list. Each item will attached to EListener
//build in function flip-card will execute every time card is clicked

const cards = document.querySelectorAll('.m-card');
let setflipCard = false;
let firstCard;
let secondCard;
let matchArray=[]

  function resetBoard() {
    [setflipCard] = [false];
    [firstCard, secondCard] = [null, null];
    const flipGame=document.querySelectorAll('.flip')
    for (i=0; i<flipGame.length;i++){
      flipGame[i].classList.remove('flip')
    }
      matchArray=[]
     shuffle()
     startGame() 
  }  

  function allMatch() {
    if (matchArray.length ===16){
      swal('Congratulation! Do you want to play again?',{
        dangerMode: true,
        buttons: true,
      }).then((result) => {
        if (result) {
          resetBoard()
        } else {
          Swal.fire('Buh Bye!')
          }
        
      })
    }
  }

  function flipCard(){
    this.classList.add('flip');
    if (!setflipCard) {
      setflipCard = true;
      firstCard = this;
    } else {
      setflipCard = false;
      secondCard = this;
    
    if (firstCard.dataset.match === secondCard.dataset.match) {
      matchArray.push(firstCard.dataset.match)
      matchArray.push(secondCard.dataset.match)
      firstCard.removeEventListener('click',flipCard);
      secondCard.removeEventListener('click',flipCard);
    
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        console.log(matchArray)
       },430);
      }
    }

  allMatch();
  }


  function noShuffle() {
    i = 0;
    cards.forEach(card => {
      let pos = i;
      card.style.order = randomPos;
      i++;
    });
  }

  function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  }


  cards.forEach(card => {
    card.addEventListener('click', flipCard);
  });


  const startGame=() => {
      let time_minutes = 1; // Value in minutes
      let time_seconds = 5; // Value in seconds

      let duration = time_minutes * 60 + time_seconds;

      element = document.querySelector('#count-down-timer');
      element.textContent = `${paddedFormat(time_minutes)}:${paddedFormat(time_seconds)}`;
      
      startCountDown(--duration, element);

  };


  function paddedFormat(num) {
      return num < 10 ? "0" + num : num; 
  }


  startCountDown =(duration, element)=> {

    let secondsRemaining = duration;
    let min = 0;
    let sec = 0;

    let countInterval = setInterval(function () {

        min = parseInt(secondsRemaining / 60);
        sec = parseInt(secondsRemaining % 60);

        element.textContent = `${paddedFormat(min)}:${paddedFormat(sec)}`;

        secondsRemaining = secondsRemaining - 1;
        if (matchArray.length ===16)
          clearInterval(countInterval)
        if (secondsRemaining < 0){
          clearInterval(countInterval)
          
                        
      swal("You Lost! Do you want to play again?",{
        dangerMode: true,
        buttons: true,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result) {
          resetBoard()
        } else {
          Swal.fire('Buh Bye!')
          }
        })
      }
    }, 1000);
  }

resetBoard()

