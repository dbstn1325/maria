document.addEventListener('DOMContentLoaded', () => {
    loadHTMLTable([]);
})

const loadHTMLTable = (data) => {
    const table = document.querySelector('table tbody');
    
    
    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>예약자가 없습니다</td><tr>";
    }
}
