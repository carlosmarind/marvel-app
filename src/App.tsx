import { Route, Routes } from 'react-router';
import { HeroesPreferidos } from './component/HeroesPreferidos';
import { SearchCharacter } from './component/SearchCharacter';
import { Link } from 'react-router-dom';
import { Login } from './component/Login';
import { Home } from './component/Home';
import { ProtectedComponent } from './component/ProtectedRoute';
import { NotFound } from './component/NotFound';
import { Callback } from './component/Callback';

function App() {

  return (
    <>
      <p>Bienvenido!</p>
      <ul>
        <li><Link to='login'>Login</Link></li>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='heroes'>Heroes</Link></li>
        <li><Link to='crud'>Crud</Link></li>
      </ul>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='heroes' element={
          <ProtectedComponent allowedRoles={["admin"]} >
            <SearchCharacter />
          </ProtectedComponent>
        } />
        <Route path='crud' element={<HeroesPreferidos />} />
        <Route path='login' element={<Login />} />
        <Route path='callback' element={<Callback />} />
        <Route path='*' element={<NotFound />} />
      </Routes>


    </>
  )
}

export default App
