//Get post from backend
//display on page inside #root

const root = document.getElementById("root");
const postContainer = document.createElement("div");
let numberOfPost = 0;

//todo Add form
postContainer.classList.add("post-container");
const addContainer = document.createElement("div");
addContainer.classList.add("add-container");
const addTitle = document.createElement("input");
addTitle.setAttribute("placeholder", "Enter title");
const addSummary = document.createElement("input");
addSummary.setAttribute("placeholder", "Enter summary");
const addSubmit = document.createElement("button");
addSubmit.innerText = "Submit";
addSubmit.addEventListener("click", postData);

addContainer.appendChild(addTitle);
addContainer.appendChild(addSummary);
addContainer.appendChild(addSubmit);
root.appendChild(addContainer);

function postData(){
    const title = addTitle.value;
    const summary = addSummary.value;
    const id = numberOfPost + 1;
    fetch("http://localhost:5000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
            title,
            summary,
        }),
    }).then((response) => response.json()).then((data) => populatedData(data.posts));
}

function populatedData(posts) {
  postContainer.innerHTML = "";
  numberOfPost = posts.length;
  //todo-> here we are displaying posts on the page
  posts.forEach((post) => {
    const container = document.createElement("div");
    container.classList.add("container");
    const title = document.createElement("h2");
    const summary = document.createElement("p");
    title.innerText = post.title;
    summary.innerText = post.summary;
    container.appendChild(title);
    container.appendChild(summary);
    postContainer.appendChild(container);
  });
  root.appendChild(postContainer);
}
fetch("http://localhost:5000")
  .then((response) => response.json())
  .then((data) => populatedData(data.posts));
