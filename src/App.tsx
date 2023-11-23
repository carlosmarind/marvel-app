import { Route, Routes } from 'react-router';
import { HeroesPreferidos } from './component/HeroesPreferidos';
import { SearchCharacter } from './component/SearchCharacter';
import { Link } from 'react-router-dom';

function App() {

  return (
    <>
      <p>Bienvenido!</p>
      <ul>
        <li><Link to='heroes'>Heroes</Link></li>
        <li><Link to='crud'>Crud</Link></li>
      </ul>

      <Routes>
        <Route path='heroes' element={<SearchCharacter />} />
        <Route path='crud' element={<HeroesPreferidos />} />
      </Routes>


    </>
  )
}

export default App
