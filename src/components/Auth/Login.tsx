import { useState, forwardRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm, useWatch } from "react-hook-form";
import { setIsOpen } from "../../store/slices/portalEsgDataSlice";
import { RootState, AppDispatch } from '../../store/store';
import { login } from '../../store/slices/authSlice';

import ImgLogo from "../Logo/ImgLogo";
import Input from "../Forms/Input/Input";
import Button from "../Forms/Button/Button";
import { Link, Navigate } from "react-router-dom";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Carrossel from "../Carrossel/Carrossel";
import RecyclingTeam from '../../assets/img/recycling-team.jpg';
import OfficeRecyclingTeam from '../../assets/img/office-recycling-team.jpg';
import PlantingTeam from '../../assets/img/planting-team.jpg';
import TreePlantingTeam from '../../assets/img/tree-planting-team.jpg';
import ChatBoot from "../ChatBoot/ChatBoot";
import "../Login/Login.css";

interface LoginFormInputs {
    email: string;
    password: string;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { isOpen, isNavigate } = useSelector((state: RootState) => state.portalEsgDataSlice);

    const {
        control,
        register,
        handleSubmit,
    } = useForm<LoginFormInputs>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const definingUserType = (isOpen: boolean) => {
        dispatch(setIsOpen(isOpen));
    }

    const onSubmit = (data: LoginFormInputs) => {
        dispatch(login(data));
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway')
            return;
        definingUserType(false)
        //setOpen(false);
    };

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
                    <Navigate to="/login/dashboard" replace={true} />
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
                    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
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
            <ChatBoot />
        </section>
    );
};
export default Login;
