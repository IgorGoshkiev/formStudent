(function () {
    const sessionDict = {
        'keyMy': [],
        'keyDad': [],
        'keyMom': [],
    };
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

    function addValueToDict(inValue, inKey, dict) {
        /**
        *  функция для добавления значения в словарь по ключу
        * @function addValueToDict
    
        * @param  {String} inValue  значение для добавления в словарь.
        * @param  {String} inKey   ключ словаря, по которому будем добавлять.
        * @param  {String} dict    словарь.
        */
        for (let key in dict) {
            if (key === inKey) {
                dict[key].push(inValue);
            }
        }
    }


    function readToDict(inKey, invalue, dict) {
        /**
        *  читаем и возвращаем список значений по ключу из словаря
        * @function readToDict
    
        * @param  {String} inValue  значение для споиска нужно элемента в словаре.
        * @param  {String} inKey   ключ словаря, по которому будем определять.
        * @param  {String} dict    словарь.
        * @return {String}         возвращаем спискок по ключу
        */
        for (let key in dict) {
            if (key === inKey) {
                for (let value of dict[key]) {
                    if (value === invalue) {
                        console.log('значение =', dict[key]);
                        return dict[key];
                    } else {
                        return false;
                    }
                }
            }
        }
    }

    function removeFromLocalstorage(inkey, invalue) {
        /**
        *  функция для удаления нужного значения из localstorage
        * @function removeFromLocalstorage
    
        * @param  {String} inKey   ключ  по которому будем искать.
        * @param  {String} invalue    значение, которое будем искать в localstorage и сравнивать с тем , что есть в списке .
        */
        // for (let pairKeyValue of Object.entries(localStorage)) {
        //     if (inkey === pairKeyValue[0]) {
        //         localStorage.removeItem(pairKeyValue[0]);
        //     }
        // }

        let foundValueList = readToDict(inkey = inkey, invalue = invalue, dict = sessionDict);
        console.log('словарь1 =', sessionDict);
        console.log('считанной значени =', foundValueList);
        if (foundValueList) {
            let foundIndex = foundValueList.indexOf(invalue);
            if (foundIndex === -1) {
                console.log('Индекс не найден =', foundIndex);
            } else {
                console.log('Индекс найден =', foundIndex);
                foundValueList.splice(foundIndex, 1);
                localStorage.setItem(inkey, JSON.stringify(sessionDict[inkey]));
            }
        }



    }

    function buttonAddRemove(todoItem, inkey) {
        /**
        *  функция обработчик для кнопок готово и удалить
        * @function buttonAddRemove
    
        * @param  {String} todoItem  контейнер li .
        * @param  {String} inkey    ключ, который будем передавать в функцию удаления removeFromLocalstorage.
        */
        // добавляем обработчики на кнопки
        todoItem.doneButton.addEventListener('click', function () {
            // спомощью функции togggle красим цветом классом из бутстрапа
            todoItem.item.classList.toggle('list-group-item-success');
        });

        todoItem.deleteButton.addEventListener('click', function () {
            // функция confirm встроена в браузер и вернет true если позьзователь согласиться 
            if (confirm('Вы уверены?')) {
                let delLiText = todoItem.item.querySelector('span');
                //console.log('for remove', delLiText.textContent);
                removeFromLocalstorage(inkey, delLiText.textContent);
                todoItem.item.remove();
            }
        });
    }

    function createTodoApp(container, title = 'Список дел', inkey) {

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        if (localStorage.getItem(inkey) !== null) {
            for (let pairKeyValue of Object.entries(localStorage)) {
                if (inkey === pairKeyValue[0]) {
                    let restorTodoItem = JSON.parse(localStorage.getItem(pairKeyValue[0]));
                    for (let i = 0; i < restorTodoItem.length; i++) {
                        let todoItem2 = createTodoItem(restorTodoItem[i]);
                        todoList.append(todoItem2.item);
                        buttonAddRemove(todoItem2, inkey);
                    }

                }
            }
        }


        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);


        // браузер создает событие submit на форме (для создания дела)
        todoItemForm.form.addEventListener('submit', function (e) {
            // что бы предотвратить стандартное действие браузера 
            // в данном случае мы не хотим, что бы страница перезагрузилась при отправке формы
            e.preventDefault();
            // игнорируем создание элемента, если пользователь ничего не ввел в поле
            if (!todoItemForm.input.value) {
                return;
            }
            // заполняем словарь новыми значениями
            addValueToDict(todoItemForm.input.value, inkey, sessionDict);
            console.log('словарь3 =', sessionDict);
            localStorage.setItem(inkey, JSON.stringify(sessionDict[inkey]));

            // console.log('данные словаря', localStorage.getItem([key][1]));


            let todoItem = createTodoItem(todoItemForm.input.value);
            // добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItem.item);
            buttonAddRemove(todoItem, inkey);

            todoItemForm.button.disabled = true;
            // обнуляем значение в поле, что бы не пришлось стирать врчную
            todoItemForm.input.value = '';
        });
    }


    window.createTodoApp = createTodoApp;
})();