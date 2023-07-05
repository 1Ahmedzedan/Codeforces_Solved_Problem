function get_problem(tag , handle){
    let req = new XMLHttpRequest();
    req.open('GET', `https://codeforces.com/api/user.status?handle=${handle}`);
    req.send();
    req.onload = function(){
        let problems = document.createElement('div') ;
        problems.classList.add('problems') ;
        problems.style.padding = '10px' ;
        document.body.appendChild(problems) ;
        let data = JSON.parse(req.responseText).result ;
        let st = new Set() ;
        for(let i=0 ; i<data.length ; i++){
            let tags = data[i].problem.tags ;
            let contestId = data[i].contestId ;
            let index = data[i].problem.index ;
            if(data[i].verdict==="OK" && !st.has(contestId+index) && tags.includes(tag)){
                st.add(contestId+index) ;
                let link = `https://codeforces.com/contest/${contestId}/problem/${index}` ;
                let name = data[i].problem.name ;
                let a_tag = document.createElement('a') ;
                let a_div = document.createElement('div') ;
                a_div.classList.add('problem') ;
                a_tag.setAttribute('href' , link) ;
                a_tag.setAttribute('target' , '_blank') ;
                a_tag.innerHTML = name ;
                a_div.appendChild(a_tag) ;
                problems.appendChild(a_div) ;
            }
        } 
    }
}

let menu = document.querySelector('.dropdown') ;
let select = document.querySelector('.select') ;
let option_menu = document.querySelector('.options') ;
let options = option_menu.querySelectorAll('li') ; ; 
let select_span = select.querySelector('span') ;
let arrow_up = document.querySelector('.up') ;
let arrow_down = document.querySelector('.down') ;

select.addEventListener('click' , ()=>{
    if(option_menu.classList.contains('active')){
        option_menu.classList.remove('active') ;
        arrow_up.style.display = 'none' ;
        arrow_down.style.display = 'block' ;
    }
    else{
        option_menu.classList.add('active') ;
        arrow_up.style.display = 'block' ;
        arrow_down.style.display = 'none' ;
    }
});


let tag = "" ;
let handle = "" ; 
let submit = document.querySelector('.submit') ;
// console.log(tag.length) ;
options.forEach((option)=>{
    option.addEventListener('click' , ()=>{
        tag = option.innerHTML ;
        select_span.innerHTML = tag ;
        option_menu.classList.remove('active') ;
        arrow_up.style.display = 'none' ;
        arrow_down.style.display = 'block' ;
    });
});

submit.addEventListener('click' , ()=>{
    console.log('clicked') ;
    handle = document.querySelector('.handle').value ;
    if(handle.length===0){
        alert('Please Enter Your Handle') ;
    }
    else if(tag.length===0){
        alert('Please Choose A Tag') ;
    }
    else{
        document.querySelector('.problems').remove() ;
        get_problem(tag , handle) ;
    }
});

