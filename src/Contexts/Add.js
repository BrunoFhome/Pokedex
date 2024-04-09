import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../firebaseconnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'
import { 
    doc, 
    setDoc, 
    collection, 
    addDoc, 
    getDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc,
    onSnapshot
} from 'firebase/firestore'

export const AddContext = createContext({});


function Add({ children }){
    const [newPoke, setNewPoke] = useState ("")
  
    
    const addPoke = async () => {
      await addDoc(favpokeCollectionRef, {name: newPoke});
    }
  
  
    const [favpoke, setFavpoke] = useState([]);
  
    const favpokeCollectionRef = collection(db, "favpoke");
  
    useEffect(() => {
      const getFavpoke = async () => {
        const data = await getDocs(favpokeCollectionRef) 
        setFavpoke(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
      }
  
      getFavpoke()
    }, [])
  
  
  
  

  

  
    return (

  
  
        <div>
          <input placeholder="Nome" onChange={(event) =>{setNewPoke(event.target.value);}}/>
          <button onClick={addPoke}>Adicione um Pokemon</button>
  
  
          {favpoke.map((favpoke) => {
            return (
            <div>
               <h1> Nome: {favpoke.name} </h1>
               <button>Atualizar post</button>
            </div>
          );
          })}
        </div>
  
  
      

    );
  

  return(
    <AddContext.Provider 
      value={{
        addPoke,
        setNewPoke,
        doc, 
        setDoc, 
        collection, 
        addDoc, 
        getDoc, 
        getDocs, 
        updateDoc, 
        deleteDoc,
        onSnapshot,
        favpokeCollectionRef
      }}
    >
      {children}
    </AddContext.Provider>
  )
}

export default Add;