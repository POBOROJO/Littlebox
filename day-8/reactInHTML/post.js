import { useState,useEffect } from "react";

const Posts = () => {
  // STATE - useState()
  const [posts, setPosts] = React.useState([]);

  //LIFECYCLE- useEffect()
  useEffect(() => {
    //Get request to the backend
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => setPosts(data.posts));
  }, []);

  const addPost = (title, summary) => {
    console.log(title, summary);
    const id = posts.length + 1;
    fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        summary,
      }),
    })
      .then((response) => response.json())
      .then((data) => setPosts(data.posts));
  };

  const deletePost = (id)=>{
    fetch(`http://localhost:3000/${id}`, {
      method: "DELETE",
    }).then(response=> response.json())
    .then((data)=> setPosts(data.posts))
  }

  const editPost = (id,title,summary)=>{
    console.log(id,title,summary);
    fetch(`http://localhost:3000/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        summary
      })
    }).then(response=> response.json())
    .then((data)=> setPosts(data.posts))
  }

  return (
    <div>
      <AddPost onAdd={addPost} />
      <ul className="posts">
        {posts.map((post, index) => (
          <SinglePost key={index} post={post} OnEdit={editPost} OnDelete={deletePost}/> // here we are passing post as a property
        ))}
      </ul>
    </div>
  );
};

const SinglePost = (props) => {
  const [editing, setEditing] = React.useState(false);
  return (
    <div className="post">
      <h3>{props.post.title}</h3>
      <p>{props.post.summary}</p>
      {editing ? <EditPost post= {props.post} onEdit={props.OnEdit} setEditing={setEditing}/> : <button onClick={()=>{
        setEditing(true)
      }}>Edit</button>}
      <button onClick={()=>props.OnDelete(props.post.id)}>Delete</button>
    </div>
  );
};

const AddPost = (props) => {
  const [title, setTitle] = React.useState("");
  const [summary, setSummary] = React.useState("");

  return (
    <div className="add-post">
      <h2>Add New Post</h2>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        type="text"
        value={summary}
        placeholder="Summary"
        onChange={(e) => setSummary(e.target.value)}
      ></input>
      <button onClick={() => props.onAdd(title, summary)}>Add Post</button>
    </div>
  );
};

const EditPost = (props) => {
  const [title, setTitle] = React.useState(props.post.title);
  const [summary, setSummary] = React.useState(props.post.summary);

  const handleSubmit=()=>{
    // Here we call the edit post function
    //Set Editing to false
    props.onEdit(props.post.id,title, summary);
    props.setEditing(false);
  }

  return (
    <div className="add-post">
      <h2>Edit Post</h2>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        type="text"
        value={summary}
        placeholder="Summary"
        onChange={(e) => setSummary(e.target.value)}
      ></input>
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
};
