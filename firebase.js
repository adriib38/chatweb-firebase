import { firebaseConfig } from "./modulos/config.js"
 

firebase.initializeApp(firebaseConfig);

// Obtener la referencia de la base de datos
var database = firebase.database();

// Obtener la referencia del chat
var chatRef = database.ref("chat");

// Obtener la referencia de la caja de chat del DOM
var chatBox = document.getElementById("chat-box");

// Obtener la referencia del formulario de chat del DOM
var chatForm = document.getElementById("user-form");
var chatUser = document.getElementById("chat-form");
var messageInput = document.getElementById("message-input");
var nameUser = document.getElementById("name-input");

let nombreUsuario = '';

chatForm.addEventListener("submit", function(event) {
  event.preventDefault();

  nameUser = document.getElementById("name-input");
 
  nombreUsuario = nameUser.value;

  console.log(nombreUsuario);
  
});

// Añadir un evento de envío al formulario de chat
chatUser.addEventListener("submit", function(event) {
  event.preventDefault();

  //Comprobar si el nombre está vacío
  if(nameUser.value == '' || nameUser.value == null || nameUser.value == 'undefined' || nameUser.value == ' '){ 
    nombreUsuario = 'anonimous'   
  } else {
    nombreUsuario = nameUser.value;
  }

  // Obtener el mensaje del input
  var user = nameUser.value;
  var message = messageInput.value;

  //Comprobar si el mensaje está vacío
  if(message != ""  || message != null || message != ' ' || message.length == 0){ 
    // Enviar el mensaje a Firebase
    chatRef.push().set({
      user: nombreUsuario,
      message: message
    });

    // Limpiar el input
    messageInput.value = "";
  }else{
    console.log("Mensaje no valido")
  }


});

// Escuchar los cambios en la base de datos de Firebase
chatRef.on("child_added", function(snapshot) {
  // Obtener los datos del mensaje
  var data = snapshot.val();
  var message = data.message;
  var user = data.user;

  // Crear un elemento de párrafo para mostrar el mensaje
  var p = document.createElement("p");
  p.innerHTML = `
    <div>${user}:  ${message}</div>
  
  `;

  // Añadir el elemento de párrafo a la caja de chat
  chatBox.appendChild(p);
});

