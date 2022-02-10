var gear =document.querySelectorAll('.item');
for(var i=0;i<gear.length;i++){
gear[i].addEventListener('mouseover',hover,false);
gear[i].addEventListener('mouseout',off,false);
gear[i].addEventListener('click',selected,false);
}

function hover(){
    this.classList.add("hover");
}
function off(){
    this.classList.remove("hover");
}
function selected(){
   if (this.classList.contains("active")==false){
   		this.classList.add("active");
				}else{
   		this.classList.remove("active");}
}