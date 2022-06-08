(function () {
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return { form, input, button };
  }

  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }


  function createTodoItem(name, done = false) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    if (done) {
      item.classList.add('list-group-item-success');
    }

    return { item, doneButton, deleteButton };
  }



  function createTodoApp(container, title = 'Список дел', whoseTodos, preloadedItems = null) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    let todosArray = [];

    function updateLocalStorage() {
      localStorage.removeItem(whoseTodos);
      localStorage.setItem(whoseTodos, JSON.stringify(todosArray));
    }

    if (preloadedItems != null) {
      for (let preloadedItem of preloadedItems) {
      todoList.append(createTodoItem(preloadedItem.name, preloadedItem.done).item);
    }
  }


    let savedItems = JSON.parse(localStorage.getItem(whoseTodos));
    if (savedItems != null) {
      for (element of savedItems) {
        todoList.append(createTodoItem(element.text, element.isDone).item);
        let arrayElement = {};
        arrayElement.text = element.text;
        arrayElement.isDone = element.isDone;
        todosArray.push(arrayElement);
      }
    }


    let uploadedItems = document.querySelectorAll('li');
    for (let uploadedItem of uploadedItems) {
      uploadedItem.childNodes[1].childNodes[0].addEventListener('click', function () {
        uploadedItem.classList.toggle('list-group-item-success');
        for (let element of todosArray) {
          for (let [key, value] of Object.entries(element)) {
            if ((key === 'text') && (value === uploadedItem.childNodes[1].childNodes[0].closest('li').childNodes[0].textContent)) {
              if (uploadedItem.classList.contains('list-group-item-success')) {
                element.isDone = true;
                updateLocalStorage();
              } else {
                element.isDone = false;
                updateLocalStorage();
              }
            }
          }
        }
        console.log(todosArray);
      })

      uploadedItem.childNodes[1].childNodes[1].addEventListener('click', function () {
        if (confirm('Вы уверены?')) {
          uploadedItem.remove();
          for (let i = 0; i < todosArray.length; ++i) {
            for (let [key, value] of Object.entries(todosArray[i])) {
              if ((key === 'text') && (value === uploadedItem.childNodes[1].childNodes[1].closest('li').childNodes[0].textContent)) {
                todosArray.splice(i, 1);
                updateLocalStorage();
              }
            }
          }
        }
        console.log(todosArray);
      });

    }



    todoItemForm.button.setAttribute('disabled', 'disabled');

    todoItemForm.form.addEventListener('input', function () {
      todoItemForm.button.removeAttribute('disabled');
      if (!todoItemForm.input.value) {
        todoItemForm.button.setAttribute('disabled', 'disabled');
      };
    });


    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);
      todoList.append(todoItem.item);

      let arrayElement = {};
      arrayElement.text = todoItem.item.childNodes[0].textContent;
      arrayElement.isDone = false;
      todosArray.push(arrayElement);
      updateLocalStorage();
      console.log(todosArray);

      todoItemForm.input.value = '';
      todoItemForm.button.setAttribute('disabled', 'disabled');

      todoItem.doneButton.addEventListener('click', function () {
        todoItem.item.classList.toggle('list-group-item-success');
        for (let element of todosArray) {
          for (let [key, value] of Object.entries(element)) {
            if ((key === 'text') && (value === todoItem.item.closest('li').childNodes[0].textContent)) {
              if (todoItem.item.classList.contains('list-group-item-success')) {
                element.isDone = true;
                updateLocalStorage();
              } else {
                element.isDone = false;
                updateLocalStorage();
              }
            }
          }
        }
        console.log(todosArray);
      });

      todoItem.deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
          for (let i = 0; i < todosArray.length; ++i) {
            for (let [key, value] of Object.entries(todosArray[i])) {
              if ((key === 'text') && (value === todoItem.item.closest('li').childNodes[0].textContent)) {
                todosArray.splice(i, 1);
                updateLocalStorage();
              }
            }
          }
        }
        console.log(todosArray);
      });


    });



  }

  window.createTodoApp = createTodoApp;

})();
