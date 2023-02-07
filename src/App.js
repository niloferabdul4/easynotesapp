import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

import './styles.css'

function App()

{

	const [searchText, setSearchText] = useState('');                                         // SEARCH BOX STATE ///
	const[darkMode,setDarkMode]=useState(false)                                               //  DARKMODE STATE  ///

	const [notes, setNotes] = useState([ {
									id: nanoid(),
									text: 'This is my first note!',
									date: '15/04/2021',
								},
								{
									id: nanoid(),
									text: 'This is my second note!',
									date: '21/04/2021',
								},
							 ] ) ;

			
							 
/*******  SAVING AND GETTING FROM LOCAL STORAGE  ********************** */


	useEffect(() => {const savedNotes=JSON.parse(localStorage.getItem('react-notes-app-data'));            // parse to js obj & getting from local storage ///
                     if(savedNotes)
					 {
						setNotes(savedNotes)
					 }
            }, [])                             


	useEffect(() => {localStorage.setItem('react-notes-app-data',JSON.stringify(notes))}, [notes]);             // saving to local storage each time notes chages (converted to string) ////


		
/******************   ADD FUNCTION  ************************/

	function handleAdd(text)    
  {
	const date = new Date();
	const newNote = {id: nanoid(),text:text,date: date.toLocaleDateString()};
	setNotes([...notes, newNote]);
	
  }


  /******************   DELETE FUNCTION  ************************/

	function handleDelete(id)
	{
	const updated= notes.filter((n)=>(n.id!==id))
	setNotes(updated)
	
	}

	const styles={
		backgroundColor:(darkMode?  'black' : 'white'),
		color:(darkMode? 'white' :'black')
	}
		return (
		
		 <div style={styles} >              
			<div className='container' >
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearch={setSearchText} />
				<NotesList	notes={notes.filter((note) =>  note.text.toLowerCase().includes(searchText)  )}
						    handleAddNote={handleAdd}
							handleDeleteNote={handleDelete}                                 
					
					
				/>
					
			</div>
		</div>
	)
};

export default App;