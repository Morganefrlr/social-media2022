import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext.js'
import axios from 'axios'
import logo from '../assets/logo-01.png'




const Connexion = () => {


    const [slide, setSlide] = useState(true)
    const clickConnect = () =>{
        setSlide(true)
    } 
    const clickRegister = () =>{
        setSlide(false)
    }





    const [inputsRegister, setInputsRegister] = useState({
        username:"",
        email:"",
        surname:"",
        firstname:"",
        password:""
    })
    const [errRegister, setErrRegister] = useState(null)
    

    const handleChangeRegister = e =>{
        const value = e.target.value
        setInputsRegister({
            ...inputsRegister,
            [e.target.name]:value
        })
    }
    const handleRegister = async e =>{
        e.preventDefault()
        try{
            
            await axios.post("http://localhost:8800/api/auth/register", inputsRegister)
            alert('Votre compte a bien été crée, vous pouvez vous connecter.')
            window.location.reload()
            setSlide(1)
        }catch(errRegister){
            setErrRegister(errRegister.response.data)
        }

    }





    const { login } = useContext(AuthContext)
    const [inputsLogin, setInputsLogin]= useState({
        email:"",
        password:""
    })
    const [errLogin, setErrLogin ] = useState(null)
    const handleChangeLogin = e =>{
        const value = e.target.value
        setInputsLogin({
            ...inputsLogin,
            [e.target.name]:value
        })
    }
    const handleLogin = async e =>{
        e.preventDefault()
        try{
           await login(inputsLogin)
           window.location = "http://localhost:3000/";
        }catch(errLogin){
            setErrLogin(errLogin.response.data)
        }
    }









    return (
        <div className='loginPage'>
            <div className="loginContainer">
                <div className="loginContainerSide">
                    <h1>Group Company</h1>
                    <img src={logo} alt="" />
                    <p>Vous avez un compte? </p>
                    <button onClick={clickConnect}>Connexion</button>
                </div>
                <div className="loginContainerSide">
                    <h1>Group Company</h1>
                    <img src={logo} alt="" />
                    <p>Vous n'avez pas de compte? </p>
                    <button onClick={clickRegister}>S'enregistrer</button>
                </div>
            </div>
            <div className={slide === true ? 'loginSlider' : 'loginSlider slideForm'}>
                {slide === true && 
                    <div className="loginForm">
                    <h1>S'identifier</h1>
                    <form>
                        <div className="user-box">
                            <input type="email" name="email" required onChange={handleChangeLogin}/>
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="password" required onChange={handleChangeLogin}/>
                            <label>Mot de passe</label>
                        </div>
                    </form>
                    {errLogin && errLogin}
                    <button onClick={handleLogin}>Connexion</button>
                </div>}
                {slide === false && 
                    <div className="loginForm">
                    <h1>S'enregistrer</h1>
                    <form>
                        <div className="user-box">
                            <input type="text" name="username" required onChange={handleChangeRegister} />
                            <label>Nom d'utilisateur</label>
                        </div>
                        <div className="user-box">
                            <input type="email" name="email" required onChange={handleChangeRegister}/>
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input type="text" name="surname" required onChange={handleChangeRegister}/>
                            <label>Nom de famille</label>
                        </div>
                        <div className="user-box">
                            <input type="text" name="firstname" required onChange={handleChangeRegister}/>
                            <label>Prénom</label>
                        </div>   
                        <div className="user-box">
                            <input type="password" name="password" required onChange={handleChangeRegister}/>
                            <label>Mot de passe</label>
                        </div>
                    </form>
                    {errRegister && errRegister}
                    <button onClick={handleRegister}>Creer un compte</button>
                </div>}
            </div>
        </div>
    );
};

export default Connexion;
