import { useState } from "react";

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");

    const handleClick = ()=>{
        setTitle("");
        setSummary("");
    }
  return (
    <div>
      <h4>Add Post</h4>
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input type="text" value={summary} onChange={(e)=>setSummary(e.target.value)} />
      <button onClick={() => {handleClick}}>Add</button>
    </div>
  )
}

export default AddPost
