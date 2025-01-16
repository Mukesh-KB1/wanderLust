// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  })()


  //Tax Button EventListner

  let taxBtn = document.getElementById("flexSwitchCheckDefault");
  taxBtn.addEventListener("click",()=>{
    let taxToggle = document.getElementsByClassName("Tax-toggle");
    for(info of taxToggle){
      if(info.style.display != "inline"){
        info.style.display = "inline";
      }
    else{
      info.style.display = "none";
    }
    }
  });




// let arr = ["Trending","Beachfront","Bed & Breakfasts","Boats","Arctic","Camping","Luxe","Amazing pools","Castle","Lake"];

// let boxes = document.querySelectorAll(".box");

// for(box of boxes){
//     box.addEventListener("click",(e)=>{
//         // if({arr : {"$in" : [e.target.innerText]}}){
//           if({box : e.target.innerText}){
//             console.log(e.target.innerText);
//         }
//     })
// }

// let boxes = document.querySelectorAll(".box");
                   
// let arr = ["Trending","Beachfront","Bed&Breakfasts","Boats","Arctic","Camping","Luxe","AmazingPools","Castle","Lake"];
//     for(box of boxes){
//         box.addEventListener("click",(e)=>{
//             if({arr : {"$in" : [e.target.innerText]}}){
              
//               console.log(e.target.innerText);
//             }
//             else{
//                 console.log("N/A")
//             }               
//         })               
//     } 
