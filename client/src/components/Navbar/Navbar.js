import sigle from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import { useQuery } from '@tanstack/react-query'








const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext)
    const folderImg = "http://localhost:8800/images/"
    const { data: relationFollower } = useQuery(['followers'], () => 
    makeRequest.get("/relation/follower/").then(res => { 
    return res.data
    })
    )
    const { data: relationFollow } = useQuery(['follows'], () => 
    makeRequest.get("/relation/follow/").then(res => {
    return res.data
    })
    )

    return (
    <div className='navbar'> 
        <div className='navbarContainer'>
            <div className="navbarLogo">
                <img src={sigle} alt="" />
                <p>Group company</p>
            </div>
            
                <img className="navbarProfil" src={folderImg + currentUser.profilPic} alt="" />
                <div className="navbarMessage">
                    <p>Bonjour,</p>
                    <p>{currentUser.firstname} {currentUser.surname}</p>
                </div>
          
            <div className="navbarFriends">
                <p>{relationFollow && relationFollow.length} <br />SUIVIS</p>
                <hr />
                <p>{relationFollower && relationFollower.length} <br />ABONNÉS</p>
            </div>
            <div className="navbarLiens">
                <NavLink to='/' end className={({isActive}) => isActive ? "lien actif" : "lien"}>Fil D'actualité</NavLink>
                <NavLink to={`/profil/${currentUser.id}`} className={({isActive}) => isActive ? "lien actif" : "lien"}>Mon Profil</NavLink>
                <NavLink to='/mespublications' className={({isActive}) => isActive ? "lien actif" : "lien"}>Mes Publications</NavLink>
                <NavLink to='/contacts' className={({isActive}) => isActive ? "lien actif" : "lien"}>Contacts</NavLink>
            </div>
            <button onClick={() => {logout()}}>Deconnexion</button>
        </div>
    
    </div>
    );
};

export default Navbar;
