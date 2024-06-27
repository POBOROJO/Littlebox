import {useState, useEffect} from 'react'
import  Post from './Post'
import AddPost from './AddPost';

const Posts = () => {

  const [posts, setPosts] = useState([]);
        useEffect(() => {
        fetch("http://localhost:3000")
            .then(res => res.json())
            .then(data => setPosts(data.posts))

    }, [])

    const addpost = (title, summary) => {
      const id = posts.length + 1
      fetch("http://localhost:3000", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, title, summary })
      })
          .then(res => res.json())
          .then(data => setPosts(data.posts))
  }

  const deletePost = (id) => {
      fetch(`http://localhost:3000/${id}`, {
          method: "DELETE",
      })
          .then(res => res.json())
          .then(data => setPosts(data.posts))
  }

  const editPost = (id, title, summary) => {
      fetch(`http://localhost:3000/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, title, summary })
      })
          .then(res => res.json())
          .then(data => setPosts(data.posts))
  }

  return (
    <div className="container">
      <AddPost addpost={addpost} />
      {posts.map((post, i) => <Post key={i} post={post} editPost={editPost} deletePost={deletePost} />)}
    </div>
  )
}

export default Posts
