export default function AudioFile(props) {

    const del = async () => {

        const confirmed = window.confirm(`Are you sure you want to delete "${props.trigger}"?`);
        if (!confirmed) return;

        const data = {
            trigger: props.trigger,
            filepath: props.filepath,
            ip: props.ip
        };

        try {
            const response = await fetch(`http://${props.ip}:8080/delete`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({trigger: props.trigger})
            });

            if (response.ok) {
                
                const storage = await fetch("http://localhost:3001/delete", {
                    method: 'DELETE', 
                    headers: {"Content-Type": "application/json"}, 
                    body: JSON.stringify(data)
                });

                if (!storage.ok) alert("Failed to delete from storage");
                else alert(`Trigger "${props.trigger}" deleted successfully`);
            }
            else alert(`Failed to delete "${props.trigger}"`)
        }

        catch (err) {
            console.error(err);
            alert("Error deleting audio, ensure pi program is running");
        }
    };

    return (
        <div className='audio-file'>
            <div className='trigger'>{props.trigger}</div>
            <div className='ip'>{props.ip}</div>
			<div className='filepath'>{props.filepath}</div>
			<button className='delete' onClick={del}>Delete</button>
        </div>
    );
}