import '../CSS/Commands.css';

export default function Command(props) {
    return (
        <div className='command'>
            <div className='name'>{props.name}</div>
			<div className='params'>{props.params}</div>
			<div className='description'>{props.description}</div>
        </div>
    );
}