//Get post from backend
//display on page inside #root

const root = document.getElementById("root");
const postTitleElement = document.getElementById("post-title");
const postSummaryElement = document.getElementById("post-summary");
const postSubmitBtn = document.getElementById("post-submit")

// Keeping track of the number of posts
let numberOfPost = 0;

//todo Add form

//* GET all posts
async function getPost() {
  try{
    const respose = await fetch("http://localhost:3000");
    const data = await respose.json();
    if(data.posts){
      numberOfPost = data.posts.length;
      populatedData(data.posts);
    }
  }
  catch(error){
    console.log(error);
  }
}


//* On click of the post submit button
postSubmitBtn.addEventListener("click", postPost);


//* POST a post 
async function postPost(){
  const title = postTitleElement.value;
  const summary = postSummaryElement.value;
  try{
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: numberOfPost + 1,
        title,
        summary,
      })
    })

    const data = await response.json();

    //*Repopulate the data
    if(data.posts){
      numberOfPost = data.posts.length;
      populatedData(data.posts);
      //*clear inputs
      postTitleElement.value = "";
      postSummaryElement.value = "";
    }

  }catch(error){
    console.log(error);
  }
}

//* PUT(update) a post
async function updatePost(id,title,summary){
  try{
    const response = await fetch(`http://localhost:3000/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        summary
      })
    });

    const data = await response.json();
    if(data.posts){
      numberOfPost = data.posts.length;
      populatedData(data.posts);
    }
  }
  catch(error){
    console.log(error);
  }
}

//* DELETE a post
async function deletePost(id){
  try{
    const response = await fetch(`http://localhost:3000/${id}`, {
      method: "DELETE",
    })
    const data = await response.json();
    if(data.posts){
      numberOfPost = data.posts.length;
      populatedData(data.posts);
    }
  }
  catch(error){
    console.log(error);
  }
}

function populatedData(posts) {
  root.innerHTML = "";
  //Shows posts in HTML
  posts.forEach((post) => {
    const container = document.createElement("div");
    container.classList.add("container");
    const title = document.createElement("h2");
    title.innerText = post.title;
    const summary = document.createElement("p");
    summary.innerText = post.summary;
    //* Update
    const updateForm = document.createElement("div");
    updateForm.classList.add("update-form");
    const editTitle = document.createElement("input");
    editTitle.setAttribute("placeholder", "title");
    editTitle.value = post.title;
    const editSummary = document.createElement("input");
    editSummary.setAttribute("placeholder", "summary");
    editSummary.value = post.summary;
    const editSubmitBtn = document.createElement("button")
    editSubmitBtn.innerText = "Update";
    editSubmitBtn.addEventListener("click", () => updatePost(post.id, editTitle.value, editSummary.value));
    
    updateForm.appendChild(editTitle);
    updateForm.appendChild(editSummary);
    updateForm.appendChild(editSubmitBtn);

    //* DELETE
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => deletePost(post.id));
    
    
    container.appendChild(title);
    container.appendChild(summary);
    container.appendChild(updateForm);
    container.appendChild(deleteButton);
    root.appendChild(container);
  });
}

fetch("http://localhost:3000")
.then((response) => response.json())
.then((data) => populatedData(data.posts));

