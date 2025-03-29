document.addEventListener('DOMContentLoaded', function() {
    // Sample data for demonstration
    const monthlyData = [
        { 
            month: 'Tháng 1', 
            totalSpent: 8500000, 
            budget: 10000000, 
            status: 'achieved',
            details: [
                { category: 'Ăn uống', amount: 3000000 },
                { category: 'Di chuyển', amount: 1500000 },
                { category: 'Giải trí', amount: 2000000 },
                { category: 'Khác', amount: 2000000 }
            ]
        },
        { 
            month: 'Tháng 2', 
            totalSpent: 12000000, 
            budget: 10000000, 
            status: 'not-achieved',
            details: [
                { category: 'Ăn uống', amount: 4000000 },
                { category: 'Di chuyển', amount: 2000000 },
                { category: 'Giải trí', amount: 3000000 },
                { category: 'Khác', amount: 3000000 }
            ]
        },
        { 
            month: 'Tháng 3', 
            totalSpent: 9500000, 
            budget: 10000000, 
            status: 'achieved',
            details: [
                { category: 'Ăn uống', amount: 3500000 },
                { category: 'Di chuyển', amount: 1500000 },
                { category: 'Giải trí', amount: 2500000 },
                { category: 'Khác', amount: 2000000 }
            ]
        }
    ];

    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    // Render table data
    function renderTable(data) {
        const tableBody = document.getElementById('stats-table-body');
        tableBody.innerHTML = '';

        data.forEach(item => {
            const difference = item.budget - item.totalSpent;
            const statusClass = item.status === 'achieved' ? 'status-achieved' : 'status-not-achieved';
            const statusText = item.status === 'achieved' ? 'Đạt' : 'Không đạt';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">${item.month}</td>
                <td class="px-6 py-4 whitespace-nowrap">${formatCurrency(item.totalSpent)}</td>
                <td class="px-6 py-4 whitespace-nowrap">${formatCurrency(item.budget)}</td>
                <td class="px-6 py-4 whitespace-nowrap ${difference >= 0 ? 'text-green-600' : 'text-red-600'}">
                    ${formatCurrency(Math.abs(difference))} ${difference >= 0 ? 'tiết kiệm' : 'vượt chi'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap ${statusClass}">${statusText}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button class="text-blue-600 hover:text-blue-800" onclick="showDetails('${item.month}')">
                        <i class="fas fa-eye"></i> Xem
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Filter data
    function filterData() {
        const statusFilter = document.getElementById('status-filter').value;
        const monthFilter = document.getElementById('month-filter').value;

        let filteredData = monthlyData;

        if (statusFilter !== 'all') {
            filteredData = filteredData.filter(item => item.status === statusFilter);
        }

        if (monthFilter !== 'all') {
            const monthNum = parseInt(monthFilter);
            filteredData = filteredData.filter(item => {
                const monthName = item.month.split(' ')[1];
                return parseInt(monthName) === monthNum;
            });
        }

        renderTable(filteredData);
    }

    // Show details modal (to be implemented)
    window.showDetails = function(month) {
        const monthData = monthlyData.find(item => item.month === month);
        if (monthData) {
            alert(`Chi tiết chi tiêu ${month}:\n\n${
                monthData.details.map(d => `${d.category}: ${formatCurrency(d.amount)}`).join('\n')
            }`);
        }
    };

    // Initialize
    document.getElementById('apply-filter').addEventListener('click', filterData);
    renderTable(monthlyData);

    // Check auth status
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
});