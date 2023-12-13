import Img from '../../assets/img/logo_esg.jpeg';
import "./Login.css";

const ImgLogo = () => {
    return (
        <div className="img-login-container">
            <div className="img-container">
                <img src={Img} alt="Logo com a palvra ESG, envolta de folhas" className="img-content" />
            </div>
        </div>
    );
}
export default ImgLogo;
