
import "./style.css";
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserType } from "../store/slices/portalEsgDataSlice";
import ImgLogo from "../../src/assets/img/logo_esg.jpeg";
import DynamicBreadcrumbs from "../components/DynamicBreadcrumbs/DynamicBreadcrumbs";
import ChatBoot from "../components/ChatBoot/ChatBoot";

const Cadastro = () => {

  const dispatch = useDispatch();
  const definingUserType = (type: string) => {
    dispatch(setUserType(type));
  }

  return (
    <>
      <div className="container">
          <DynamicBreadcrumbs />
        <div className="macbook-air-2">
          <div className="title-page-cadastro">
            <h1>Olá, bem vindo a página de cadastro! </h1>
            <p>Vamos começar por quem você é: </p>
          </div>
          <div className="card-container">
            <div className="instance-child">
              <Link to="/login/cadastro/usuario" onClick={() => definingUserType("adm")}>
                <div className="icone-cadastro"><SentimentVerySatisfiedOutlinedIcon /> </div>
                <b className="novo-usuario">Sou adm</b>
                <p>Realizo o acompanhamento e monitoramento dos usuario.</p>
              </Link>
            </div>

            <div className="instance-child">
              <Link to="/login/cadastro/usuario" onClick={() => definingUserType("user")}>
                <div className="icone-cadastro"> <SentimentVerySatisfiedOutlinedIcon /> </div>
                <b className="novo-usuario">Sou novo usuario</b>
                <p>Registro de novo usuario para reallização de posts e interação no game.</p>
              </Link>
            </div>
          </div>

        </div>
        <img className="mask-group-icon" alt="Logo ESG" src={ImgLogo} />
        <ChatBoot />
      </div>
    </>

  );
};

export default Cadastro;
