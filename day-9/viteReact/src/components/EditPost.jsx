import {useState, useEffect} from 'react'

const EditPost = (props) => {
  const [title, setTitle] = useState(props.post.title)
    const [summary, setSummary] = useState(props.post.summary)
    const handleSubmit = () => {
        props.editPost(props.post._id, title, summary)
        props.setEditable(false)
    }

    return (
        <div className="add-post">
            <h2> Repost</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <input value={summary} onChange={(e) => setSummary(e.target.value)}></input>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default EditPost
