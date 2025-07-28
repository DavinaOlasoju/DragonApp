import '../CSS/Commands.css'
import CFormat from './Command'
import CList from '../Data/commands.json'

export default function Commands() {
  return (
	<div className='commands-page'>
		<div className='table-names'>
			<div className='trigger'>Trigger</div>
			<div className='params'>Params</div>
			<div className='description'>Description</div>
		</div>
		<div className='commands-list'> {
			CList.map(command => {
				return <CFormat name={command.name} params={command.params} description={command.description} />
			})
		} </div>
	</div>
  );
}