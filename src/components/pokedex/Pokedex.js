import React from "react";
import "./Pokedex.css"
import Pokemon from "../Pokemon";
import Pagination from "../Pagination";

const Pokedex = (props) => {
    const {pokemons, loading, page, setPage, totalPages} = props;
    const onLeftClickHandler = () => {
        console.log("Voltar")
        if(page > 0) {
            setPage(page-1)
        }
    }
    const onRightClickHandler = () => {
        console.log("avancar")
        if(page+1 !== totalPages){
            setPage(page+1)
        }
    }
    return(
        <div>
            <div className="pokedexh">
                    <h1>Pokedex</h1>
                    <Pagination
                        page={page+1}
                        totalPages={totalPages}
                        onLeftClick={onLeftClickHandler}
                        onRightClick={onRightClickHandler}
                    />

            </div>
            {loading ? 
            (<div>Carregando...</div>) 
            : 
            (<div className="pokedexgrade">
                {pokemons && pokemons.map((pokemon, index) => {
                    return (
                        <Pokemon key={index} pokemon={pokemon}/>

                   );
                }
                )}
            </div>)
            }
        </div>
    )
}
export default Pokedex;