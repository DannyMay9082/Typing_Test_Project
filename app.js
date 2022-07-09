import { words as list } from './words.js'

function getWord() {
    for (let i = 0; i < 150; i++) {
    
    let word = document.createElement('div');
    word.className = 'word';

    let tempWord = list[Math.floor(Math.random() * 1400)];
    tempWord = tempWord.split('');
    tempWord.push(' ');

    for (let i = 0; i < tempWord.length; i++) {
        let letters = document.createElement('span');
        letters.className = 'active';
        letters.append(tempWord[i]);
        word.appendChild(letters);
    }

     document.querySelector('.test').appendChild(word);
    }
}

getWord();


let testActive = document.querySelectorAll('.active'); 
let i = 0; 
let j = 0; 
let words = document.querySelectorAll('.word');
let sum = words[0].textContent.length; 
let correctWords = 0;
testActive[i].classList.add('caret')




function handleKey(e) {
    if(e.key === 'Tab'){
        startTest();
    }

    if (e.key === testActive[i].textContent) {

        testActive[i+1].classList.add('caret');
        testActive[i].className = 'passed';
        i++;
        
    }  else if (e.key !== ' ' && testActive[i].textContent != ' '){

        testActive[i].className = 'error';
        testActive[i+1].classList.add('caret');

        if(!timer) {
    timer = window.setInterval(function() {
            document.getElementById("timer").innerHTML = seconds;
             if (seconds > 0 ) {
                 seconds--;

             } else {

                clearInterval(timer);
                document.removeEventListener('keypress',handleKey);
                alert(`Your Typing speed is: ${correctWords*2}WPM`)

            };
    }, 1000);
  }


    }



    if  (e.key === ' ') {
        
        testActive[i].classList.remove('caret')        
        testActive[i+1].classList.remove('caret')

        let passedLetters = words[j].querySelectorAll('.passed'); 

        if (passedLetters.length !== words[j].textContent.length) { 

            words[j].classList.add('error');

        } else {

            words[j].classList.add('correct');
            correctWords++;

        }

        if(i >= 70) {

            let passed = document.querySelectorAll('.correct, .error')
           
            passed.forEach( object => {

                object.remove();
            
            })
            
            i=0;
            j=0;
            words = document.querySelectorAll('.word');
            testActive = document.querySelectorAll('.active');
            sum = words[0].textContent.length;
            
        } else {

            i = sum;
            sum += words[j + 1].textContent.length;
            j++;
        
        }        

        testActive[i].classList.add('caret');
        
    }
    
    if(!timer) {
        timer = window.setInterval(function() {
                document.getElementById("timer").innerHTML = seconds;
                 if (seconds > 0 ) {
                     seconds--;
    
                 } else {
    
                    clearInterval(timer);
                    document.removeEventListener('keypress',handleKey);
                    alert(`Your Typing speed is: ${correctWords*2}WPM`)
    
                };
        }, 1000);
      }

}

document.addEventListener('keypress', handleKey);

let seconds=29;
let timer;


function startTest() {

    document.querySelector('.test').replaceChildren();
    getWord();
    

    i = 0; 
    j = 0; 
    seconds=30;
    correctWords = 0;

    testActive = document.querySelectorAll('.active'); 
    words = document.querySelectorAll('.word');
    sum = words[0].textContent.length; 
    testActive[i].classList.add('caret')
    

    document.addEventListener('keypress', handleKey);
}

document.querySelector('.button--restart').onclick = startTest;




