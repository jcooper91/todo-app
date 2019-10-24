'strict mode'

let todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#hide-completed').addEventListener('change', (e) => {
   filters.hideCompleted = e.target.checked;
   renderTodos(todos, filters)
})


document.querySelector('#search-todo').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
})

document.querySelector('#todo-form').addEventListener('submit', (e) => {
   let text = e.target.elements.newTodo.value.trim()
   e.preventDefault();

   if(text.length > 0) {
      todos.push({
         id: uuidv4(),
         text,
         complete: false
      }) 
     e.target.elements.newTodo.value = '';
     saveTodos(todos);
     renderTodos(todos, filters)
   } else {
      alert('Please enter a value')
   }
   
})



























// COMPLETE TEXT
/*
const renderTodos = function(todos, filters) {

    let filterTodos = todos.filter(function(todo) {
       const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
       const hideCompleteMatch = !filters.hideCompleted || !todo.complete;
       return searchTextMatch && hideCompleteMatch; 
    })
    
    const inCompleteTodos = filterTodos.filter(function(todo) {
       return !todo.complete;
   }) 

   document.querySelector('#todo-list').innerHTML = '';
   
   // print incomplete todo's
   const summary = document.createElement('h2');
   summary.textContent = `You have ${inCompleteTodos.length} todo's left`;
   document.querySelector('#todo-list').appendChild(summary);
   
   
   filterTodos.forEach(function(todo) {
       const todoPara = document.createElement('p');
       todoPara.innerHTML = todo.text;
       document.querySelector('#todo-list').appendChild(todoPara);
   })
}

renderTodos(todos, filters)

document.querySelector('#hide-completed').addEventListener('change', function(e) {
   filters.hideCompleted = e.target.checked;
   renderTodos(todos, filters)
})


document.querySelector('#search-todo').addEventListener('input', function(e) {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
})


document.querySelector('#todo-form').addEventListener('submit', function(e) {
   e.preventDefault();
    todos.push({
       text:  e.target.elements.newTodo.value,
       complete: false
    }) 
   e.target.elements.newTodo.value = '';
   renderTodos(todos, filters)
  
})

document.querySelector('#create-todo').addEventListener('click', function(e) {
   e.target.textContent = 'The button was clicked!';
})
*/