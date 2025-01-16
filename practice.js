
console.log("Hii")

let arr = ["BOX","BOX2","BOX3","BOX4","BOX5"];

let boxes = document.querySelectorAll(".box");


// boxes.forEach(box => {
//     box.addEventListener('click', function handleClick(event) {
//       console.log('box clicked', event);
  
//       box.setAttribute('style', 'background-color: yellow;');
//     });
//   });

for(box of boxes){
    box.addEventListener("click",(e)=>{
        if({arr : {"$in" : [e.target.innerText]}}){
            console.log(e.target.innerText);
        }
    })
}

