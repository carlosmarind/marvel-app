import { publicKey } from './api'

function App() {

  fetch(`https://gateway.marvel.com//v1/public/characters?name=hulk&apikey=${publicKey}`, {
    method: 'GET',
  }).then(response => {

    if (response.ok) {
      return response.json() as Promise<CharacterDataWrapper>;
    } else {
      throw new Error('La solicitud no se pudo completar');
    }


  }).then(json => {
    console.log(json);
  }).catch(error => {

    console.log(error);

  })


  return (
    <>

    </>
  )
}

export default App
