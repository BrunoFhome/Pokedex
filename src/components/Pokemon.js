import React,{useState, useContext} from "react";
import "./Pokemon.css"
import FavoriteContext from "../Contexts/favoritesContext";
import Add from "../Contexts/Add";
import { AddContext } from "../Contexts/Add";
import {db} from '../firebaseconnection';
import { 
    collection, 
    addDoc, 
} from 'firebase/firestore'
const Pokemon = (props) => {
    const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext)
    const {pokemon} = props
    const [poke,setPoke] = useState('')
    const onHeartClick = () => {
        updateFavoritePokemons(pokemon.name)
    }
    const heart = favoritePokemons.includes(pokemon.name) ? "❤" : "🤍";
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
        setNewPoke(pokemon.name)
    }
    const [newPoke, setNewPoke] = useState ("")
  
    
    const addPoke = async () => {
        
      await addDoc(favpokeCollectionRef, {name: newPoke});
    }
  
  
    const [favpoke, setFavpoke] = useState([]);
  
    const favpokeCollectionRef = collection(db, "favpoke");

    return (
        
        <div className="cartapokemon" >
                <div>
            {modal &&(
                <div className='popup'>
                <div className='overlay'></div>
                <div className='popup-inner'>
                            <div className="pokeimg">
                                <img alt={pokemon.name} src={pokemon.sprites.front_default}></img>
                            </div>
                            <div className="corpocarta">
                                <div className="topodacarta">
                                    <h3>{pokemon.name}</h3>
                                    <div>#{pokemon.id}</div>
                                    
                                </div>
                                <div className="rodapedacarta">
                                    <div className="pokemontipo">
                                        {pokemon.types.map((type, index) => {
                                            return (
                                                <div key={index} className="pokemontextotipo">{type.type.name}</div>
                                            )
                                            })}
                </div>
                        <button onClick={() => addPoke()}>
                            Adicionar Pokemon
                        </button>
                        <button className="pokemon-fav" onClick={onHeartClick}>
                            {heart}
                        </button>
                    </div>
                
                </div>
                    <button className='close-btn' onClick={toggleModal}>❌</button>
                        </div>
                    </div>
                    )}
                </div>
              <div className="pokeimg">
                    <img alt={pokemon.name} src={pokemon.sprites.front_default}></img>
                </div>
                <button className="corpocarta" onClick={toggleModal}>
                    <div className="topodacarta">
                        <h3>{pokemon.name}</h3>
                        <div>#{pokemon.id}</div>
                    </div>
                    <div className="rodapedacarta">
                        <div className="pokemontipo">
                            {pokemon.types.map((type, index) => {
                                return (
                                    <div key={index} className="pokemontextotipo">{type.type.name}</div>
                                )
                                })}
                        </div>
                    </div>
                
                </button>
        </div>
    )    
}

export default Pokemon;