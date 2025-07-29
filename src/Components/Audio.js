import '../CSS/Audio.css'
import AudioFormat from "./AudioFile"
import AudioList from '../Data/audio.json'

export default function Audio() {

	return (
        <div className='audio-page'>
            <div className='audio-list'> {
				AudioList.map(file => {
					return <AudioFormat trigger={file.trigger} filepath={file.filepath} ip={file.ip}/>
				})
			} </div>
            <div className='add-div'>
                <a href='/add-new' className='add-new'>Add New</a>
            </div>
        </div>
	)
}