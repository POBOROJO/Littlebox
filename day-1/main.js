//  here the function increment() is called every 1 second
let count =0;
function increment(){
    const box = document.getElementById("box");
    box.style.marginTop = count + "px";
    count+=10;
}

// setInterval(increment, 1000);

console.log(window);