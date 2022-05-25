"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const nextButton = document.getElementById('button-next');
const cardText = document.getElementById('card-text');
const buttonScore = document.querySelectorAll('.button-score');
const buttonNext = document.getElementById('button-next');
const weatherTemp = document.getElementById('weather-temp') || document.createElement('div');
const arrayJokes = [];
window.addEventListener('load', () => {
    buttonScore.forEach(el => {
        const button = el;
        button.disabled = true;
    });
    fetch(' https://api.openweathermap.org/data/2.5/weather?lat=41.38879&lon=2.15899&appid=63459ac7ea5ddae1b017926635ec846f')
        .then((res) => res.json())
        .then((data) => weatherTemp.textContent = data.weather[0].description)
        .catch(err => weatherTemp.textContent = 'Error en el fetch');
});
const toggleButtons = () => {
    buttonScore.forEach((el) => {
        const button = el;
        if (button.disabled)
            button.disabled = false;
        else
            button.disabled = true;
    });
    if (buttonNext.disabled)
        buttonNext.disabled = false;
    else
        buttonNext.disabled = true;
};
const printJoke = (joke) => {
    if (cardText) {
        cardText.textContent = joke;
    }
};
const getJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const json = yield data.json();
        return json.joke;
    }
    catch (err) {
        throw new Error(err);
    }
});
if (nextButton) {
    nextButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        if (cardText)
            cardText.textContent = 'Carregant...';
        const joke = yield getJoke();
        printJoke(joke);
        toggleButtons();
    }));
}
buttonScore.forEach((el) => {
    el.addEventListener('click', (e) => {
        const target = e.target;
        const d = new Date();
        let text = d.toISOString();
        const obj = {
            joke: (cardText === null || cardText === void 0 ? void 0 : cardText.textContent) || '',
            score: Number(target.dataset.score),
            date: text,
        };
        arrayJokes.push(obj);
        console.log(arrayJokes);
        toggleButtons();
    });
});
