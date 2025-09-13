
// ===== グローバル変数 =====
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// ===== カレンダー生成 =====
function generateCalendar(year, month) {
  const calendarBody = document.getElementById("calendarBody");
  const calendarTitle = document.getElementById("calendarTitle");

  calendarBody.innerHTML = "";
  calendarTitle.textContent = `${year}年 ${month + 1}月`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");
      if (i === 0 && j < firstDay) {
        cell.innerHTML = "";
      } else if (date > lastDate) {
        cell.innerHTML = "";
      } else {
        setupCalendarCell(cell, year, month, date);
        date++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }
}

// ===== 日付セルセットアップ =====
function setupCalendarCell(cell, year, month, date) {
  cell.innerHTML = `<div class="date">${date}</div>`;
  cell.addEventListener("click", () => addShift(cell, year, month, date));
}

// ===== シフト追加 =====
function addShift(cell, year, month, date) {
  let shift = prompt(`${year}/${month + 1}/${date} のシフトを入力してください:`);
  if (shift) {
    let shiftDiv = document.createElement("div");
    shiftDiv.classList.add("shift");
    shiftDiv.textContent = shift;
    cell.appendChild(shiftDiv);
  }
}

// ===== 月移動 =====
function moveMonth(direction) {
  currentMonth += direction;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
}

// ===== 初期化 =====
document.addEventListener("DOMContentLoaded", () => {
  generateCalendar(currentYear, currentMonth);

  document.getElementById("prevMonth").addEventListener("click", () => moveMonth(-1));
  document.getElementById("nextMonth").addEventListener("click", () => moveMonth(1));
});