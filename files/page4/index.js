const url = new URL(window.location.href).searchParams;
const grade = url.get('grade');

const d = new Date();
const year = d.getFullYear();

const doc = document;
const row = 1;
const select_menu = doc.getElementById('select_menu');
const row_menu = doc.createElement('div');
row_menu.className = 'row';
select_menu.appendChild(row_menu);
for (let column=1; column<=3; column++) {
  var show_year = year-2+column;
  var btn = doc.createElement('span');
  btn.textContent = String(show_year)+'年';
  btn.className = 'btn';
  btn.setAttribute('id',show_year);
  btn.onclick = function() {
    params_year = this.id
    window.location = '../page5/index.html?grade='+grade+'&year='+params_year;
  };
  row_menu.appendChild(btn);
}
