const nextButton: HTMLElement | null = document.getElementById('button-next'); 
const cardText: HTMLElement | null = document.getElementById('card-text');
const buttonScore: NodeList = document.querySelectorAll('.button-score');
const buttonNext = document.getElementById('button-next') as HTMLButtonElement;

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
})

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

const getJoke = async (): Promise<string> => {
  try {
    const data = await fetch('https://icanhazdadjoke.com/', {
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    });

    const json = await data.json();
    return json.joke;
  } catch (err:unknown) {
    throw new Error(err as string);
  }
};

if(nextButton){
    nextButton.addEventListener('click', async () => {
      if(cardText) cardText.textContent = 'Carregant...';
        const joke = await getJoke();
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


