import React from "react";
import Navbar from "../components/Navbar/navbar";
import { useState, useEffect } from 'react'
import { db, auth } from '../firebaseconnection';
import './telaLogin.css'
import Navbarl from "../components/Navbar/Navbarl";
import './Meuspokes.css';
import { Link } from "react-router-dom";

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

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'



function MeusPokemons(){

  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState({})
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

    checkLogin();

  }, [])



  async function fazerLogout(){
    await signOut(auth)
    setUser(false);
    setUserDetail({})
  }

  return (
    <div className="meus-pokemons-container">
      {user ? (
       <Navbarl/>
      ):
       <Navbar/>
      }
      {user && (
        <div className="usuario">
          <strong>Seja bem-vindo(a) Você está logado!</strong> <br/>
          <span> Email: {userDetail.email}</span> <br/>
          <Link to="/" className="usuario-btn" onClick={fazerLogout}>Sair da conta</Link>
          <br/> <br/>
        </div>
      )}
      <hr />

      <div className="pokemons-list">
        <input placeholder="Nome" onChange={(event) =>{setNewPoke(event.target.value);}}/>
        <button onClick={addPoke}>Adicione um Pokemon</button>

        <ul>
          {favpoke.map((favpoke, index) => (
            <li key={index}>Nome: {favpoke.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MeusPokemons;
