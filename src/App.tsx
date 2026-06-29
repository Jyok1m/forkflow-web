import { Routes, Route } from "react-router";
import SignInPage from "./pages/SignIn";
import "./App.css";
import SignUpPage from "./pages/SignUp";

function App() {
	return (
		<Routes>
			<Route index element={<SignInPage />} />
			<Route path="signup" element={<SignUpPage />} />
		</Routes>
	);
}

export default App;
