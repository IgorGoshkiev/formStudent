
// function getPageLinkDomains(w) {
//   return Array.from(w.document.getElementsByTagName('a'))

//     .map(link => link.href
//       .replace('http://', '')
//       .replace('https', '')
//     )

// }


// let client = new XMLHttpRequest();
// client.open('GET', 'http://yandex.ru');
// console.log(client.responseText);
const birth = '22.09.2022';

array = [];

const objStd = {
  name: 'test',
  faculti: 'wwwww',
  birth: '22.09.2022',
  education: '22.09.2025',
};
array.push(objStd);

const index = array.findIndex((item) => {
  if (item.birth === birth) {
    return true;
  }
});

console.log(index);

