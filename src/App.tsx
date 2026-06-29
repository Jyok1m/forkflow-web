import { Routes, Route } from "react-router";
import SignIn from "./pages/SignIn";
import "./App.css";

function App() {
	return (
		<Routes>
			<Route index element={<SignIn />} />
		</Routes>
	);
}

export default App;
