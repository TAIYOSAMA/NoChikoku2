const select_menu = document.getElementById('select_menu');

const GetList = function(list) {
  let lists = [];
  let lc='';
  for (let i=0; i<=list.length; i++) {
    if (list[i]==',' || i == list.length) {
      lists.push(parseInt(lc));
      lc='';
      continue;
    };
    lc+=list[i];
  };
  return lists;
};

let grade = new URL(window.location.href).searchParams.get('grade')
if (grade == 0) {
  grade=[];
} else {
  grade = GetList(grade);
};

const header = document.querySelector('h1');
header.textContent = String(grade.length+1)+header.textContent;

let btn_number = 1;
for (row=1; row<=3; row++) {
  var menu_row = document.createElement('div');
  menu_row.className = 'row';
  select_menu.appendChild(menu_row);
  for (column=1; column<=3; column++) {
    var btn = document.createElement('span');
    btn.textContent = String(btn_number);
    btn.className = 'btn';
    btn.onclick = function() {
      grade.push(parseInt(this.id))
      grade_number = new URL(window.location.href).searchParams.get('grade_number');
      if (parseInt(grade_number)==grade.length) {
        window.location = '../page4/index.html?grade='+grade;
      } else {
        console.log(parseInt(grade_number),grade.length);
        window.location = '../page3/index.html?grade_number='+grade_number+'&grade='+grade;
      };
    };
    btn.setAttribute('id',btn_number);
    menu_row.appendChild(btn);
    btn_number++;
  };
};
