import Img from '../../assets/img/logo_esg.jpeg';
import "./Logo.css";
// import "../Login/Login.css"

const ImgLogo = ({ classNameConteiner, classNameContentImg, classNameImg }: any) => {
    return (
        <div className={classNameConteiner}>
            <img 
                src={Img} alt="Logo com a palvra ESG, envolta de folhas" 
                className={classNameImg} 
            />
        </div>
    );
}
export default ImgLogo;
