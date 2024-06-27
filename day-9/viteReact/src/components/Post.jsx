import {useState, useEffect} from 'react'
import EditPost from './EditPost'

const Post = (props) => {
  const [editable, setEditable] = useState(false)
    return (<div className="post">
        {editable ? <EditPost post={props.post} editPost={props.editPost} setEditable={setEditable} /> :
            <button onClick={() => { setEditable(true) }}>EDIT</button>}
        <button onClick={() => props.deletePost(props.post._id)}>DELETE</button>
        <h4>{props.post.title}</h4>
        <p>{props.post.summary}</p>
    </div>)
}

export default Post
