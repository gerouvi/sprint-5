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
const weatherCity = document.getElementById('weather-city');
const weatherIcon = document.getElementById('weather-icon');
const arrayJokes = [];
window.addEventListener('load', () => {
    buttonScore.forEach(el => {
        const button = el;
        button.disabled = true;
    });
    fetch(' https://api.openweathermap.org/data/2.5/weather?lat=41.38879&lon=2.15899&appid=63459ac7ea5ddae1b017926635ec846f')
        .then((res) => res.json())
        .then((data) => {
        if (weatherCity)
            weatherCity.textContent = data.name;
        const iconCode = data.weather[0].icon;
        weatherTemp.textContent = `${data.main.temp.toFixed() / 10}ºC`;
        fetch('http://openweathermap.org/img/w/' + iconCode + '.png')
            .then((res) => res.blob())
            .then((img) => {
            if (weatherIcon) {
                weatherIcon.src = URL.createObjectURL(img);
            }
        }).catch(err => weatherTemp.textContent = 'Error en el fetch');
    }).catch(err => weatherTemp.textContent = 'Error en el fetch');
});
const changeBg = () => {
    const number = Math.floor(Math.random() * 5 + 1);
    document.documentElement.style.setProperty('--url', `url('svg${number}.svg')`);
};
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
const getJoke = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const json = yield data.json();
        return json.joke || json.value;
    }
    catch (err) {
        throw new Error(err);
    }
});
if (nextButton) {
    nextButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        if (cardText)
            cardText.textContent = 'Carregant...';
        let url = 'https://api.chucknorris.io/jokes/random';
        if (Math.random() < 0.5)
            url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,explicit&type=single';
        const joke = yield getJoke(url);
        changeBg();
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
