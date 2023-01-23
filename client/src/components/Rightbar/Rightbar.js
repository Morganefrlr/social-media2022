import profil from '../../assets/profil.jpg';

const Rightbar = () => {
    return (
        <div className="rightbar">
            <p>Dernières Actualités</p> 
                <div className="actuUser">
                    <div className="actuUserInfo">
                        <img className='actuUserInfo_profil' src={profil} alt="" />
                        <p> <span>username</span> a liké votre post</p>
                    </div>
                    <span>il y a 1 minute</span>
                </div>
                <div className="actuUser">
                    <div className="actuUserInfo">
                        <img className='actuUserInfo_profil' src={profil} alt="" />
                        <p> <span>username</span> a liké votre post</p>
                    </div>
                    <span>il y a 1 minute</span>
                </div>
                <div className="actuUser">
                    <div className="actuUserInfo">
                        <img className='actuUserInfo_profil' src={profil} alt="" />
                        <p> <span>username</span> a liké votre post</p>
                    </div>
                    <span>il y a 1 minute</span>
                </div>
                <div className="actuUser">
                    <div className="actuUserInfo">
                        <img className='actuUserInfo_profil' src={profil} alt="" />
                        <p> <span>username</span> a liké votre post</p>
                    </div>
                    <span>il y a 1 minute</span>
                </div>
                <div className="actuUser">
                    <div className="actuUserInfo">
                        <img className='actuUserInfo_profil' src={profil} alt="" />
                        <p> <span>username</span> a liké votre post</p>
                    </div>
                    <span>il y a 1 minute</span>
                </div>
                <div className="credit">
                    <a href="https://fr.freepik.com/vecteurs-libre/identite-marque-logo-vectoriel-entreprise-g-design_22116263.htm#query=logo%20lg&position=29&from_view=search&track=ais">Image de Rochak Shukla</a> sur Freepik
                     <a href="https://fr.freepik.com/vecteurs-libre/banniere-abstraite-low-poly-formes-triangulaires_8413040.htm#page=23&query=abstrait&position=12&from_view=search&track=sph">Image de starline</a> sur Freepik
                </div>
        </div>
       
    );
};

export default Rightbar;