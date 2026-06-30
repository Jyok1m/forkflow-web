import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";
import { graphql } from "../gql";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

type Inputs = {
	email: string;
	password: string;
};

// Utilise Codegen pour gérer la génération de schéma graphql
const SIGNIN_DINER = graphql(`
	mutation SignIn($data: LoginDinerInput!) {
		signIn(data: $data) {
			accessToken
			diner {
				publicId
			}
		}
	}
`);

export default function SignInPage() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const [signInUser] = useMutation(SIGNIN_DINER);

	async function onSubmit(input: Inputs) {
		const res = await signInUser({
			variables: { data: { ...input } },
		});

		const { data } = res;
		if (data) {
			// const { accessToken } = data.signIn;
			// const { publicId } = data.signIn.diner;
			// console.log({ accessToken, publicId });
			navigate("/signup");
		}
	}

	return (
		<>
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						alt="Forkflow"
						onClick={() => navigate("/")}
						src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
						className="mx-auto h-10 w-auto dark:hidden cursor-pointer"
					/>
					<img
						alt="Forkflow"
						onClick={() => navigate("/")}
						src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
						className="mx-auto h-10 w-auto not-dark:hidden cursor-pointer"
					/>
					<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
						Welcome back to Forkflow !
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

						<Button label="Sign in" type="submit" />
					</form>

					<p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
						Not a member?{" "}
						<a
							onClick={() => navigate("/signup")}
							className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
						>
							Sign up
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
