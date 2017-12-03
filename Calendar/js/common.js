$(function() {
	// ФОРМАТ ДАТЫ ["DD.MM.YY","DD.MM.YY"] везде двухзначное число. 01, 02 и т.д. для дней
	var reserveDays   = [ "09.01.18", "10.12.17", "13.01.18", "03.12.17"]; // массив зарезервированных дней. 
	var thisYear 	 = new Date().getFullYear(); // текущий год
	var thisMonth 	 = new Date().getMonth(); // текущий месяц
	var thisDay 	 = new Date().getDate(); // текущий день
	// создание объектов: название месяца, количесвто дней
	var jenuary   = {
		name : 'Январь',
		nameSelect: 'Января',
		nameNumber: '01',
		days : 31
	};
	var febriary  = {
		name : 'Февраль',
		nameSelect: 'Февраля',
		nameNumber: '02',
		days : 28
	};
	var march 	  = {
		name : 'Март',
		nameSelect: 'Марта',
		nameNumber: '03',
		days : 31
	};
	var april 	  = {
		name : 'Апрель',
		nameSelect: 'Апреля',
		nameNumber: '04',
		days : 30
	};
	var may 	  = {
		name : 'Май',
		nameSelect: 'Мая',
		nameNumber: '05',
		days : 31
	};
	var june 	  = {
		name : 'Июнь',
		nameSelect: 'Июня',
		nameNumber: '06',
		days : 30
	};
	var july 	  = {
		name : 'Июль',
		nameSelect: 'Июля',
		nameNumber: '07',
		days : 31
	};
	var august 	  = {
		name : 'Август',
		nameSelect: 'Августа',
		nameNumber: '08',
		days : 31
	};
	var september = {
		name : 'Сентябрь',
		nameSelect: 'Сентября',
		nameNumber: '09',
		days : 30
	};
	var october   = {
		name : 'Октябрь',
		nameSelect: 'Октября',
		nameNumber: '10',
		days : 31
	};
	var november  = {
		name : 'Ноябрь',
		nameSelect: 'Ноября',
		nameNumber: '11',
		days : 30
	};
	var december  = {
		name : 'Декабрь',
		nameSelect: 'Декабря',
		nameNumber: '12',
		days : 31
	};

	var year = [jenuary,febriary,march,april,may,june,july,august,september,october,november,december];

	// проверка на високосный год
	if (thisYear % 4 == 0) {
		if (thisYear % 100 == 0 && thisYear % 400 == 0) {
			febriary.days = 29
		} else {
			febriary.days = 28
		}
		febriary.days = 29
	} else {
		febriary.days = 28
	}

/*Функция построения календаря. */
// 1ый параметр месяц ( a - calendarMonth) 
// 2ой параметр год (b - calendarYear)
var removeRowCalendar = $('.table .tr:nth-child(7)'); // строка для восстановления 
 
 function getCalendar(a, b) {

 	
 	removeRowCalendar.appendTo('.table'); // восстановление удаленной строки

 	var positionDate = 1; // Переменная дня недели. Начинается с 1 (столбцы)
	var positionWeek = 2; // Переменная недели. Начинаеться с 2-ух, т.к. 1-шапка таблицы (строки)


	$('.table .tc').each(function () { // очистка календаря
		$(this).text('').removeClass('select-day reserve-day today day');
	});


	for (var i = 1; i<=year[a].days; i++){
		var date = new Date(b, a, i);
		var result = date.toLocaleString('en', {weekday: 'short'}).toLowerCase().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
		result = result.slice(0,3);
		switch(result){
			case "mon":
				positionDate = 1;
				$('.table .tr:nth-child('+positionWeek+') .tc:nth-child('+positionDate+')').text(i);// запись дней в таблицу (Заполнение календаря)
				break;
			case "tue":
				positionDate = 2;
				$('.table .tr:nth-child('+positionWeek+') .tc:nth-child('+positionDate+')').text(i);
				break;
			case "wed":
				positionDate = 3;
				$('.table .tr:nth-child('+positionWeek+') .tc:nth-child('+positionDate+')').text(i);
				break;
			case "thu":
				positionDate = 4;
				$('.table .tr:nth-child('+positionWeek+') .tc:nth-child('+positionDate+')').text(i);
				break;
			case "fri":
				positionDate = 5;
				$('.table .tr:nth-child('+positionWeek+') .tc:nth-child('+positionDate+')').text(i);
				break;
			case "sat":
				positionDate = 6;
				$('.table .tr:nth-child('+positionWeek+') .tc:nth-child('+positionDate+')').text(i);
				break;
			case "sun":
				positionDate = 7
				$('.table .tr:nth-child('+positionWeek+') .tc:nth-child('+positionDate+')').text(i);
				if(i != year[a].days ){ // проверка на 30/31 число в воскресенье, чтобы не добавлять лишнюю строку
					positionWeek += 1; 
				};
				break;
				
		};

	};

	// удаление лишней строки tr
	if (positionWeek == 6) {
		$('.table .tr:nth-child(7)').detach();
	}; 

	/* Вывод месяца и года календаря*/
	$('.month').text(year[a].name);
	$('.year').text(calendarYear);

	/* Проверка на зарезервированные дни; закрашивание пустых ячеек; подсветка текущего дня */

	if ( a == thisMonth & b == thisYear ){

 			$('.prev').addClass('hidden'); // скрытие стрелки "предыдущий месяц" в текущем месяце

 			$('.table .tc').each(function (){

				if ($(this).text() != ''){ // проверка на пустые ячейки и добавление класса .day

					if($(this).text() == thisDay){ // проверка на текущий день
						$(this).addClass('today day');
					} else {
						$(this).addClass('day');
					}
					
				}


			});

 	} else {
 		$('.prev').removeClass('hidden');

 		$('.table .tc').each(function (){
			if ($(this).text() != ''){ // проверка на пустые ячейки и добавление класса .day
				$(this).addClass('day');
			}
		});

 	};

 	// Проверка на присутствие зарезервированных чисел в месяце календаря
 	searchDats(reserveDays);


 };
/* КОНЕЦ Функция построения календаря. */


	var calendarMonth = thisMonth; // переменная месяца календаря
	var calendarYear = thisYear; // переменная года календаря

	getCalendar(calendarMonth, calendarYear);
 	

/* Переходы на следующий и предыдущий месяцы */
	// следующий месяц
	$('.next').click(function () { 
		
		if (calendarMonth == 11) {
			calendarMonth = 0;
			calendarYear++;
		} else {
			calendarMonth++;
		}
		
		getCalendar(calendarMonth, calendarYear);
		searchDats(selectDats);

	});

	// предыдущий месяц
	$('.prev').click(function () {
		
		if (calendarMonth == 0) {
			calendarMonth = 11;
			calendarYear--;
		} else {
			calendarMonth--;
		}
	
		getCalendar(calendarMonth, calendarYear);
		searchDats(selectDats);

	});


/* Конец Переходы на следующий и предыдущий месяцы */

	var selectDay = "", selectDats = []; // selectDay - день на который было нажатие, selectDats - массив с выбранными датами

	/* сортировка массива с датами */

		function sortArr(a, b) {

			if (a.slice(-2) > b.slice(-2)){
				return 1;
			} else if (a.slice(-2) < b.slice(-2)){
				return -1;
			} else {

				if (a.substr(3,2) > b.substr(3,2)){
					return 1;
				} else if (a.substr(3,2) < b.substr(3,2)){
					return -1;
				} else {

					if (a.substr(0,2) > b.substr(0,2)){
						return 1;
					} else {
						return -1;
					}
				}
			}
		};

	/* конец сортировка массива с датами */

	/* Функция проверки текущего месяца календаря на зарезервированные/выбранные даты*/

	function searchDats(searchArray) {

		// Проверка на присутствие выбранных дат в месяце календаря
 		for (var i = 0; i < searchArray.length ; i++) {

 			var dayClass = "";

 			if ( searchArray == selectDats ){
 				dayClass = 'select-day';
 			} else if (searchArray == reserveDays){
 				 dayClass = 'reserve-day';
 			} else {

 			}
	
 			if(String(calendarYear).slice(-2) == searchArray[i].slice(-2)){ // Проверка на год
 				if(String(year[calendarMonth].nameNumber) == searchArray[i].substr(3,2)){ // Проверка на месяц
	
 					var sA; // служебная переменная. Вырезается день из даты
	
 					if (searchArray[i][0] == '0'){
 						sA = searchArray[i].substr(1,1);
 						$('.table .tc').each(function (){
							if ($(this).text() == sA){ 
								$(this).addClass(dayClass);
								if(searchArray == reserveDays){$(this).attr('title','Этот день занят. Выберите другой.')};
							}
						});
 					} else {
 						sA = searchArray[i].substr(0,2);
 						$('.table .tc').each(function (){
							if ($(this).text() == sA){ 
								$(this).addClass(dayClass);
								if(searchArray == reserveDays){$(this).attr('title','Этот день занят. Выберите другой.')};
							}
						});
 					}
 				}
 			}		
		};
		
	}


	/* END Функция проверки текущего месяца календаря на зарезервированные/выбранные даты*/
	
	$('.table .tc').click(function () {

		if ($(this).hasClass( "reserve-day" )){  // проверка на зарезервированную дату
			// $('.select-date').text('Дата зарезервирована! Пожалуйста, выберите другую');
		} else {

			$(this).toggleClass('select-day');

			selectDay = $(this).text();
	
			if (selectDay.length < 2){
				selectDay = '0' + selectDay;
			};
	
			fullDate = selectDay+'.'+year[calendarMonth].nameNumber+'.'+String(calendarYear).slice(-2);
	
			/* Добавление/удаление даты в/из массива selectDats */
			var removeElemIndex;// индекс удаляемого элемента
			
	
			if (selectDats.indexOf(fullDate)>=0){
				removeElemIndex = selectDats.indexOf(fullDate);
				selectDats.splice(removeElemIndex,1);
			} else {
				selectDats.push(fullDate);
			}
	
	
			/* КОНЕЦ Добавление/удаление даты в/из массива selectDats */
	
	
			selectDats.sort(sortArr); // сортировка массива
			var str = selectDats.join('; ');
			$('.select-date').text("Выбранные дни: " + str);

		}

	});
	
	/* Конец Выбор даты и вывод сообщения */
	

	






});