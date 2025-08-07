import '../CSS/AddNew.css'
import { useRef } from 'react';
import { useState } from 'react';

function AudioSender() {
	const triggerRef = useRef();
	const ipRef = useRef();
  	const [file, setFile] = useState(null);
  	const [uploading, setUploading] = useState(false);
  	
	const sendFile = async () => {
		
		const ip = ipRef.current.value.trim();
		const trigger = triggerRef.current.value.trim()
		if (!file || !ip || !trigger ) return alert("Missing input");
		
		const storeData = new FormData();
		storeData.append("trigger", trigger);
		storeData.append("audio", file);
		storeData.append("ip", ip);

		const sendData = new FormData();
		sendData.append("trigger", trigger);
		sendData.append("audio", file);
		sendData.append("ip", ip);

		setUploading(true);

		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 5000);

		try {
			const response = await fetch(`http://${ip}:8080/upload`, {method: 'POST', body: sendData, signal: controller.signal});
			if (response.ok) 
				{
					clearTimeout(timeout);
					const storage = await fetch("http://localhost:3001/upload", {method: 'POST', body: storeData,});
					const message = await storage.text()
					if (message.includes("duplicate trigger overridden")) alert("Duplicate trigger overridden")
					else if (!storage.ok) alert("Failed to store");
					else alert("File sent successfully");
				}
			else alert("File rejected");
		}
		catch(error) {
			clearTimeout(timeout);
			if (error.name === "AbortError") {
				alert("Timed out, send aborted");
			}
			else {
				console.error("Error: ", error);
				alert("Failed to send, ensure pi program is running")
			}
		}
		finally {setUploading(false);}
	}


    return (
        <div className='add-page'>
			<div className='text-input'>
				<div>Trigger: </div>
            	<input ref={triggerRef}></input>
				<div>IP: </div>
            	<input ref={ipRef}></input>
			</div>
            <div className='file-input'>
				<input type='file' accept='audio/*' onChange={(e) => setFile(e.target.files[0])} />
            	<button onClick={sendFile} disabled={!file || uploading}> {uploading ? 'Sending...' : 'Send to Server'} </button>
			</div>
        </div>
  );
}

export default AudioSender;