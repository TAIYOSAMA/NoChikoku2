const select_menu = document.getElementById('select_menu');

let btn_number = 1;
for (row=1; row<=2; row++) {
  var menu_row = document.createElement('div');
  menu_row.className = 'row';
  select_menu.appendChild(menu_row);
  for (column=1; column<=3; column++) {
    var btn = document.createElement('span');
    btn.textContent = String(btn_number);
    btn.className = 'btn';
    btn.onclick = function() {
      grade_number = this.id;
      window.location = '../page3/index.html?grade_number='+grade_number+'&grade=0';
    };
    btn.setAttribute('id',btn_number);
    menu_row.appendChild(btn);
    btn_number++;
  };
};
