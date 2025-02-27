import './App.css'
// 3.2k (gzipped: 1.4k)
import {FaPlus, FaPencilAlt, FaTrash} from 'react-icons/fa';
import { useState ,useEffect} from 'react';
import image from './assets/image.png'; // Adjust the path based on your actual file structure
import backgroundImage from './assets/backgroundImage.png';
import { db } from './firebase'
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc} from 'firebase/firestore';


const App = () => {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection (db, 'todos'), (snapshot) => { 
      setTodos (snapshot.docs.map((doc) => ({id: doc.id, todo: doc.data().todo })));
    });
    return () => unsubscribe(); 
}, []);
    
    

  const setEdit = (index) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  };

  const addTodo = async () => {
    try{
      if(input.trim() !== ''){
        await addDoc(collection(db, 'todos'),{todo: input});
        // setTodos([...todos,{id : new Date(), todo: input }]);
        setInput('')
      }
    } catch(error){
      console.error(error.message);
    }

  }

  const updateTodo = async () => {
    try{
      if(input.trim() !== ''){
        const todoDocRef =doc(db, 'todos',todos[editIndex].id);
        await updateDoc(todoDocRef, { todo: input });
        setEditIndex(-1);
        setInput('')
      }
    } catch(error){
      console.error(error.message);
    }
  }

  const removeTodo = async (id) => {
    try{
      await deleteDoc(doc(db, 'todos', id));
    } catch(error){
      console.error(error.message);
    }
    
  }


  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4 p-4 'style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4'>
        <div className='flex'>
          <img src={image} alt="" className='w-12 mr-10' />
          <h1 className='text-3xl font-bold text-center'>To-Do App</h1>
        </div>
        <div className='flex'>
          <input 
          type="text" 
          placeholder='Add a To-do'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-10 py-2 px-4 border rounded w-full focus:outline-nome mr-2" 
          />
          <button onClick={editIndex === -1 ? addTodo : updateTodo} className='mt-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-1 px-4 rounded'>
          {editIndex === -1 ? <FaPlus/>: <FaPencilAlt/>}
          </button>
        
        </div>
      </div>
      
      {
        todos.length > 0 && (
          <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4'>
            <ul>
              {todos.map((todo, index) =>(
                <li key={index} className='flex items-center justify-between bg-white p-3 rounded shadow-md mb-3'>
                <span className='text-lg'>{todo.todo}</span>
                <div>
                  <button onClick={() => setEdit(index)} className='mr-2 p-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded hover:from-gray-500 hover:to-gray-700'>
                    <FaPencilAlt/>
                  </button>
                    <button onClick={() =>removeTodo(todo.id)} className='mr-2 p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded hover:from-red-500 hover:to-red-700'>
                    <FaTrash/>
                  </button>
                </div>
              </li>
              ))}
            </ul>
          </div>
        )
      }
    </div>
  )
}

export default App
