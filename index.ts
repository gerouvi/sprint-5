const nextButton: HTMLElement | null = document.getElementById('button-next'); 
const cardText: HTMLElement | null = document.getElementById('card-text');

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
        const joke = await getJoke();
        printJoke(joke);
    });
}
