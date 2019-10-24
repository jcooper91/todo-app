'strict mode'

// Fetch existing todos from localStorage 
const getSavedTodos = () => {
    const todoJSON = localStorage.getItem('todos') 
    try {
        return todoJSON ? JSON.parse(todoJSON) : []
    } catch(e) {
        return []
    }
}

const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render application todos based on filters 
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todo-list')
    let filterTodos = todos.filter((todo) => {
       const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
       const hideCompleteMatch = !filters.hideCompleted || !todo.complete;
       
       return searchTextMatch && hideCompleteMatch; 
    })
    
    const inCompleteTodos = filterTodos.filter((todo) => !todo.complete) 

    todoEl.innerHTML = '';
   
    todoEl.appendChild(generateSummaryDOM(inCompleteTodos));
   
   if(filterTodos.length > 0) {
    filterTodos.forEach(function(todo) {
        const todoPara = generateTodoDOM(todo)
        todoEl.appendChild(todoPara)    
    })
   } else {
       const noTodoMessage = document.createElement('p')
       noTodoMessage.classList.add('empty-message')
       noTodoMessage.textContent = 'No todos to show'
       todoEl.appendChild(noTodoMessage)
   }
}

const removeTodo = (id) => {
    
    const findIndex = todos.findIndex((todo) => todo.id === id)
    if(findIndex > -1) {
        todos.splice(findIndex, 1)   
    }
}

// Toggle the completed value for a given todo
const checkTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if(todo) {
        todo.complete = !todo.complete
    }
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const newEl         = document.createElement('label')
    const containerEl   = document.createElement('div')
    const textEl        = document.createElement('span')
    const checkBox      = document.createElement('input')
    const removeBtn     = document.createElement('button')

    removeBtn.textContent = 'Remove'
    removeBtn.classList.add('button', 'button--text')
 
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.complete;
    checkBox.addEventListener('change', () => {
        checkTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    containerEl.appendChild(checkBox)
    textEl.innerHTML = todo.text;
    containerEl.appendChild(textEl);

    newEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    newEl.appendChild(containerEl)

    newEl.appendChild(removeBtn);
    removeBtn.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    return newEl;
}

// Get the DOM elements for a list summary
const generateSummaryDOM = (inCompleteTodos) => {
    const summary = document.createElement('h2');
    summary.classList.add('list-title')
    let summaryCount = inCompleteTodos.length > 1 ? "todos" : "todo"
    summary.textContent = `You have ${inCompleteTodos.length} ${summaryCount} left`;
    return summary;
}
