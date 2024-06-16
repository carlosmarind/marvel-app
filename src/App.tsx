import { Route, Routes } from 'react-router';
import { HeroesPreferidos } from './component/HeroesPreferidos';
import { SearchCharacter } from './component/SearchCharacter';
import { Link } from 'react-router-dom';
import { Login } from './component/Login';
import { Home } from './component/Home';
import { Callback } from './component/Callback';
import { LoginJWT } from './component/LoginJWT';
import { Hello } from './component/Hello';

function App() {

  return (
    <>
      <p>Bienvenido!</p>
      <ul>
        <li><Link to='login-jwt'>Login</Link></li>
        <li><Link to='/*'>Home</Link></li>
        <li><Link to='heroes'>Heroes</Link></li>
        <li><Link to='crud'>Crud</Link></li>
        <li><Link to='hello'>Hello</Link></li>
      </ul>

      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='heroes' element={

          <SearchCharacter />

        } />
        <Route path='crud' element={<HeroesPreferidos />} />
        <Route path='login' element={<Login />} />
        <Route path='login-jwt' element={<LoginJWT />} />
        <Route path='callback' element={<Callback />} />
        <Route path='hello' element={<Hello />} />
      </Routes>


    </>
  )
}

export default App
