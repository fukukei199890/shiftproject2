const employeeForm = document.getElementById('employeeForm');
const employeeTable = document.getElementById('employeeTable').querySelector('tbody');

let employees = [];

// 従業員追加
employeeForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('name').value;
  const position = document.getElementById('position').value;

  const employee = { name, position };
  employees.push(employee);
  renderTable();
  employeeForm.reset();
});

// テーブル更新
function renderTable() {
  employeeTable.innerHTML = '';
  employees.forEach((emp, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.position}</td>
      <td>
        <button onclick="deleteEmployee(${index})">削除</button>
      </td>
    `;
    employeeTable.appendChild(row);
  });
}

// 従業員削除
function deleteEmployee(index) {
  employees.splice(index, 1);
  renderTable();
}