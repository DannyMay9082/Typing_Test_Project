import { words as list } from './words.js'

//başlanğıc üçün müəyyən miqdarda sözü html faylına at.
for (let i = 0; i < 30; i++) {
    getWord();
}

function getWord() {
    let word = document.createElement('div')
    word.className = 'word'

    //listdən sözü götürüb hərflərin elementlər olduğu array-ə çevir
    let tempWord = list[Math.floor(Math.random() * 1400)]
    tempWord = tempWord.split('');
    tempWord.push(' ');

    //array-i  word div-inə əlavə elə faylına əlavə elə.
    for (let i = 0; i < tempWord.length; i++) {
        let letters = document.createElement('span');
        letters.className = 'active';
        letters.append(tempWord[i]);
        word.appendChild(letters);
    }

    //word div-ini html faylına əlavə elə, hərflərin element olduğu array-i return elə.
    document.querySelector('.test').appendChild(word)
}

let test = document.querySelectorAll('.active'); //testdə üzərində əməliyyat aparılmamış bütün hərflər və boşluqlar
let i = 0; //kursorun mətn indeksi
let j = 0; //kursorun söz indeksi
let words = document.querySelectorAll('.word')
let sum = words[0].textContent.length; //test-də istifadə olunan hər sözün uzunluğu

function handleKey(e) {
    if (e.key === test[i].textContent) {

        //əgər doğru hərf basılıbsa hərfi yaşıl elə.
        test[i].className = 'passed';
        i++;

    }  else if (e.key !== ' '){
        //əgər yanlış hərf-ə basılıb və boşluğa basılmıyıbsa hərfi qırmızı elə
        test[i].className = 'incorrect';

    }

    
    if  (e.key === ' ') {
        //əgər boşluğa basılıb və testin sonundayıqsa eventListener-i dayandır.
        if (sum === test.length) {
            document.removeEventListener('keypress', handleKey);
        }

        let passedLetters = words[j].querySelectorAll('.passed') //kursorun içində olduğu sözdəki doğru basılmış hərflər

        // əgər sözdəki bütün hərflər doğru basılmayıb və növbəti sözə keçilibsə (space basılıbsa) bütün  
        // hərfləri qırmızı elə
        if (passedLetters.length !== words[j].textContent.length) { 
            words[j].classList.add('error')
        }

        //əgər növbəti söz varsa, kursoru növbəti sözün 0-cı indeksinə apar
        i = sum;
        sum += words[j + 1].textContent.length;
        j++;
    }   
}

document.addEventListener('keypress', handleKey)
