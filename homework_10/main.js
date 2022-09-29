// eslint-disable-next-line func-names
(function () {
  const studentsArray = [];

  // eslint-disable-next-line no-shadow
  function updateLocalStorage(inkey, studentsArray) {
    localStorage.removeItem(inkey);
    localStorage.setItem(inkey, JSON.stringify(studentsArray));
  }

  function findStudentInArray(array, selectElem) {
    /**
        *  функция возвращает индекс выделенного студента в базе
        * @function findStudentInArray
        * @param  {String} selectElem  контейнер li.
        *  @param  {String} array  массив со значениями.
        */
    const listingRow = [];
    const selectRow = selectElem.querySelectorAll('li');
    for (const currentElem of selectRow) {
      listingRow.push(currentElem.textContent);
    }
    const name = listingRow[0];
    const faculti = listingRow[1];
    const birth = listingRow[2];

    const index = array.findIndex((item) => {
      if (item.name === name && item.faculti === faculti && item.birth === birth) {
        return true;
      }
    });
    return index;
  }

  // создает элемент строку для заполнения данных о сстуденте
  function createItem() {
    const rowItem = document.createElement('ul');
    const colItemFIO = document.createElement('li');
    const colItemFaculty = document.createElement('li');
    const colItemBirth = document.createElement('li');
    const colItemEducation = document.createElement('li');

    rowItem.classList.add('row', 'rowselect');
    colItemFIO.classList.add('mycol', 'col');
    colItemFaculty.classList.add('mycol', 'col');
    colItemBirth.classList.add('mycol', 'col');
    colItemEducation.classList.add('mycol', 'col');
    rowItem.append(colItemFIO);
    rowItem.append(colItemFaculty);
    rowItem.append(colItemBirth);
    rowItem.append(colItemEducation);

    return {
      rowItem,
      colItemFIO,
      colItemFaculty,
      colItemBirth,
      colItemEducation,
    };
  }

  // создаем форму фильтров для поиска в базе
  function createFilter() {
    const form = document.createElement('form');
    form.classList.add('d-flex');

    const inputSearchFIO = document.createElement('input');
    inputSearchFIO.classList.add('form-control', 'me-2', 'inputFilter');
    inputSearchFIO.type = 'search';
    inputSearchFIO.id = 'searchFIO';
    inputSearchFIO.placeholder = 'По ФИО';
    inputSearchFIO.ariaLabel = 'Search';

    const butSearchFio = document.createElement('button');
    butSearchFio.id = 'buttonFio';
    butSearchFio.classList.add('btn', 'btn-outline-success');
    butSearchFio.type = 'submit';
    butSearchFio.textContent = 'Поиск';

    const inputSearchFaculty = document.createElement('input');
    inputSearchFaculty.classList.add('form-control', 'me-2', 'inputFilter');
    inputSearchFaculty.type = 'search';
    inputSearchFaculty.id = 'searchFaculty';
    inputSearchFaculty.placeholder = 'По факультету';
    inputSearchFaculty.ariaLabel = 'Search';

    const butSearchFaculty = document.createElement('button');
    butSearchFaculty.id = 'buttonFaculty';
    butSearchFaculty.classList.add('btn', 'btn-outline-success');
    butSearchFaculty.type = 'submit';
    butSearchFaculty.textContent = 'Поиск';

    const inputSearchStartEducation = document.createElement('input');
    inputSearchStartEducation.classList.add('form-control', 'me-2', 'inputFilter');
    inputSearchStartEducation.type = 'search';
    inputSearchStartEducation.id = 'searchStartEducation';
    inputSearchStartEducation.placeholder = 'Год начала обучения';
    inputSearchStartEducation.ariaLabel = 'Search';

    const butStartEducation = document.createElement('button');
    butStartEducation.id = 'butStartEducation';
    butStartEducation.classList.add('btn', 'btn-outline-success');
    butStartEducation.type = 'submit';
    butStartEducation.textContent = 'Поиск';

    const inputSearchEndEducation = document.createElement('input');
    inputSearchEndEducation.classList.add('form-control', 'me-2', 'inputFilter');
    inputSearchEndEducation.type = 'search';
    inputSearchEndEducation.id = 'searchEndEducation';
    inputSearchEndEducation.placeholder = 'Год окончания обучения';
    inputSearchEndEducation.ariaLabel = 'Search';

    const butEndEducation = document.createElement('button');
    butEndEducation.id = 'butEndEducation';
    butEndEducation.classList.add('btn', 'btn-outline-success');
    butEndEducation.type = 'submit';
    butEndEducation.textContent = 'Поиск';

    form.append(inputSearchFIO);
    form.append(butSearchFio);
    form.append(inputSearchFaculty);
    form.append(butSearchFaculty);
    form.append(inputSearchStartEducation);
    form.append(butStartEducation);
    form.append(inputSearchEndEducation);
    form.append(butEndEducation);

    return {
      form,
      inputSearchFIO,
      butSearchFio,
      inputSearchFaculty,
      butSearchFaculty,
      inputSearchStartEducation,
      butStartEducation,
      inputSearchEndEducation,
      butEndEducation,
    };
  }

  // Создаем форму для добавления и удаления студентов в таблицу
  function createForm() {
    const form = document.createElement('form');
    const legend = document.createElement('legend');

    const divFIO = document.createElement('div');
    const labelFIO = document.createElement('label');
    const inputFIO = document.createElement('input');
    inputFIO.type = 'text';
    inputFIO.id = 'inputFIO';
    inputFIO.required = true;

    const divFaculty = document.createElement('div');
    const labelFaculty = document.createElement('label');
    const inputFaculty = document.createElement('input');
    inputFaculty.type = 'text';
    inputFaculty.id = 'inputFaculty';
    inputFaculty.required = true;

    const divBirth = document.createElement('div');
    const labelBirth = document.createElement('label');
    const inputBirth = document.createElement('input');
    inputBirth.type = 'date';
    inputBirth.id = 'inputBirth';
    inputBirth.required = true;

    const divEducation = document.createElement('div');
    const labelEducation = document.createElement('label');
    const inputEducation = document.createElement('input');
    inputEducation.type = 'date';
    inputEducation.id = 'inputEducation';
    inputEducation.required = true;

    const buttonAdd = document.createElement('button');
    const buttonDell = document.createElement('button');

    form.classList.add('formAddStudent');
    legend.classList.add('legendForm');
    legend.textContent = 'Форма добавления нового студента в таблицу:';

    divFIO.classList.add('mb-3');
    labelFIO.classList.add('form-label');
    labelFIO.textContent = 'ФИО студента';
    inputFIO.classList.add('form-control');

    divFaculty.classList.add('mb-3');
    labelFaculty.classList.add('form-label');
    labelFaculty.textContent = 'Факультет';
    inputFaculty.classList.add('form-control');

    divBirth.classList.add('mb-3');
    labelBirth.classList.add('form-label');
    labelBirth.textContent = 'Дата рождения';
    inputBirth.classList.add('form-control');

    divEducation.classList.add('mb-3');
    labelEducation.classList.add('form-label');
    labelEducation.textContent = 'Год начала обучения';
    inputEducation.classList.add('form-control');

    buttonAdd.classList.add('btn', 'btn-primary');
    buttonAdd.textContent = 'Добавить студента';

    buttonDell.classList.add('btn', 'btn-primary');
    buttonDell.textContent = 'Удалить студента';
    buttonDell.id = 'idButDell';

    divFIO.append(labelFIO);
    divFIO.append(inputFIO);

    divFaculty.append(labelFaculty);
    divFaculty.append(inputFaculty);

    divBirth.append(labelBirth);
    divBirth.append(inputBirth);

    divEducation.append(labelEducation);
    divEducation.append(inputEducation);

    form.append(legend);
    form.append(divFIO);
    form.append(divFaculty);
    form.append(divBirth);
    form.append(divEducation);

    form.append(buttonAdd);
    form.append(buttonDell);

    // input.addEventListener('input', function (e) {
    //     e.preventDefault();
    //     if (input.value.length > 0) {
    //         buttonAdd.disabled = false
    //     } if (input.value.length == 0) buttonAdd.disabled = true
    // });

    return {
      form,
      inputFIO,
      inputFaculty,
      inputBirth,
      inputEducation,
      buttonAdd,
      buttonDell,
    };
  }

  function buttonRemoveItem(selectElem, idTable) {
    /**
        *  функция для удаления из таблицы выделенного студента по индексу
        * @function buttonRemoveItem
        * @param  {String} selectElem  контейнер li.
        *  @param  {String} idTable  id таблицы студентов.
        */
    const buttonDelet = document.getElementById('idButDell');
    buttonDelet.addEventListener('click', () => {
      if (confirm('Вы уверены?')) {
        selectElem.remove();
        const index = findStudentInArray(studentsArray, selectElem);
        if (index === -1) {
          alert('Not found student. Update current page!');
        } else {
          studentsArray.splice(index, 1);
          updateLocalStorage(idTable, studentsArray);
          window.location.reload();
        }
      }
    });
  }

  function readFromTableToForm(selectElem, inkey) {
    /**
        *  функция для переноса данных из таблицы в форму (при выделении нужной строчки)
        * @function readFromTableToForm
        * @param  {String} selectElem  контейнер li.
        *  @param  {String} idTable  id таблицы студентов.
        */
    const listingRow = [];
    const elemFormFIO = document.getElementById('inputFIO');
    const elemFormFaculty = document.getElementById('inputFaculty');
    const elemFormEducation = document.getElementById('inputEducation');
    const elemFornBirth = document.getElementById('inputBirth');

    const selectRow = selectElem.querySelectorAll('li');
    for (const currentElem of selectRow) {
      listingRow.push(currentElem.textContent);
    }
    elemFormFIO.value = listingRow[0];
    elemFormFaculty.value = listingRow[1];
    elemFormEducation.value = listingRow[2];
    elemFornBirth.value = listingRow[3];
    buttonRemoveItem(selectElem, inkey);
  }

  function restoresTable(inkey) {
    /**
        *  функция для востанавления содержания таблицы после обновления или закрытия страницы
        * @function restoresTable
        *  @param  {String} idTable  id таблицы студентов.
        */
    const savedItems = JSON.parse(localStorage.getItem(inkey));

    if (savedItems != null) {
      for (const element of savedItems) {
        const currentRow = createItem();
        currentRow.colItemFIO.textContent = element.name;
        currentRow.colItemFaculty.textContent = element.faculti;
        currentRow.colItemBirth.textContent = element.birth;
        currentRow.colItemEducation.textContent = element.education;
        inkey.append(currentRow.rowItem);

        const objStd = {
          name: currentRow.colItemFIO.textContent,
          faculti: currentRow.colItemFaculty.textContent,
          birth: currentRow.colItemBirth.textContent,
          education: currentRow.colItemEducation.textContent,
        };
        studentsArray.push(objStd);
      }
    }
    // Находим все новые элемента списка и можем с ними работать
    const ul = document.querySelectorAll('.rowselect');
    ul.forEach((element) => element.addEventListener('click', {
      handleEvent() {
        element.classList.toggle('rowselect-activ');
        readFromTableToForm(element, inkey);
      },
    }));
  }

  // Валидация поля формы дня рождения
  function validationBirth(checkBirth) {
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();

    const fullcheckBirth = new Date(checkBirth);
    const checkBirthYear = fullcheckBirth.getFullYear();

    const minFullDate = new Date('01.01.1900'); //01.01.1900
    const minYear = minFullDate.getFullYear();

    const answer = (minYear < checkBirthYear && checkBirthYear < nowYear);
    return answer;
  }

  // Валидация поля формы образования
  function validationEducation(checkEducation) {
    const nowDate = new Date();
    // const nowDay = nowDate.getDate();
    // const nowMonth = (nowDate.getMonth() + 1);
    const nowYear = nowDate.getFullYear();

    const minFullEducation = new Date('01.01.2000');
    const minYearEducation = minFullEducation.getFullYear();

    const chckFullEducation = new Date(checkEducation);
    const checkYear = chckFullEducation.getFullYear();

    const answer = (minYearEducation < checkYear && checkYear < nowYear + 1);
    return answer;
  }

  // функция для вычисления возраста студента
  function calculationAge(inputBirth) {
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();

    const inBirth = new Date(inputBirth);
    const inYear = inBirth.getFullYear();

    const age = nowYear - inYear;
    const staplesAge = `(${age})`;

    const strYear = inBirth.toLocaleDateString();

    return `${strYear} ${staplesAge}`;
  }

  // функция для вычисления номера курса
  function calculationNumberCourse(inputEducation) {
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();

    const inEducation = new Date(inputEducation);
    const inYearEducation = inEducation.getFullYear();

    const curs = nowYear - inYearEducation;
    let staplesCurs = `(${curs}${'курс'})`;

    const maxCurs = inYearEducation + 4;

    if (curs > 4) {
      staplesCurs = 'Закончил';
    }

    return `${inYearEducation}-${maxCurs} ${staplesCurs}`;
  }

  function createFormHTML(idForm) {
    let checkAnswerBirth = null;
    let checkAnswerRangeEducation = null;
    const idTable = document.getElementById('idTable');
    const currentForm = createForm();
    const currentRow = createItem();
    idForm.append(currentForm.form);
    restoresTable(idTable);
    // браузер создает событие submit на форме
    currentForm.buttonAdd.addEventListener('click', (e) => {
      // что бы предотвратить стандартное действие браузера
      // в данном случае мы не хотим, что бы страница перезагрузилась при отправке формы
      e.preventDefault();
      // игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!currentForm.inputFIO.value) {
        return;
      }
      if (!currentForm.inputFaculty.value) {
        return;
      }
      if (!currentForm.inputBirth.value) {
        return;
      }
      if (!currentForm.inputEducation.value) {
        return;
      }

      currentRow.colItemFIO.textContent = currentForm.inputFIO.value.trim();
      currentRow.colItemFaculty.textContent = currentForm.inputFaculty.value.trim();

      checkAnswerBirth = validationBirth(currentForm.inputBirth.valueAsDate);
      checkAnswerRangeEducation = validationEducation(currentForm.inputEducation.valueAsDate);

      if (!checkAnswerBirth) {
        currentForm.inputBirth.type = 'text';
        currentForm.inputBirth.classList.add('errorBirth');
        currentForm.inputBirth.value = '';
        currentForm.inputBirth.value = 'Error date birth! Try again!';
        return;
      }

      if (!checkAnswerRangeEducation) {
        currentForm.inputEducation.type = 'text';
        currentForm.inputEducation.classList.add('errorBirth');
        currentForm.inputEducation.value = '';
        currentForm.inputEducation.value = 'Error enter education! Try again!';
        return;
      }

      currentRow.colItemBirth.textContent = calculationAge(currentForm.inputBirth.valueAsDate);
      currentRow.colItemEducation.textContent = calculationNumberCourse(currentForm.inputEducation.valueAsDate);

      idTable.append(currentRow.rowItem);

      const objStd = {
        name: currentRow.colItemFIO.textContent,
        faculti: currentRow.colItemFaculty.textContent,
        birth: currentRow.colItemBirth.textContent,
        education: currentRow.colItemEducation.textContent,
      };

      studentsArray.push(objStd);
      updateLocalStorage(idTable, studentsArray);

      currentForm.inputFIO.value = '';
      currentForm.inputFaculty.value = '';
      currentForm.inputBirth.value = '';
      currentForm.inputEducation.value = '';
      window.location.reload();
    });
  }
  window.createFormHTML = createFormHTML;

  // функция очистки таблицы (не массива!)
  function clearTable() {
    const ul = document.querySelectorAll('.rowselect');
    ul.forEach((element) => {
      element.remove();
    });
  }

  // Для отображения в таблице содержания нужного нам массива обьектов
  function displayInTheTable(array) {
    clearTable();
    const idTable = document.getElementById('idTable');
    array.forEach((item) => {
      const currentRow = createItem();
      currentRow.colItemFIO.textContent = item.name;
      currentRow.colItemFaculty.textContent = item.faculti;
      currentRow.colItemBirth.textContent = item.birth;
      currentRow.colItemEducation.textContent = item.education;
      idTable.append(currentRow.rowItem);
    });
  }

  function filteringByValue(inValue, array) {
    /**
        *  функция возвращает индекс выделенного студента в базе
        * @function filteringByValue
        * @param  {String} inValue  значение по которому будем фильтровать.
        *  @param  {String} array  массив со значениями.
        * возвращаем новый массив (старый остается)
        */
    const arrayFilter = [];
    array.forEach((item) => {
      if (item.name === inValue || item.faculti === inValue) {
        const objStd = {
          name: item.name,
          faculti: item.faculti,
          birth: item.birth,
          education: item.education,
        };
        arrayFilter.push(objStd);
      }
    });
    return arrayFilter;
  }

  // Тоже самое только работа с датами
  function filteringByDate(invalue, array) {
    const arrayFilter = [];
    // const invalueDate = new Date(invalue);
    array.forEach((item) => {
      const educatStart = item.education.slice(0, 4);
      const educatEnd = item.education.slice(5, 9);

      if (educatStart === invalue || educatEnd === invalue) {
        const objStd = {
          name: item.name,
          faculti: item.faculti,
          birth: item.birth,
          education: item.education,
        };
        arrayFilter.push(objStd);
      }
    });
    return arrayFilter;
  }

  // Создаем заголовок таблицы
  function headerTable() {
    const rowItem = document.createElement('div');
    const colItemFIO = document.createElement('div');
    const colItemFaculty = document.createElement('div');
    const colItemBirth = document.createElement('div');
    const colItemEducation = document.createElement('div');

    const aFio = document.createElement('a');
    aFio.id = 'sortFio';
    aFio.href = '#';
    aFio.textContent = 'ФИО студента';
    aFio.classList.add('btn_col');
    colItemFIO.append(aFio);

    const aFaculty = document.createElement('a');
    aFaculty.id = 'sortFaculty';
    aFaculty.href = '#';
    aFaculty.textContent = 'Факультет';
    aFaculty.classList.add('btn_col');
    colItemFaculty.append(aFaculty);

    const aBirth = document.createElement('a');
    aBirth.id = 'sortBirth';
    aBirth.href = '#';
    aBirth.textContent = 'Дата рождения и возраст';
    aBirth.classList.add('btn_col');
    colItemBirth.append(aBirth);

    const aEducation = document.createElement('a');
    aEducation.id = 'sortEducation';
    aEducation.href = '#';
    aEducation.textContent = 'Годы обучения и номер курса';
    aEducation.classList.add('btn_col');
    colItemEducation.append(aEducation);

    rowItem.classList.add('row');
    colItemFIO.classList.add('mycol', 'col');
    colItemFaculty.classList.add('mycol', 'col');
    colItemBirth.classList.add('mycol', 'col');
    colItemEducation.classList.add('mycol', 'col');
    rowItem.append(colItemFIO);
    rowItem.append(colItemFaculty);
    rowItem.append(colItemBirth);
    rowItem.append(colItemEducation);

    return {
      rowItem,
      aFio,
      aFaculty,
      aBirth,
      aEducation,
    };
  }

  function sortByFio() {
    let arrClone = [];
    arrClone = Array.from(studentsArray);
    arrClone.sort((a, b) => a.name.localeCompare(b.name));

    displayInTheTable(arrClone);
  }

  function sortByFaculty() {
    let arrClone = [];
    arrClone = Array.from(studentsArray);
    arrClone.sort((a, b) => a.faculti.localeCompare(b.faculti));

    displayInTheTable(arrClone);
  }

  function sortByBirth() {
    let arrClone = [];
    arrClone = Array.from(studentsArray);
    arrClone.sort((a, b) => a.birth.localeCompare(b.birth));

    displayInTheTable(arrClone);
  }

  function sortByEducation() {
    let arrClone = [];
    arrClone = Array.from(studentsArray);
    arrClone.sort((a, b) => a.education.localeCompare(b.education));

    displayInTheTable(arrClone);
  }

  function createSortTable(idSort) {
    const headTable = headerTable();
    idSort.append(headTable.rowItem);

    headTable.aFio.addEventListener('click', sortByFio);
    headTable.aFaculty.addEventListener('click', sortByFaculty);
    headTable.aBirth.addEventListener('click', sortByBirth);
    headTable.aEducation.addEventListener('click', sortByEducation);
  }

  function createFormFilter(idFilter) {
    const filter = createFilter();
    idFilter.append(filter.form);

    filter.butSearchFio.addEventListener('click', (e) => {
      e.preventDefault();
      if (!filter.inputSearchFIO.value) {
        return;
      }
      const newArray = filteringByValue(filter.inputSearchFIO.value, studentsArray);
      filter.inputSearchFIO.value = '';
      displayInTheTable(newArray);
    });

    filter.butSearchFaculty.addEventListener('click', (e) => {
      e.preventDefault();
      if (!filter.inputSearchFaculty.value) {
        return;
      }
      displayInTheTable(filteringByValue(filter.inputSearchFaculty.value, studentsArray));
      filter.inputSearchFaculty.value = '';
    });

    filter.butStartEducation.addEventListener('click', (e) => {
      e.preventDefault();
      if (!filter.inputSearchStartEducation.value) {
        return;
      }
      const newArray = filteringByDate(filter.inputSearchStartEducation.value, studentsArray);
      filter.inputSearchStartEducation.value = '';
      displayInTheTable(newArray);
    });

    filter.butEndEducation.addEventListener('click', (e) => {
      e.preventDefault();
      if (!filter.inputSearchEndEducation.value) {
        return;
      }
      const newArray = filteringByDate(filter.inputSearchEndEducation.value, studentsArray);
      filter.inputSearchEndEducation.value = '';
      displayInTheTable(newArray);
    });
  }
  window.createSortTable = createSortTable;
  window.createFormFilter = createFormFilter;
}());
