export default function AudioFile(props) {

    const del = async () => {

        const confirmed = window.confirm(`Are you sure you want to delete "${props.trigger}"?`);
        if (!confirmed) return;

        try {
            const response = await fetch("http://localhost:3001/delete", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({trigger: props.trigger, filepath: props.filepath})
            });

            if (response.ok) alert(`Trigger "${props.trigger}" deleted successfully`);
        }

        catch (err) {
            console.error(err);
            alert("Error deleting audio");
        }
    };

    return (
        <div className='audio-file'>
            <div className='trigger'>{props.trigger}</div>
			<div className='filepath'>{props.filepath}</div>
			<button className='delete' onClick={del}>Delete</button>
        </div>
    );
}