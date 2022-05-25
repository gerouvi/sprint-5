const nextButton: HTMLElement | null = document.getElementById('button-next'); 
const cardText: HTMLElement | null = document.getElementById('card-text');
const buttonScore: NodeList = document.querySelectorAll('.button-score');
const buttonNext = document.getElementById('button-next') as HTMLButtonElement;
const weatherTemp = document.getElementById('weather-temp') || document.createElement('div');
const weatherCity = document.getElementById('weather-city')
const weatherIcon: HTMLImageElement | null  = document.getElementById('weather-icon') as HTMLImageElement

type Joke = {
    joke: string,
    date: string,
    score: number
}

const arrayJokes:Joke[] = [];

window.addEventListener('load', () => {
  buttonScore.forEach(el =>  {
    const button = el as HTMLButtonElement
    button.disabled = true
  })

fetch(
  ' https://api.openweathermap.org/data/2.5/weather?lat=41.38879&lon=2.15899&appid=63459ac7ea5ddae1b017926635ec846f'
)
  .then((res) => res.json())
  .then((data) => {
    if(weatherCity) weatherCity.textContent = data.name
  
    const iconCode = data.weather[0].icon;

   weatherTemp.textContent = `${
      data.main.temp.toFixed() / 10
    }ºC`;
    fetch('http://openweathermap.org/img/w/' + iconCode + '.png')
      .then((res) => res.blob())
      .then(
        (img) =>{
          if(weatherIcon){
             weatherIcon.src = URL.createObjectURL(img)
          }
        }  
      ).catch(err =>  weatherTemp.textContent = 'Error en el fetch')
  }).catch(err =>  weatherTemp.textContent = 'Error en el fetch')
})

const changeBg = () => {
  const number = Math.floor(Math.random() * 5 + 1);
  document.documentElement.style.setProperty(
    '--url',
    `url('svg${number}.svg')`
  );
};
 

const toggleButtons = () => {
  buttonScore.forEach((el:Node): void => {
      const button = el as HTMLButtonElement
     if (button.disabled) button.disabled = false;
     else button.disabled = true
  });
  if (buttonNext.disabled) buttonNext.disabled = false;
  else buttonNext.disabled = true;
};

const printJoke = (joke: string): void => {
 if(cardText){
      cardText.textContent = joke;
 }
};

const getJoke = async (url: string): Promise<string> => {
  try {
    const data = await fetch(url, {
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    });

    const json = await data.json();
    return json.joke || json.value;
  } catch (err:unknown) {
    throw new Error(err as string);
  }
};

if(nextButton){
  
    nextButton.addEventListener('click', async () => {
      if(cardText) cardText.textContent = 'Carregant...';

      let url = 'https://api.chucknorris.io/jokes/random'

      if (Math.random() < 0.5) url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,explicit&type=single'

      const joke = await getJoke(url);
      changeBg()
      printJoke(joke);
      toggleButtons()

       
    });
}

buttonScore.forEach((el) => {
  el.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    const d = new Date();
    let text = d.toISOString();
    const obj: Joke = {
      joke: cardText?.textContent || '',
      score: Number(target.dataset.score),
      date: text,
    };
    arrayJokes.push(obj);
    console.log(arrayJokes);
    toggleButtons();
  });
});


