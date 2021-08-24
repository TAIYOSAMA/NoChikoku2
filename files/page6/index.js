const doc = document;
const url = new URL(window.location.href).searchParams;
const d = new Date();

const GoToPage6 = function() {
  window.location = '../page7/index.html?grade='+grade+'&year='+year+'&month='+month+'&holidays='+holidays;
}

const next_btn = doc.getElementById('next_btn');
next_btn.onclick =  function() {
  GoToPage6();
};

const GetHoliday = function(year,month,weekdays=[0,6]) {
  const GetWeekday = function(year,month,day) {
    const weekday = new Date(year,month-1,day).getDay();
    return weekday
  };
  const all_day = new Date(year,month,0).getDate();
  console.log(someday);
  let holidays = [];
  for (let day=1; day<=all_day; day++) {
    var someday = new Date(year,month-1,day);
    for (let i=0; i<weekdays.length; i++) {
      if (GetWeekday(year,month,day)==weekdays[i] || amaitortedays.isNationalHoliday(someday) != null) {
        holidays.push(day);
        break;
      };
    };
  };
  return holidays;
};

const grade = url.get('grade');
const year = url.get('year');
const month = url.get('month');
const all_day = new Date(year,month,0).getDate();
const start_day = new Date(year,month-1,1).getDay();
const max_column = 7;
const max_row = Math.ceil(all_day/max_column);
const holidays = GetHoliday(year,month);

let day = 1-start_day;
const select_menu = doc.getElementById('select_menu');
for (let row=1; row<=max_row; row++) {
  var row_menu = doc.createElement('div');
  row_menu.className = 'row';
  select_menu.appendChild(row_menu);
  for (let column=1; column<=max_column; column++) {
    var btn = doc.createElement('span');
    btn.textContent = String(day)+'日';
    btn.className = 'btn';
    for (let i=0; i<holidays.length; i++) {
      if (day==holidays[i]) {
        btn.className = 'selected_btn';
        break;
      };
    };
    if (day>all_day || day<=0) {
      btn.textContent = '';
      btn.className = 'dummy_btn';
    } else {
      btn.onclick = function() {
        const this_btn = doc.getElementById(this.id);
        const this_classname = this_btn.className;
        if (this_classname=='btn') {
          this_btn.className = 'selected_btn';
          holidays.push(parseInt(this.id));
        } else {
          this_btn.className = 'btn';
          const holiday_id = holidays.indexOf(parseInt(this.id));
          holidays.splice(holiday_id,1);
        };
        console.log(holidays);
      };
    };
    btn.setAttribute('id',String(day));
    row_menu.appendChild(btn);
    day++;
  };
};
