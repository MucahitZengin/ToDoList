let listDOM = document.querySelector("#list")

//button clicked
function newElement() {
  let inputDOM = document.querySelector("#task").value
  let text = inputDOM.trim(); //boşluk ta olmaz
  if (text) {    
    //gönderdikten sonra sifirla
    document.querySelector("#task").value = ""; //doğrusu bu. artık hem sıfırlanıyor hem de listeye gidiyor
    addItem(text);
    toastShow("#successToast");
  } else {
    toastShow("#errorToast");
  }
}

function toastShow(idName) {
  //toastı bul
  const toastElement = document.querySelector(idName);
  //bootstrap constructoruna parametre gönder
  const toast = new bootstrap.Toast(toastElement);
  //oluşan nesneyi show et 
  toast.show();
}

//add
function addItem(input) {
  let liDOM = document.createElement('li'); //createElement önemli
  liDOM.innerHTML = input;
  addCloseIcon(liDOM);
  listDOM.append(liDOM);

  // Yeni eklenmiş elemanlara da olay dinleyicisi ekle
  liDOM.addEventListener('click', () => doneItem(liDOM));
  saveLocalStorage();
}

// let addDOM = document.querySelector("#liveToastBtn")
// addDOM.addEventListener('submit', newElement)

// Tüm li öğelerini seç
const items = document.querySelectorAll('li');

// Her bir öğe için silme düğmesi oluşturun ve ekleyin
items.forEach(item => {
  addCloseIcon(item);
  item.addEventListener('click', () => doneItem(item));
});

//done
function doneItem(item) {
  item.classList.toggle("checked");
  saveLocalStorage();
}

//delete
function deleteItem(item) {
  item.remove();
  saveLocalStorage();
}

function addCloseIcon(item) {
  const deleteButton = document.createElement('span');
  deleteButton.innerHTML = '&times;'; // × olarak yazarsan contente karışırdı
  deleteButton.style.float = 'right'; // Sağa yasla
  deleteButton.style.paddingRight = "15px"
  deleteButton.className = "close"; //css ekle büyük görünsün ve hizalansın
  item.appendChild(deleteButton);

  // Tıklandığında öğeyi sil
  deleteButton.addEventListener('click', () => {
    deleteItem(item);
  });
}

function saveLocalStorage(){
  //li leri diziye çevir
  let arrayList = Array.from(listDOM.getElementsByTagName('li'));
  //her birinden bir nesne oluştur content ve checked propertyleri olsun
  let listObj = arrayList.map(item=>{
    return{
      content: item.innerHTML, //textContent yapınca delete button da karışıyor
      checked: item.classList.contains('checked')
    };
  });
  //jsona çevirerek local storagea set et
  localStorage.setItem('todolist', JSON.stringify(listObj));
}

document.addEventListener("DOMContentLoaded", ()=>{
  const storedList = localStorage.getItem("todolist");
  if(storedList){
    const taskList = JSON.parse(storedList);
    taskList.forEach((task)=>{
      addItem(task.content);
      const lastLi = listDOM.lastElementChild; //kapatma elementi last child
      if(task.checked){
        lastLi.classList.add("checked");
      }
    });
  }
});