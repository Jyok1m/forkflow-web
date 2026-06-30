import { useNavigate } from "react-router";
import { toast, Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client/react";
import { graphql } from "../gql";
import { useForm } from "react-hook-form";

import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useEffect, useState } from "react";

type Inputs = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	phone: string;
};

// Utilise Codegen pour gérer la génération de schéma graphql
const CREATE_DINER = graphql(`
	mutation SignUp($data: SignUpDinerInput!) {
		signUp(data: $data) {
			accessToken
			diner {
				publicId
			}
		}
	}
`);

export default function SignUpPage() {
	const navigate = useNavigate();
	const [confirmPasswordVal, setConfirmPasswordVal] = useState("");
	const [passwordErr, setPasswordErr] = useState<string | null>(null);
	const [signUpUser, { error }] = useMutation(CREATE_DINER);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
	}, [error]);

	async function onSubmit(input: Inputs) {
		const { password, ...diner } = input;
		setPasswordErr(null);

		if (confirmPasswordVal !== password) {
			return setPasswordErr("Passwords must match");
		}

		const res = await signUpUser({ variables: { data: { diner, password } } });

		const { data } = res;

		if (data) {
			// const { accessToken } = data.signUp;
			// const { publicId } = data.signUp.diner;
			// console.log({ accessToken, publicId });
			navigate("/");
		}
	}

	return (
		<>
			<Toaster />
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						alt="Your Company"
						src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
						className="mx-auto h-10 w-auto dark:hidden"
					/>
					<img
						alt="Your Company"
						src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
						className="mx-auto h-10 w-auto not-dark:hidden"
					/>
					<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
						Welcome to Forkflow !
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<Input
							label="First name"
							inputName="firstName"
							autoComplete="given-name"
							isRequired
							error={errors.firstName && "First name is required"}
							{...register("firstName", { required: true })}
						/>

						<Input
							label="Last name"
							inputName="lastName"
							autoComplete="family-name"
							isRequired
							error={errors.lastName && "Last name is required"}
							{...register("lastName", { required: true })}
						/>

						<Input
							label="Phone number"
							inputName="phone"
							autoComplete="tel"
							type="tel"
							isRequired
							error={errors.phone && "Phone is required"}
							{...register("phone", { required: true })}
						/>

						<Input
							label="Email address"
							inputName="email"
							autoComplete="email"
							type="email"
							isRequired
							error={errors.email && "Email address is required"}
							{...register("email", { required: true })}
						/>

						<Input
							label="Password"
							inputName="password"
							autoComplete="current-password"
							type="password"
							isRequired
							error={errors.password && "Password is required"}
							{...register("password", { required: true })}
						/>

						<Input
							label="Confirm password"
							inputName="confirm-password"
							type="password"
							isRequired
							error={passwordErr}
							onChange={(e) => setConfirmPasswordVal(e.target.value)}
						/>

						<Button label="Sign up" type="submit" />
					</form>

					<p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
						Already a member?{" "}
						<a
							onClick={() => navigate("/")}
							className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
						>
							Sign in
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
