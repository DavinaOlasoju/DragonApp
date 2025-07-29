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
		
		const formData = new FormData();
		formData.append("trigger", trigger);
		formData.append("audio", file);
		formData.append("ip", ip);

		setUploading(true);

		try {
			await fetch("http://localhost:3001/upload", {method: 'POST', body: formData,});
			const response = await fetch(`http://${ip}:8080/upload`, {method: 'POST', body: formData,});
			
			if (response.ok) {alert("File sent successfully");}
			else {alert("File rejected");}
		}
		catch(error) {
			console.error("Error: ", error);
			alert("Failed to send")
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