//刷新数据
function refresh() {
  loadData(data);
}

//加载列表数据
function loadData(data) {
  var list = document.getElementById("list");
  list.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    let row = data[i];
    list.innerHTML +=
      `<a class="weui-cell weui-cell_access" href="javascript:onRowClick(${i});">\
      <div class="weui-cell__bd">\
        <p>${row}</p>\
      </div>\
      <div class="weui-cell__ft">\
      </div>\
    </a>`
  }
}

//行点击事件
function onRowClick(idx) {
  alert(`click ${idx}`);
}
