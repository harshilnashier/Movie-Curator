import './App.css';
import NavBar from './components/NavBar';
import Banner from './components/Banner'
import Movies from './components/Movies';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Favourites from './components/Favourites';
import PageNoteFound from './components/PageNoteFound';
function App() {
  return (
    < >
      <div className="bg-gradient-to-b from-gray-500  to-red-40>">
      <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={
          <>
            <Banner></Banner>
            <Movies></Movies>
          </>
        }></Route>
        <Route path='favourites' element={
          <>
            <Favourites></Favourites>
          </>
        }></Route>
        <Route path="*" element={
          <>
            <PageNoteFound></PageNoteFound>
          </>
        }></Route>
      </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
