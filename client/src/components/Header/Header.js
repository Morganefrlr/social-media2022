import Searchicon from '@mui/icons-material/Search';
import { useState, useEffect} from 'react';
import { makeRequest } from '../../axios';
import { Link } from 'react-router-dom';

const Header = () => {

    const folderImg = "http://localhost:8800/images/"
    const [ search, setSearch] = useState([])
   
    const [openBox, setOpenBox] = useState(false)

    useEffect(() =>{
        makeRequest.get("/user/all/")
        .then((res) => setSearch(res.data))
    }, []) 







    return (
        <div className="headerImg">
            <div className='headerSearch'>
                <Searchicon className='headerSearch-icon' onClick={() => setOpenBox(true)} />
                {openBox && 
                <div className='boxSearch'>
                    <div className='boxSearch_title'>
                        <h1 className='boxSearch-close' onClick={() =>setOpenBox(false)}>X</h1>
                        <p>Liste des utilisateurs</p>
                    </div>
                    <div className="resultatSearch">
                        {search && search.map(user => {
                        return (
                            <div className="card" key={user.id}>
                            <img src={folderImg + user.profilPic} alt="" />
                            <div className="card_bottom">
                            <Link to={`../profil/${user.id}`}><button>{user.firstname} {user.surname}</button></Link>
                            </div>
                        </div>
                        )
                    })} 
                    </div>
                    
                    
                </div>
            }
            </div>
            
            
        </div>
    );
};

export default Header;


