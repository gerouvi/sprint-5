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
        const joke = yield getJoke();
        printJoke(joke);
    }));
}
