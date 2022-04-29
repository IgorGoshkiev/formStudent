
// ************************ Задание-1 ***********************************
function calculate_area_rectangle(x1, y1, x2, y2) {
  let cathet1 = Math.abs(x2 - x1);
  let cathet2 = Math.abs(y2 - y1);

  let area = cathet1 * cathet2
  return Math.round(area)
};


let area_rectangle = calculate_area_rectangle(x1 = 2, y1 = 3, x2 = 10, y2 = 5);
console.log('Первое задание');
console.log('Площадь прямоуголника1 =', area_rectangle);

area_rectangle = calculate_area_rectangle(x1 = 10, y1 = 5, x2 = 2, y2 = 3);
console.log('Площадь прямоуголника2 =', area_rectangle);

area_rectangle = calculate_area_rectangle(x1 = -5, y1 = 8, x2 = 10, y2 = 5);
console.log('Площадь прямоуголника3 =', area_rectangle);

area_rectangle = calculate_area_rectangle(x1 = 5, y1 = 8, x2 = 5, y2 = 5);
console.log('Площадь прямоуголника5 =', area_rectangle);

area_rectangle = calculate_area_rectangle(x1 = 8, y1 = 1, x2 = 5, y2 = 1);
console.log('Площадь прямоуголника6 =', area_rectangle);
console.log('-------------------------------------------------------');

// ************************* Задание-2 *************************************

function comparing_two_numbers(number1, number2, precision) {
  // let rounded_num1 = number1.toFixed(precision);
  // let rounded_num2 = number2.toFixed(precision);
  let koef;

  if (precision <= 0) {
    rounded_num1 = number1;
    rounded_num2 = number2;
  } else {
    koef = Math.pow(10, precision);
    rounded_num1 = Math.floor(number1 * koef) / koef;
    rounded_num2 = Math.floor(number2 * koef) / koef;
  }


  console.log('Второе задание');
  console.log('Первое округленное число =', rounded_num1);
  console.log('Второе округленное число =', rounded_num2);

  console.log('Сравнение данных чисел:');
  console.log('Первое число > Второго? Результат =', rounded_num1 > rounded_num2);
  console.log('Первое число < Второго? Результат =', rounded_num1 < rounded_num2);
  console.log('Первое число >= Второго ? Результат =', rounded_num1 >= rounded_num2);
  console.log('Первое число <= Второго ? Результат =', rounded_num1 <= rounded_num2);
  console.log('Первое число равно Второму ? Результат =', rounded_num1 === rounded_num2);
  console.log('Первое число не равно Второму ? Результат =', rounded_num1 != rounded_num2);
  console.log('----------------------------------------------------------------------------')
};


comparing_two_numbers(number1 = 13.123456789, number2 = 2.123, precision = 5);
comparing_two_numbers(number1 = 13.890123, number2 = 2.891564, precision = 2);
comparing_two_numbers(number1 = 13.890123, number2 = 2.891564, precision = 3);

// *********************** Задание-3 **************************************************

function generator_odd_number(start_range, end_range) {
  let odd_number;

  let range = Math.abs(end_range - start_range);
  let random_number = Math.round(Math.random() * range - 1);

  if ((random_number % 2) === 1) {
    console.log('Нечетное cлучайное число =', random_number);
  } else {
    random_number += 1;
    console.log('Нечетное cлучайное число =', random_number);
  }

};

console.log('Третье задание');
generator_odd_number(start_range=100, end_range=-5);
generator_odd_number(start_range=-3, end_range=-10);
generator_odd_number(start_range=2, end_range=5);
generator_odd_number(start_range=0, end_range=100);
