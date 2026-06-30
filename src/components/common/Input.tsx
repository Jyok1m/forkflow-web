import { useState, type InputHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	inputName: string;
	isRequired: boolean;
	error?: string | null;
}

function Input({ label, inputName, isRequired, error, ...props }: InputProps) {
	const [show, setShow] = useState(false);

	return (
		<div>
			<label
				htmlFor={props.name}
				className="flex text-sm/6 font-medium text-gray-900 dark:text-gray-100"
			>
				{label}
				{isRequired && "*"}
			</label>
			<div className="mt-2 relative">
				<input
					{...props}
					id={props.name}
					className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
					type={
						props.type === "password"
							? show
								? "text"
								: "password"
							: props.type
					}
				/>
				{props.type === "password" && (
					<button
						type="button"
						onClick={() => setShow((s) => !s)}
						aria-label={show ? "Hide password" : "Show password"}
						className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
					>
						<FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
					</button>
				)}
			</div>
			{error && (
				<span className="flex text-xs italic font-medium text-red-900 dark:text-red-400 mt-2">
					{error}
				</span>
			)}
		</div>
	);
}

export default Input;
