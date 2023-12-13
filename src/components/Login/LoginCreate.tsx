import React, { useState } from 'react';
import Input from "../Forms/Input/Input";
import Button from "../Forms/Button/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "./Login.css";
import ImgCreate from "./ImgLogin";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/auth';
import 'firebase/firestore';
import { Controller, useForm, useWatch } from "react-hook-form";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { initFirebase } from '../../services/firebase';
import { Link, Navigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginCreate = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [isErrors, setIsErrors] = useState<boolean>(false);
	const [dataOfBirthIsError, setDataOfBirthIsError] = useState<boolean>(false);
	const [isNavigate, setIsNavigate] = useState<boolean>(false);
	const [progress, setProgress] = useState(0);
	const [imgUrl, setImgUrl] = useState("");

	const { userType } = useSelector((state: RootState) => state.portalEsgDataSlice);

	const app = initFirebase();
	const auth = getAuth(app);
	const db = getFirestore(app);
	const storage = getStorage(app);
	

	const {
		control,
		setValue,
		handleSubmit,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			nickname: '',
			name: '',
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

	// Fecha a snackbar de alerta ao clicar fora 
	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway')
			return;
		setOpen(false);
	};

	const onSubmit = async (formData: any) => {
		createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			
			// Salvar informações adicionais do usuário regular no banco de dados Firestore
			addDoc(collection(db, userType), { ...formData, type: userType });
			setOpen(true);
			setTimeout(() => {
					setIsNavigate(true);
				}, 5000);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error("Error: cod", errorCode, errorMessage);
			});
	}

	// const photo = useWatch({
	// 	control,
	// 	name: "photo",
	// });
	
	// const nickname = useWatch({
	// 	control,
	// 	name: "nickname",
	// });
	
	const name = useWatch({
		control,
		name: "name",
	});
	
	const familyName = useWatch({
		control,
		name: "familyName",
	});
	
	const email = useWatch({
		control,
		name: "email",
	});
	
	const password = useWatch({
		control,
		name: "password",
	});
	
	const femaleBiologicalGender = useWatch({
		control,
		name: "femaleBiologicalGender",
	});
	
	const maleBiologicalGender = useWatch({
		control,
		name: "maleBiologicalGender",
	});
	
	const dataOfBirth = useWatch({
		control,
		name: "dataOfBirth",
	});
	
	const privacyPolicy = useWatch({
		control,
		name: "privacyPolicy",
	});
	
	const responsibility = useWatch({
		control,
		name: "responsibility"
	});

	const isDisabled = () => {
		if (userType === "user") {
			if (
				name &&
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
				name &&
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
		<section className="form-container form-container-register">
			{/* <div className="effect"></div> */}
			<ImgCreate />
			<div className="form-content">
				{isNavigate && (
					<Navigate to="/" replace={true} />
				)}
				<div className="form">
					<h2 className="form-title">Cadastre-se para ter acesso</h2>
					<form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
						<Controller
							name='nickname'
							control={control}
							render={({ field: { onChange, onBlur, value, name } }) => {
								return (
									<Input
										id={"nickname"}
										type={"text"}
										name={name}
										label={"Como gostaria de ser chamado (Apelido)?"}
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
							name='name'
							control={control}
							render={({ field: { onChange, onBlur, value, name } }) => {
								return (
									<Input
										id={"name"}
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
								Ao se cadastrar você concorda com
								a nossa <b>política de privacidade.</b>
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
								<Link className={"link-login"} to="/">
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

					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
							Cadastro realizado com sucesso!
						</Alert>
					</Snackbar>
				</div>
			</div>
		</section>
	);
};
export default LoginCreate;
