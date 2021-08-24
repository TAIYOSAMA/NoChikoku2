const doc = new PDFDocument({
  size: 'A4',
  marzin: 0,
});
const stream = doc.pipe(blobStream());

var embeddedFonts = (function() {
  var fontCollection = {};

  function getFont(name, src) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function(evt) {
      var arrayBuffer = xhr.response;

      if (arrayBuffer) {
        fontCollection[name] = new Uint8Array(arrayBuffer);
        registerEmbeddedFonts(doc, embeddedFonts);

      } else {
        error = "Error downloading font resource from " + src;
      }

    };
    xhr.send(null);
  }

  getFont("Nihonngo", 'nihonngo.ttf');

  return fontCollection;
}());

function registerEmbeddedFonts(doc, fontCollection) {
  doc.registerFont("Nihonngo", fontCollection["Nihonngo"]);
}

//Write PDF----------------------------------------------
const url = new URL(window.location.href);
const params = url.searchParams;
const year = params.get('year');
const month = params.get('month');
const holiday_demo = params.get('holidays');
let holiday = [];
for (let i=0; i<=holiday_demo.length; i++) {
  if (holiday_demo[i]==',') {
    continue;
  };
  if (holiday_demo[i+1]!=',') {
    var j = holiday_demo[i]+holiday_demo[i+1]
    i++;
    holiday.push(parseInt(j))
    continue;
  };
  holiday.push(parseInt(holiday_demo[i]));
};

const class_number_demo = params.get('grade');
let class_number = [];
for (let i=0; i<class_number_demo.length; i++) {
  if (class_number_demo[i]==',') {
    continue;
  };
  class_number.push(parseInt(class_number_demo[i]));
};

function writeToPDF() {
  const GetLastDay = function(year, month) {
    return new Date(year, month, 0).getDate();
  };
  const GetHoliday = function(year,month,day) {
    return new Date(year,month,day).getDay();
  };
  const WriteLine = function(x,y,x1,y1) {
    doc.save()
      .moveTo(x,y)
      .lineTo(x1,y1)
      .stroke();
  };
  const WriteThickLine = function(x,y,x1,y1) {
    WriteLine(x-0.5,y-0.5,x1-0.5,y1-0.5);
    WriteLine(x+0.5,y+0.5,x1+0.5,y1+0.5);
  };
  const WriteDoubleXLine = function(x,y,x1,y1) {
    WriteLine(x-1,y,x1-1,y1);
    WriteLine(x+1,y,x1+1,y1);
  };
  const FillBackground = function(x,y) {
    doc.save()
      .moveTo(x+0.5,y+0.5)
      .lineTo(x+0.5,y+table_height_length-0.5)
      .lineTo(x+cell_width-0.5,y+table_height_length-0.5)
      .lineTo(x+cell_width-0.5,y+0.5)
      .lineTo(x+0.5,y+0.5)
      .fill('#d0d0d0');
  };
  const WriteChr = function(chr,x,y) {
    var font_size = cell_height/5*3
    if (font_size>12.5) {
      font_size = 12.5
    }
    doc.fontSize(font_size)
      .fillColor('black')
      .text(String(chr),x,y+cell_height/8,{
        width: cell_width,
        align: 'center'
      });
  };
  let days=GetLastDay(year,month);
  let grade_start=[1];
  for (let i=0; i<class_number.length-1; i++) {
    grade_start.push(grade_start[i]+class_number[i]);
  };
  const white_space_x = 50;
  const white_space_y = 30;
  const table_height = class_number.reduce(function(sum,element){return sum+element;},1);
  const header_space = (790-white_space_y*2)/table_height*6/5;
  const cell_height = (790-white_space_y*2-header_space)/(table_height*2+2);
  const table_height_length = cell_height*table_height;
  const table_width = [17,days-15];
  const cell_width = (610-white_space_x*2)/17
  const table_start_x = white_space_x;
  const table_end_x = [610-white_space_x,white_space_x+cell_width*(days-16+1)];
  const table_start_y = [white_space_y+header_space,white_space_y+header_space+table_height_length+cell_height*2];
  const table_end_y = [white_space_y+header_space+table_height_length,white_space_y+header_space+table_height_length*2+cell_height*2];
  doc.font('Nihonngo')
  let title_size=header_space/2
  if (title_size>35) {
    title_size=35
  };
  const text='遅刻者チェック表'+String(month)+'月';
  doc.fontSize(title_size).text(text,0,header_space/3,{
    width: 610,
    align: 'center'
  });
  let sub_title_size=header_space/3
  if (sub_title_size>20) {
    sub_title_size=20
  };
  doc.fontSize(sub_title_size).text('□の中に遅刻者の数を記入してください。',0,header_space/10*9,{
    width: 610,
    align: 'center'
  });
  for (let paragraph = 0; paragraph<=1; paragraph++) {
    for (let x = 1; x<17; x++) {
        day=x;
      if (paragraph == 1) {
        day+=16;
      };
      for (let i = 0; i <= holiday.length; i++) {
        if (day == holiday[i]) {
          if (paragraph == 0) {
            FillBackground(white_space_x+cell_width*x,table_start_y[0]);
          };
          if (paragraph == 1) {
            FillBackground(white_space_x+cell_width*x,table_start_y[1]);
          };
        };
      };
    };
  };
  for (let paragraph = 0; paragraph<=1; paragraph++) {
    var x=table_start_x;
    var x_end=table_end_x[paragraph];
    var y=table_start_y[paragraph];
    var y_end=table_end_y[paragraph];
    for (let i=0; i<=table_height; i++) {
      for (let j=0; j<=grade_start.length; j++) {
        if (i == grade_start[j]) {
          WriteThickLine(x,y,x_end,y);
          break;
        };
      };
      if (i == 0 || i == table_height) {
        WriteThickLine(x,y,x_end,y);
      } else {
        WriteLine(x,y,x_end,y);
      };
      y+=cell_height;
    };
    var x=table_start_x;
    var x_end=table_end_x[paragraph];
    var y=table_start_y[paragraph];
    var y_end=table_end_y[paragraph];
    for (let i=0; i<=table_width[paragraph]; i++) {
      if (i == 0 || i == table_width[paragraph]) {
        WriteThickLine(x,y,x,y_end);
      } else if (i == 1) {
        WriteDoubleXLine(x,y,x,y_end);
      } else {
        WriteLine(x,y,x,y_end);
      };
      x+=cell_width;
    };
  };
  var x=table_start_x+cell_width;
  var y=table_start_y[0]
  var paragraph=0
  for (let day=1;day<=days;day++) {
    if (day == 17) {
      paragraph=1
      x=table_start_x+cell_width;
    };
    y=table_start_y[paragraph]
    WriteChr(String(day)+'日',x,y);
    x+=cell_width;
  };
  for (let paragraph=0; paragraph<=1; paragraph++){
    //WriteChr('学年',table_start_x,table_start_y[paragraph]);
    WriteLine(table_start_x,table_start_y[paragraph],table_start_x+cell_width,table_start_y[paragraph]+cell_height);
  };
  for (let paragraph=0; paragraph<=1; paragraph++) {
    var x = table_start_x;
    var y = table_start_y[paragraph]+cell_height;
    for (let grade=1; grade<=class_number.length; grade++) {
      for (let i = 1; i<=class_number[grade-1]; i++) {
        WriteChr(String(grade)+'-'+String(i),x,y);
        y+=cell_height
      };
    };
  };
  doc.end();
  stream.on('finish', function() {
    // get a blob you can do whatever you like with
    const blob = stream.toBlob('application/pdf');
    // or get a blob URL for display in the browser
    const url = stream.toBlobURL('application/pdf');
    window.open(url);
    window.location.reload();
  });
}
