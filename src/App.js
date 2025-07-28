import './CSS/App.css';
import Commands from './Components/Commands';
import Audio from './Components/Audio';
import AddNew from './Components/AddNew';

export function Navbar(){
    return(
        <nav className="nav">
            <a href="/">Commands</a>
            <a href="/audio">Manage Audio</a>
        </nav>
    )
}

export default function App() {
	let Page
	switch (window.location.pathname) {
		case "/audio":
			Page = Audio
			break
		case "/add-new":
			Page = AddNew
			break
		default:
			Page = Commands
			break
	}
	return (
		<>
			<Navbar />
			<Page />
		</>
	)
}
