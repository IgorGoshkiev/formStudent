(function () {

    let todosArray = [];

    function updateLocalStorage(inkey, todosArray) {
        console.log('updatelocalstorage', todosArray);
        localStorage.removeItem(inkey);
        localStorage.setItem(inkey, JSON.stringify(todosArray));
    }

    // создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }
    // создаем и возвращаем форму для создания дела
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

        input.addEventListener('input', function (e) {
            e.preventDefault();
            if (input.value.length > 0) {
                button.disabled = false
            } if (input.value.length == 0) button.disabled = true
        });

        return {
            form,
            input,
            button,
        };
    }

    //создаем и возвращаем список элементов
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    // создает элемент для списка дел 
    function createTodoItem(name) {
        let item = document.createElement('li');
        let span = document.createElement('span');
        // кнопки помещаем в элемент
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        // устанавливаем стили для элемента списка
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        span.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        //Вкладываем кнопки в элемент, что бы они обьеденились в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(span);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        }
    }


    function buttonAddRemove(todoItem, inkey, todosArray) {
        /**
        *  функция обработчик для кнопок готово и удалить
        * @function buttonAddRemove
    
        * @param  {String} todoItem  контейнер li.
        * @param  {String} inkey    ключ, который будем передавать в функцию updateLocalStorage.
        *  @param  {String} todosArray  массив со значениями.
        */
        todoItem.doneButton.addEventListener('click', function () {
            // спомощью функции togggle красим цветом классом из бутстрапа
            todoItem.item.classList.toggle('list-group-item-success');
        });

        todoItem.deleteButton.addEventListener('click', function () {
            if (confirm('Вы уверены?')) {
                let inputText = todoItem.item.querySelector('span');
                console.log('inputText for del =', inputText.textContent);
                let foundIndex = todosArray.indexOf(inputText.textContent);
                if (foundIndex === -1) {
                    console.log('Индекс не найден =', foundIndex);
                } else {
                    console.log('Индекс найден =', foundIndex);
                    todosArray.splice(foundIndex, 1);
                    updateLocalStorage(inkey, todosArray);
                    todoItem.item.remove();
                }
            }
        });
    }


    function createTodoApp(container, title = 'Список дел', inkey) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        let savedItems = JSON.parse(localStorage.getItem(inkey));
        console.log('savedItems', savedItems);
        if (savedItems != null) {
            for (element of savedItems) {
                console.log('element', element);
                let todoItem2 = createTodoItem(element);
                todoList.append(todoItem2.item);

                todosArray.push(element);
                buttonAddRemove(todoItem2, inkey, todosArray);
            }
        }
        // браузер создает событие submit на форме (для создания дела)
        todoItemForm.form.addEventListener('submit', function (e) {
            // что бы предотвратить стандартное действие браузера 
            // в данном случае мы не хотим, что бы страница перезагрузилась при отправке формы
            e.preventDefault();
            // игнорируем создание элемента, если пользователь ничего не ввел в поле
            if (!todoItemForm.input.value) {
                return;
            }
            let todoItem = createTodoItem(todoItemForm.input.value);
            // добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItem.item);

            let inputText = todoItem.item.querySelector('span');

            todosArray.push(inputText.textContent);
            console.log('todosArray начало = ', todosArray);
            updateLocalStorage(inkey, todosArray);

            buttonAddRemove(todoItem, inkey, todosArray);
            todoItemForm.button.disabled = true;
            // обнуляем значение в поле, что бы не пришлось стирать врчную
            todoItemForm.input.value = '';
        });
    }


    window.createTodoApp = createTodoApp;
})();