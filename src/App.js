import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/navbar';
import Navbarl from './components/Navbar/Navbarl';
import React from 'react';
import Searchbar from './components/SearchBar/SearchBar';
import Pokedex from './components/pokedex/Pokedex';
import { getPokemonData, getPokemons, searchPokemon } from './api';
import { FavoriteProvider } from './Contexts/favoritesContext';
import {db,auth} from './firebaseconnection'
import { onAuthStateChanged } from 'firebase/auth'
const favoritesKey = "f"
function App() {
  const [user, setUser] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalpage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userDetail, setUserDetail] = useState({})
  const itensPerPage = 50
  const fetchPokemons = async () => {
    try {
      setLoading(true)
      setNotFound(false)
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotalpage(Math.ceil(data.count / itensPerPage))
    } catch (error) {
      console.log("fetchPokemons error: ", error)
    }
  }
  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }
  useEffect(() => {
    loadFavoritePokemons()

  }, [])
  useEffect(() => {

    fetchPokemons();

  }, [page])
  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if(favoriteIndex >= 0){
      updatedFavorites.splice(favoriteIndex, 1);
    }else{
      updatedFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites))
    setFavorites(updatedFavorites)
  }
  const onSearchHandler = async (pokemon) => {
    if(!pokemon){
      return fetchPokemons();
    }
    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemon)
    if(!result){
      
      setNotFound(true)
    }else{
      setPokemons([result])
      setPage(0)
      setTotalpage(1)
    }
    setLoading(false)
  }
  useEffect(() => {
    async function checkLogin(){
      onAuthStateChanged(auth, (user) => {
        if(user){
          // se tem usuario logado ele entra aqui...
          console.log(user);
          setUser(true);
          setUserDetail({
            uid: user.uid,
            email: user.email
          })

        }else{
          // nao possui nenhum user logado.
          setUser(false);
          setUserDetail({})
        }
      })
    }
    checkLogin()
  }, [])
  return (
    <FavoriteProvider 
    value={{
      favoritePokemons: favorites,
       updateFavoritePokemons: updateFavoritePokemons, }}>

    
    <div>
      {user ? (
       <Navbarl/>
      ):
       <Navbar/>
      }
      
      <Searchbar onSearch={onSearchHandler}/>
      {notFound ? (
        <div className='notfound'> Pokemon não encontrado </div>
      ) :
      (<Pokedex pokemons={pokemons} loading={loading} page={page} setPage={setPage} totalPages={totalPages}/>
      )}
      </div>
    </FavoriteProvider>
  );
}

export default App;
