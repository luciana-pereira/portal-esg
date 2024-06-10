import React, { useState } from 'react';
import { Controller, useForm, useWatch } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from "../../store/slices/portalEsgDataSlice";
import { RootState, AppDispatch } from '../../store/store';
import { signup } from '../../store/slices/authSlice';
import ProfileDefault from '../../assets/img/person.png'

import { Avatar, Button as MuiButton, Snackbar } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Input from "../Forms/Input/Input";
import Button from "../Forms/Button/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import DynamicBreadcrumbs from '../DynamicBreadcrumbs/DynamicBreadcrumbs';
import ChatBoot from '../ChatBoot/ChatBoot';
import ImgLogo from "../Logo/ImgLogo";
import "../Login/Login.css";

interface SignupData {
    usertype: string;
    photoURL: string;
	nickname: string;
	displayName: string;
	familyName: string;
	email: string;
	password: string;
	femaleBiologicalGender: boolean;
	maleBiologicalGender: boolean;
	dataOfBirth: string;
	privacyPolicy: boolean;
	responsibility: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signup: React.FC = () => {
	const [isErrors, setIsErrors] = useState<boolean>(false);
	const [dataOfBirthIsError, setDataOfBirthIsError] = useState<boolean>(false);
	const [imgUrl, setImgUrl] = useState("");
    const [uploading, setUploading] = useState<boolean>(false);
	//const [progress, setProgress] = useState(0);

	const dispatch: AppDispatch = useDispatch();
    const { isOpen, isNavigate } = useSelector((state: RootState) => state.portalEsgDataSlice);

	const { userType, hasError } = useSelector((state: RootState) => state.portalEsgDataSlice);
	
	const {
		control,
		setValue,
		handleSubmit,
	} = useForm<SignupData>({
		mode: 'onChange',
		defaultValues: {
            usertype: userType,
            photoURL: '',
			nickname: '',
			displayName: '',
			familyName: '',
			email: '',
			password: '',
			femaleBiologicalGender: false,
			maleBiologicalGender: false,
			dataOfBirth: '',
			privacyPolicy: false,
			responsibility: '',
		},
	});

	const definingUserType = (isOpen: boolean) => {
        dispatch(setIsOpen(isOpen));
    }

	const onSubmit = (data: SignupData) => {
        console.log(data);
        if (imgUrl) {
            data.photoURL = imgUrl;
        }
        dispatch(signup({ data: data, userType: userType }));
        //dispatch(signup({ data }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        try {
            const storage = getStorage();
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            setImgUrl(downloadURL);
            setValue('photoURL', downloadURL);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setUploading(false);
        }
    };


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway')
            return;
        definingUserType(false)
        //setOpen(false);
    };

	const photoURL = useWatch({
		control,
		name: "photoURL",
	});
	
	// const nickname = useWatch({
	// 	control,
	// 	name: "nickname",
	// });
	
    const displayName = useWatch({ control, name: "displayName" });
    const familyName = useWatch({ control, name: "familyName" });
    const email = useWatch({ control, name: "email" });
    const password = useWatch({ control, name: "password" });
    const femaleBiologicalGender = useWatch({ control, name: "femaleBiologicalGender" });
    const maleBiologicalGender = useWatch({ control, name: "maleBiologicalGender" });
    const dataOfBirth = useWatch({ control, name: "dataOfBirth" });
    const privacyPolicy = useWatch({ control, name: "privacyPolicy" });
    const responsibility = useWatch({ control, name: "responsibility" });

	const isDisabled = () => {
		if (userType === "user") {
			if (
				displayName &&
				familyName &&
				email &&
				(password.length >= 6) &&
				(femaleBiologicalGender || maleBiologicalGender) &&
				((new Date(dataOfBirth).getTime() <= new Date().getTime()) ? true : false) &&
				privacyPolicy
			) {
				return false;
			} else {
				return true;
			}
		} else {
			if (
				displayName &&
				familyName &&
				email &&
				(password.length >= 6) &&
				responsibility &&
				(femaleBiologicalGender || maleBiologicalGender) &&
				((new Date(dataOfBirth).getTime() <= new Date().getTime()) ? true : false) &&
				privacyPolicy
			) {
				return false;
			} else {
				return true;
			}
		}
	}

	return (
		<section className="form-container-register">
            <ImgLogo 
                classNameConteiner='img-create-container'
                classNameImg='img-create'
            />
			<div className="form-content-register">
                <DynamicBreadcrumbs />
				{isNavigate && (
					<Navigate to="/login/dashboard" replace={true} />
				)}
				<div className="form">
					<h2 className="form-title-register">Cadastre-se para ter acesso</h2>
					<form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <Controller
                            name="photoURL"
                            control={control}
                            render={() => (
                                <div>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="upload-photo"
                                        type="file"
                                        onChange={handleImageUpload}
                                    />
                                    <Avatar src={imgUrl ? imgUrl : ProfileDefault} alt="Uploaded Photo" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
                                    <label htmlFor="upload-photo">
                                        <MuiButton variant="contained" component="span" disabled={uploading}>
                                            {uploading ? 'Carregando...' : 'Inserir foto'}
                                        </MuiButton>
                                    </label>
                                </div>
                            )}
                        />
						<Controller
							name='nickname'
							control={control}
							render={({ field: { onChange, onBlur, value, name } }) => {
								return (
									<Input
										id={"nickname"}
										type={"text"}
										name={name}
										label={"Como gostaria de ser chamado?"}
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
							name='displayName'
							control={control}
							render={({ field: { onChange, onBlur, value, name } }) => {
								return (
									<Input
										id={"displayName"}
										type={"text"}
										name={name}
										label={"Nome: "}
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
							name='familyName'
							control={control}
							render={({ field: { onChange, onBlur, value, name } }) => {
								return (
									<Input
										id={"familyName"}
										type={"text"}
										name={name}
										label={"Sobrenome: "}
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
							name='email'
							control={control}
							render={({ field: { onChange, onBlur, value, name } }) => {
								return (
									<Input
										id={"email"}
										type={"email"}
										name={name}
										label={"E-mail: "}
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

						{userType === 'adm' ? (
							<>
								<Controller
									name='responsibility'
									control={control}
									render={({ field: { onChange, onBlur, value, name } }) => {
										return (
											<Input
												id={"responsibility"}
												type={"text"}
												name={name}
												label={"Area de atuação: "}
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
							</>
						) : undefined}

						<Controller
							name='password'
							control={control}
							render={({ field: { onChange, onBlur, value, name } }) => {
								return (
									<>
										<Input
											id={"password"}
											type={"password"}
											name={name}
											label={"Senha: "}
											stylesLabel={"label-login"}
											stylesInput={"input-login"}
											stylesWrapper={undefined}
											stylesError={undefined}
											value={value}
											error={isErrors}
											onChange={(e) => {
												const { value } = e.target;
												if (value.length < 6) {
													setIsErrors(true);
												} else {
													setIsErrors(false);
												}
												onChange(e);
											}}
											onBlur={onBlur}
										/>
										{isErrors ? (
											<p className='text-alert'>
												<i className="fa-solid fa-circle-exclamation"></i>
												{' '}
												Informe uma senha que contenha 6 ou mais caracteres.
											</p>
										) : undefined}
									</>
								);
							}}
						/>

						<FormControl className="radio-group">
							<FormLabel id="demo-row-radio-buttons-group-label text-login text-size">
								Sexo Biológico:
							</FormLabel >
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								name="position"
							>
								<Controller
									name="femaleBiologicalGender"
									control={control}
									render={() => {
										return (
											<FormControlLabel
												value="feminino"
												control={<Radio />}
												label="Feminino"
												labelPlacement="end"
												onChange={() => {
													setValue('femaleBiologicalGender', true);
													setValue('maleBiologicalGender', false);
												}}
											/>
										)
									}}
								/>

								<Controller
									name='maleBiologicalGender'
									control={control}
									render={() => {
										return (
											<FormControlLabel
												value="masculino"
												control={<Radio />}
												label="Masculino"
												labelPlacement="end"
												onChange={() => {
													setValue('maleBiologicalGender', true);
													setValue('femaleBiologicalGender', false);
												}}
											/>
										)
									}}
								/>
							</RadioGroup>
						</FormControl>

						<Controller
							name='dataOfBirth'
							control={control}
							rules={{
								validate: (value) => {
									if (new Date(value).getTime() <= new Date().getTime()) {
										return;
									} else {
										return "Data de nascimento inválida";
									}
								},
							}}
							render={({ field: { onChange, onBlur, value, name } }) => {
								return (
									<>
										<Input
											id={"dataOfBirth"}
											type={"date"}
											name={name}
											label={"Data de nascimento: "}
											stylesLabel={"label-login"}
											stylesInput={"input-login"}
											stylesWrapper={undefined}
											stylesError={undefined}
											value={value}
											error={dataOfBirthIsError}
											onChange={(e) => {
												const { value } = e.target;
												if (new Date(value).getTime() <= new Date().getTime()) {
													setDataOfBirthIsError(false);
												} else {
													setDataOfBirthIsError(true);
												}
												onChange(e)
											}}
											onBlur={onBlur}
										/>
										{dataOfBirthIsError ? (
											<p className='text-alert'>
												<i className="fa-solid fa-circle-exclamation"></i>
												{' '}
												Data de nascimento inválida.
											</p>
										) : undefined}
									</>
								);
							}}
						/>

						<div className="form-privacy-policy">
							<FormGroup>
								<Controller
									name="privacyPolicy"
									control={control}
									render={({ field: { onChange } }) => {
										return (
											<FormControlLabel
												control={<Checkbox />}
												label={<div style={{margin: "10px"}}><p>Ao se cadastrar você concorda com
												a nossa <b>política de privacidade.</b></p></div>}
												onChange={onChange}
											/>
										)
									}}
								/>
							</FormGroup>
							{/* <FormLabel id="demo-row-radio-buttons-group-label">
								Ao se cadastrar voc� concorda com
								a nossa <b>pol�tica de privacidade.</b>
							</FormLabel> */}
						</div>
						{/* {loading ? (
                            <Button styleBtn={"btn-search"} >Cadastrando...</Button>
                        ) : ( */}
						{/* <Button styleBtn={"btn-search"} >Cadastrar</Button> */}
						{/* )}
                        <Error error={error} /> */}
						<div className={"login-container register"}>
							<div className={"text-login"}>
								<p>Já possui uma conta?</p>
								<Link className={"link-login"} to="/login">
									Faça login
								</Link>
							</div>
						</div>
						<Button
							disabled={isDisabled()}
							styleBtn={!isDisabled() ? "btn-search btn-container" : "btn-disable"}
						>
							{/* {isLoading ? 'Cadastrando...' : 'Cadastrar'} */}
              				Cadastrar
						</Button>
					</form>

					<Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity={hasError ? "error" : "success"} sx={{ width: '100%' }}>
							{hasError ? "E-mail já cadastrado ou tem algum erro em algum campo preenchido, revise os campos e tente novamente." : "Cadastro realizado com sucesso!" }
						</Alert>
					</Snackbar>
				</div>
			</div>
            <ChatBoot />
		</section>
	);
};
export default Signup;
