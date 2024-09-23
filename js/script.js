const container = document.querySelectorAll(".container")
const loadMore = document.querySelector('.loadMore')
let numberPage = 0

function renderPage(data, cont){
  data.forEach((product, ind)=>{  
        cont.innerHTML += `<div class='images'>
                            <div class='bigImagesContainer'>
                            <div class='bigImages'></div>
                            </div>
                              <div class='smallImages'></div>     
                            </div>
                            <div class='infoLaptopAndLaptop'>
                            <div class='infoLaptop'></div>
                            <div class='laptopInfo'>
                              <div class='One'></div>
                              <div class='Two'></div> 
                            </div>
                            </div>
                            <div class='about-and-Productinformation'>    
                            <div class='containerAbout'>
                                 <h2>About this item</h2>
                                 <ul class='About'></ul>
                            </div>
                          <div class='summaryAndOtherTechnicalDetailsInfo'>
                           <div class='summaryInfo'>
                               <div class='summaryOne'></div>
                               <div class='summaryTwo'></div>
                           </div>
                        </div>  
                      </div>`
       
  let summaryOne = cont.querySelectorAll('.summaryOne')
  let summaryTwo = cont.querySelectorAll('.summaryTwo')

    const bigImages = cont.querySelectorAll('.bigImages')
    product.images.forEach((img)=>{
      bigImages[ind].innerHTML += `<img src=${'./img/'+ img} alt="">`
    })  
    const smallImages = cont.querySelectorAll('.smallImages')
    product.images.forEach((img, inde)=>{
      smallImages[ind].innerHTML += `<img class='small' data-n=${inde} data-i=${ind} src=${'./img/'+ img} alt="">` 
    })  

let infoLaptop = cont.querySelectorAll('.infoLaptop')
let laptopInfoOne = cont.querySelectorAll('.One')
let laptopInfoTwo = cont.querySelectorAll('.Two')

    for(let i in product){
      if(typeof(product[i]) !== 'object'){
        infoLaptop[ind].innerHTML += `<h2>${product[i]}</h2>`
        laptopInfoOne[ind].innerHTML += `<b>${prabel(i)}</b>`
        laptopInfoTwo[ind].innerHTML += `<span>${product[i]}</span>`        
      }
    }

let about = cont.querySelectorAll('.About')  

    product.Aboutthisitem.forEach((e)=>{
      about[ind].innerHTML += `<li>${e}</li>`
    })

    for(let i in product.Productinformation){
      summaryOne[ind].innerHTML += `<b>${prabel(i)}</b>`
      summaryTwo[ind].innerHTML += `<span>${product.Productinformation[i]}</span>`          
    }

  let small = cont.querySelectorAll('.small') 

    small.forEach((elem)=>{
        elem.addEventListener('click', (e)=>{
          small.forEach((e, i)=> e.classList.remove('border'))
          elem.classList.add('border')
          const bigImages = cont.querySelectorAll('.bigImages')
          bigImages[e.target.dataset.i].style.transform = `translate(-${e.target.dataset.n * 25}%)`
        })
      })
    })
}


fetch("http://127.0.0.1:5500/test.json")
.then(res => res.json())
.then(data => { 
  renderPage(Object.values(data)[0], container[0])
})


loadMore.addEventListener('click', function() {
if(numberPage >= 4) return
  fetch("http://127.0.0.1:5500/test.json")
  .then(res => res.json())
  .then(data => {
      renderPage(Object.values(data)[numberPage], container[numberPage])
  })
  numberPage = numberPage + 1
})

function prabel(arg){
  let newString = []
  arg.split('').forEach((e)=>{
    if(e == e.toUpperCase()){
      newString.push(' ')
    }
    newString.push(e)
  })
  return newString.join('')
}