const url = new URL(window.location.href).searchParams;
const grade = url.get('grade');
const year = url.get('year');

const all_month = 12;
const max_column = 4;
const max_row = Math.ceil(all_month/max_column);

const doc = document;
const select_menu = doc.getElementById('select_menu');

let month=1;
for (let row=1; row<=max_row; row++) {
  var row_menu = doc.createElement('div');
  row_menu.className = 'row';
  select_menu.appendChild(row_menu);
  for (let column=1; column<=max_column; column++) {
    var btn = doc.createElement('span');
    btn.textContent = String(month)+'月';
    btn.className = 'btn';
    btn.setAttribute('id',String(month));
    btn.onclick = function() {
      show_month = String(this.id);
      window.location = '../page6/index.html?grade='+grade+'&year='+year+'&month='+show_month;
    };
    row_menu.appendChild(btn);
    month++;
  };
};
