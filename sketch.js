//created with https://www.youtube.com/watch?v=wv7pvH1O5Ho

const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');
const reset = document.getElementById('reset');

const sortedOrder = [
  '1','2','3','4','5','6','7','8','9','10'
];


// Store the items

const listItems = [];


let dragStartIndex;

createList();

//Insert list items into DOM

function createList() {
  [...sortedOrder]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item,index) => {
      const listItem = document.createElement('li');


      listItem.setAttribute('data-index',index);

      listItem.innerHTML=`
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="item-name">${item}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
      `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);

    });
    addEventListeners();

}

function dragStart(){
  //console.log('Event: ', 'dragstart')
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter(){
  //console.log('Event: ', 'dragEnter')
  this.classList.add('over');
}

function dragOver(e){
  //console.log('Event: ', 'dragOver')
  e.preventDefault();
}

function dragLeave(){
  //console.log('Event: ', 'dragLeave')
  this.classList.remove('over');
}

function dragDrop(){
 // console.log('Event: ', 'Drop')
 const dragEndIndex = +this.getAttribute('data-index');
 swapItems(dragStartIndex,dragEndIndex);
 this.classList.remove('over');
}
var swapCounter = 0;

function swapItems(fromIndex, toIndex){
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
  swapCounter +=1;
  console.log('Event: ', swapCounter)
  document.getElementById("swapCounter").innerHTML = swapCounter;

}


function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');


  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover',dragOver);
    item.addEventListener('drop',dragDrop);
    item.addEventListener('dragenter',dragEnter);
    item.addEventListener('dragleave',dragLeave);
  })
}


function checkOrder() {
  let numberCorrect =0;
  let numberInCorrect = 0;
  listItems.forEach((listItem, index) =>{
  const itemSize = listItem.querySelector('.draggable').innerText.trim();
  
  if(itemSize !== sortedOrder[index]){
    listItem.classList.add('incorrect');
    numberInCorrect += 1;
  } else {
    listItem.classList.remove('incorrect');
    listItem.classList.add('correct');
    numberCorrect += 1;
  }
  });

  if (numberCorrect == sortedOrder.length){
    confirm(`You sorted the numbers! \n Congradulations! \n It took you ${swapCounter} clicks!`)
  }else{
    confirm(`A few more to go! \n Only ${numberInCorrect} left to sort!`)

  }

}
  check.addEventListener('click',checkOrder);

  reset.addEventListener('click',resetDoc);

function resetDoc(){
  document.location.reload(true);
}