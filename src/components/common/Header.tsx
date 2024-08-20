import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, AppContextType, ContextData } from "../../application/provider";
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const { data, setData } = useContext(AppContext) as AppContextType;

    const handleClickShowFavorites = () => {
        let updatedContextData: ContextData = {
            ...data,
            showFavorites: true
        }
        setData(updatedContextData);
        navigate("/");
    }

    const handleClickShowMain = () => {
        let updatedContextData: ContextData = {
            ...data,
            showFavorites: false
        }
        setData(updatedContextData);
        navigate("/");
    }

    return (
        <div className="header">
            <div className='logo'>
                <img src={window.location.origin + '/logo-marvel.png'} alt="Go to home page" onClick={handleClickShowMain} className='img-click' />
            </div>
            <div className='div-favorites'>
                <img src={window.location.origin + '/default.png'} alt="Show favorites" onClick={handleClickShowFavorites} className='img-click' />
            </div>
            <div className='div-favorites-count'>
                {data.listFavorites.length}
            </div>
        </div>
    );
}

export default Header;