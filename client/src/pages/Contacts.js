
import { useState } from 'react';
import { useQuery} from '@tanstack/react-query'
import Card from '../components/Contacts/Card/Card';
import { makeRequest } from '../axios';


const Contacts = () => {

    const [slide, setSlide] = useState(null)
    const clickFollow = () =>{
        setSlide(1)
    } 
    const clickFollower = () =>{
        setSlide(2)
    }
    
    const { data: relationFollow } = useQuery(['follows'], () => 
    makeRequest.get("/relation/follow/").then(res => {
    return res.data
    })
    )

    const { data: relationFollower } = useQuery(['followers'], () => 
    makeRequest.get("/relation/follower/").then(res => { 
    return res.data
    })
    )
    
    return (
        <div>
            
            <div className='contactsNav'>
                <button onClick={clickFollow} className={slide === 1 ? 'bouton rouge' : 'bouton'}>Suivi</button>
                <button onClick={clickFollower} className={slide === 2 ? 'bouton rouge' : 'bouton'}>Abonnés</button>
            </div>
            {slide === 2 && 
                <div className="contactsContainer">
                    <h1>Abonnés</h1>
                    <div className="contactsCards">
                        {relationFollower && relationFollower.map(user => {
                            return (
                                < Card user={user} key={user.id}/> 
                            )
                        })}
                    </div>
                </div>
            }
            {slide === 1 && 
                <div className="contactsContainer">
                    <h1>Contacts Suivis</h1>
                    <div className="contactsCards">
                        {relationFollow  && relationFollow.map(user => {
                            return (
                                < Card user={user} key={user.id}/> 
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    );
};

export default Contacts;

