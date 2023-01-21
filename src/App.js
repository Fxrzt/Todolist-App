import './App.css';
import { v4 as uuidv4 } from 'uuid';
import {useState,useEffect} from 'react'

function App() {

  const [tasktodo, setTasktodo] = useState(()=>{
    const fromLocal = localStorage.getItem("tasktodo")
    if(fromLocal){
      return JSON.parse(fromLocal)
    }else{
      return []
    }
  });

  const [name, setName] = useState("")
  const [onClickedit, setOnClickEdit] = useState(false)
  const [nameUpdate, setNameUpdate] = useState({})

  const inputChange=(e)=>{
    setName(e.target.value)
  }
  // console.log(name)
  // console.log(tasktodo)

  const onEditInputChange=(e)=>{
    setNameUpdate({...nameUpdate,list:e.target.value})
  }
  console.log(nameUpdate)

  useEffect(() => {
    localStorage.setItem('tasktodo',JSON.stringify(tasktodo))
  }, [tasktodo])

  const onSubmit=(e)=>{
    e.preventDefault();

    if(name!==""){
      setTasktodo([
        ...tasktodo,
        {
          id:uuidv4(),
          list:name,
          check:false
        }
      ])
    }
    setName("")
  }

  const onDeleteClick=(id)=>{
    const removeItem = tasktodo.filter((name)=>{
      return name.id !== id 
    })
    setTasktodo(removeItem)
  }

  const onEditClick=(data)=>{
    setOnClickEdit(true)
    setNameUpdate({...data})

    console.log(data)
  }
  // console.log(nameUpdate)

  const onEditUpdate=(id,list)=>{
    const result = tasktodo.map((data)=>{
      return data.id === id ? list : name
    })
    setOnClickEdit(false)
    return setTasktodo(result)
  }
    
  const onClickEditSubmit=(e)=>{
    e.preventDefault();

    onEditUpdate(nameUpdate.id,nameUpdate)
  }

 
  const [isChecking, setIsChecking] = useState(tasktodo.check)
  
  const rightCheck=(e)=>{
    setIsChecking(!isChecking)
  }
  console.log(isChecking)


  return (
    <div className="App">

      <h1>Todolist App</h1>
      <div className='container'>
        <div className='form-container'>
          {onClickedit ? (
            <form onSubmit={onClickEditSubmit}>
              <h3>Edit</h3>
              
                <input type="text" name='nameupdate' value={nameUpdate.list} onChange={onEditInputChange}></input>
                <button type='submit'>อัพเดท</button>
                <button onClick={()=>setOnClickEdit(false)}>ยกเลิก</button>
              
            </form>
          ) : (
            <form onSubmit={onSubmit}>
              <div className='edit-container'>
                <input type='text' name='name' placeholder='ใส่รายการตรงนี้' onChange={inputChange}
                value={name}></input>
                <button type='submit'>เพิ่มรายการ</button>
              </div>
            </form>
          )}
        </div>
         
      </div>

      <div className='list-container'>
          <ul className='todolist'>
              {tasktodo.map((data)=>{
                  return <li key={data.id}>
  
                    <div className='check-btn'>
                        <input type="checkbox" onChange={rightCheck} checked={tasktodo.check}></input> 
                    </div>
        
                    <div className='name-list'>
                        {data.list}
                    </div>
        
                    <div className='edit-btn'>
                        <button onClick={()=>onEditClick(data)}>Edit</button>
                    </div>
        
                    <div className='delete-btn'>
                        <button onClick={()=>onDeleteClick(data.id)}>X</button>
                    </div>
        
                  </li>
                  })}
          </ul>
      </div>



    </div>
        
  );
}

export default App;
