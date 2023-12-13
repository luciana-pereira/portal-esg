import Img from '../../assets/img/phone_esg.jpeg';
import "./Login.css";

const ImgPhone = () => {
    return (
        <div className="img-login-container">
            <div className="img-container">
                <img src={Img} alt="Logo com a palvra ESG, envolta de folhas" className="img-content" />
            </div>
        </div>
    );
}
export default ImgPhone;
