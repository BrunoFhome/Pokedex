import React from "react";
import { useState, useContext } from 'react'
import './telaLogin.css'
import { Link,useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconnection';
import { FaHouse } from "react-icons/fa6";
import { LayoutComponents } from "../components/LayoutComponents";
import { AuthContext } from '../Contexts/auth'


  export default function SignIn(){
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  
  
    return(
<LayoutComponents>
                <Link to='/'className='hoome'><FaHouse/></Link>
                <form action="" className="loginForm">
                    <span className='tituloLogin'>Bem-Vindo!</span>
                    <span className='tituloLogin'></span>

                    <div className="input">
                        <input className={email !== "" ? 'has-val diginput' : 'diginput'} type='email' value={email} onChange={e => setEmail(e.target.value)}/>
                        <span className='foco-input' data-placeholder='Email'></span>
                    </div>
                    <div className="input">
                        <input className={password !== "" ? 'has-val diginput' : 'diginput'}  type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                        <span className='foco-input' data-placeholder='Senha'></span>
                    </div>
                    <div className='conteinerLoginBotao'>
                        <button className="loginBotao" onClick={handleSubmit}>Login</button>
                    </div>
                    <div className="textoCentro">
                        <span className="texto">Não possui conta?</span>

                        <Link to='/singup' className='texto2'>Criar conta.</Link>
                    </div>
                </form>
    </LayoutComponents>
    )
  }