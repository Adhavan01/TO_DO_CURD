import React from 'react'
import { useState } from 'react'


const lists = [
    {   
        id:1,
        name:"kumaran",
        age:56
    },
    {
        id:2,
        name:"vignash",
        age:55
    },
    {
        id:3,
        name:"mugundhan",
        age:44
    },
    {
        id:4,
        name:"lingam",
        age:33
    },
]

function To_Do() {
    const [list,setList]=useState(lists)
    const [addInput,setAddInput]=useState('')
    const [editId,setEditId]=useState(null)
    const [editINput,setEditInput]=useState('')

    const handleSubmit =(e)=>{
        e.preventDefault()
//----------------------------------------------------------------
//edit
        if(editId !== null){
            setList(list.map((item)=>item.id === editId ? {...item, name:editINput} : item))
            setEditId(null)
            setEditInput('')
        }
//---------------------------------------------------------------
        else{
        const newItem = {
            id: list.length === 0 ? 1 : list[list.length - 1].id +1,
            name:addInput,
            age:0,
            complite:false
        }
        setList([...list,newItem])
        setAddInput('')
           }
     }

    const handleDelet=(id)=>{
  
            setList(list.filter((item)=>(item.id !== id)))
    }

    const handleComplite=(id)=>{
        setList(list.map((task)=>
            task.id === id ?
                {...task,complite:!task.complite}
            
                :task
            
        ))
    }

    const handleEdit = (id,name)=>{
        setEditId(id)
        setEditInput(name)
    }
    const handleSave =()=>{
        setList(list.map((item)=> item.id === editId ? {...item,name:editINput} : item))
        setEditId(null)
        setEditInput('')
    }

   return(
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e)=>setAddInput(e.target.value.trim())} placeholder='Today task'   />
            <button>Add</button>
        </form>
        <div>
            {
                list.map((item)=>{
                    return(
                        <div style={{color:item.complite ? "pink" : "red"}}>
                            <h2>{item.id}</h2>
                            {
                                editId === item.id ? (
                                    <input type="text" value={editINput} onChange={(e)=>setEditInput(e.target.value.trim())} />
                                ):
                                <h2 style={{ textDecoration: item.complite ? 'line-through' : 'none' }}>{item.name}</h2>
                            }
                            <button onClick={()=>handleComplite(item.id)}>complite</button>
                            {
                                editId === item.id ? (
                                    <div>
                                    <button onClick={()=>setEditId(null)}>cancel</button>
                                    <button onClick={handleSave}>save</button>
                                    </div>
                                
                                ) : (
                                    <button onClick={()=>handleEdit(item.id, item.name)}>Edit</button>
                                )
                            }
                            <button onClick={()=>handleDelet(item.id)}>X</button>
                        </div>
                    )
                })
            }
        </div>
    </div>
   )
}

export default To_Do