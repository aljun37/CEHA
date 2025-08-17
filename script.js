
// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navEl = document.getElementById('nav');
if (menuBtn && navEl) {
  menuBtn.addEventListener('click', () => navEl.classList.toggle('open'));
}
// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
// Mark active link
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach(a => {
  if (a.getAttribute('href') === path) a.setAttribute('aria-current','page');
});
// Sortable tables
function sortTable(table, colIndex, type, asc){
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.querySelectorAll('tr'));
  rows.sort((a,b)=>{
    const A = a.children[colIndex].textContent.trim();
    const B = b.children[colIndex].textContent.trim();
    if(type==='number'){
      return (parseFloat(A)||0) - (parseFloat(B)||0);
    }else{
      return A.localeCompare(B);
    }
  });
  if(!asc) rows.reverse();
  rows.forEach(r=>tbody.appendChild(r));
}
document.querySelectorAll('table.sortable').forEach(table => {
  const headers = table.querySelectorAll('thead th');
  headers.forEach((th, i) => {
    th.addEventListener('click', () => {
      const type = th.dataset.type || 'text';
      const asc = !(th.dataset.sortAsc === 'true');
      headers.forEach(h=>{h.removeAttribute('data-sort-asc')});
      th.dataset.sortAsc = asc;
      sortTable(table, i, type, asc);
    });
  });
});
