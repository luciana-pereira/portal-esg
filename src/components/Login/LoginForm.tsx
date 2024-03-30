import { useState, forwardRef } from "react";
import ImgLogo from "../Logo/ImgLogo";
import Input from "../Forms/Input/Input";
import Button from "../Forms/Button/Button";
import { Link, Navigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Controller, useForm, useWatch } from "react-hook-form";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { initFirebase } from '../../services/firebase';
import "./Login.css";
import Carrossel from "../Carrossel/Carrossel";
import Img from '../../assets/img/logo_esg.jpeg';
import RecyclingTeam from '../../assets/img/recycling-team.jpg';
import OfficeRecyclingTeam from '../../assets/img/office-recycling-team.jpg';
import PlantingTeam from '../../assets/img/planting-team.jpg';
import TreePlantingTeam from '../../assets/img/tree-planting-team.jpg';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginForm = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [isNavigate, setIsNavigate] = useState<boolean>(false);

    const app = initFirebase();
    const auth = getAuth(app);

    const {
        control,
        handleSubmit,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway')
            return;
        setOpen(false);
    };

    const onSubmit = async (formData: Object) => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: any) => {
                // const user = userCredential.user;
                // console.log("Usuário logado com sucesso", user);
                setIsNavigate(true);
            })
            .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error", errorCode, errorMessage);
                setOpen(true);
            });
    }

    const email = useWatch({
        control,
        name: "email",
    });

    const password = useWatch({
        control,
        name: "password",
    });

    const isDisabled = () => {
        if (
            email &&
            password
        ) {
            return false;
        } else {
            return true;
        }

    }

    const slides = [
      {
        type: 'image',
        source: TreePlantingTeam,
        alt: 'Equipe realizando plantio de mudas de arvores'
      },
      {
        type: 'image',
        source: OfficeRecyclingTeam,
        alt: 'Equipe dentro do escritorio realizando reciclagem'
      },
      {
        type: 'image',
        source: PlantingTeam,
        alt: 'Equipe realizando o plantio'
      },
      {
        type: 'image',
        source: RecyclingTeam,
        alt: 'Equipe realizando reciclagem de materiais'
      }
    ];    

    return (
        <section className="form-container-login">
            {/* <div className="effect"></div> */}
            <Carrossel slides={slides} />
            <div className="form-content-login">
                {isNavigate && (
                    <Navigate to="dashboard" replace={true} />
                )}
                <div className="form">
                    <ImgLogo 
                      classNameConteiner='img-login-container'
                      classNameImg='img-login'
                    />
                    {/* <div className="effect"></div> */}
                    <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <Controller
                            name='email'
                            control={control}
                            render={({ field: { onChange, onBlur, value, name } }) => {
                                return (
                                    <Input
                                        id={"email"}
                                        type={"text"}
                                        name={name}
                                        label={"E-mail"}
                                        stylesLabel={"label-login"}
                                        stylesInput={"input-login"}
                                        stylesWrapper={undefined}
                                        stylesError={undefined}
                                        value={value}
                                        error={false}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                    />
                                );
                            }}
                        />

                        <Controller
                            name='password'
                            control={control}
                            render={({ field: { onChange, onBlur, value, name } }) => {
                                return (
                                    <Input
                                        id={"password"}
                                        type={"password"}
                                        name={name}
                                        label={"Senha"}
                                        stylesLabel={"label-login"}
                                        stylesInput={"input-login"}
                                        stylesWrapper={undefined}
                                        stylesError={undefined}
                                        value={value}
                                        error={false}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                    />
                                );
                            }}
                        />
                        {/* {loading ? (
                            <Button styleBtn={"btn-search"} >Carregando...</Button>
                        ) : ( */}
                        {/* <Button styleBtn={"btn-search"} >Login</Button> */}
                        {/* )}
                        <Error error={error && 'Dados incorretos.'} /> */}
                        <Button
                            disabled={isDisabled()}
                            styleBtn={!isDisabled() ? "btn-search btn-container" : "btn-disable"}
                        >
                            Login
                        </Button>
                        <div className={"register-container"}>
                            <div className={"text-register-container"}>
                                <p>Não tem conta?</p>
                                <Link className={"register"} to="/login/cadastro">
                                    Cadastre-se
                                </Link>
                            </div>
                        </div>
                    </form>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            E-mail ou senha incorreto!
                        </Alert>
                    </Snackbar>
                </div>
                {/* <div className={"lost-password"}>
                    <Link to="/login/perdeu">
                        Perdeu a Senha?
                    </Link>
                </div> */}
            </div>
        </section>
    );
};
export default LoginForm;
