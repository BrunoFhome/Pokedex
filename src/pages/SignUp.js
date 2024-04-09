import React, { useState } from 'react'
import { auth } from '../firebaseconnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";
import { LayoutComponents } from "../components/LayoutComponents";

const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[nome, setNome] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
<LayoutComponents>
            <Link to='/'className='hoome'><FaHouse/></Link>
            <form onSubmit={handleSubmit} action="" className="loginForm">
                        <span className='tituloLogin'>Criar conta</span>
                        <span className='tituloLogin'></span>

                        <div className="input">
                            <input className={email !== "" ? 'has-val diginput' : 'diginput'} type='email' value={email} onChange={e => setEmail(e.target.value)}/>
                            <span className='foco-input' data-placeholder='Email'></span>
                        </div>
                        <div className="input">
                            <input className={nome !== "" ? 'has-val diginput' : 'diginput'} type='' value={nome} onChange={e => setNome(e.target.value)}/>
                            <span className='foco-input' data-placeholder='Nome'></span>
                        </div>
                        <div className="input">
                            <input className={password !== "" ? 'has-val diginput' : 'diginput'}  type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                            <span className='foco-input' data-placeholder='Senha'></span>
                        </div>
                        <div className='conteinerLoginBotao'>
                            <button className="loginBotao">Cadastrar</button>
                        </div>
                        <div className="textoCentro">
                            <span className="texto">Já possui conta?</span>

                            <Link to='/Login' className='texto2'>Logar</Link>
                        </div>
                    </form>
        </LayoutComponents>
  )
}

export default Signup;
