function createTopSellingCard(productsData) {
  let productsListHtml = productsData
    .map(
      (product) => `
        <div class="product-item-row">
            <span>${product.name}</span>
            <span>${product.sales} sales (${product.percentage})</span>
        </div>
    `
    )
    .join("");

  return `
        <div class="report-card top-selling">
            <h2>Top-Selling Product(s)</h2>
            <div class="filter-range">
                Filter Range: 
                <select>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                </select>
            </div>
            <div class="products-list">
                ${productsListHtml}
            </div>
        </div>
    `;
}

function createMonthlySalesCard(salesData) {
  return `
        <div class="report-card monthly-sales">
            <h2>Monthly Sales by Category</h2>
            <div class="month-year-filter">
                Month/Year:
                <select id="monthlySalesYearSelect">
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                </select>
            </div>
            <div class="chart-container" style="position: relative; height:200px; width:100%">
                <canvas id="monthlySalesChart"></canvas> </div>
        </div>
    `;
}

function createLowStockAlertsCard(itemsData) {
  let itemListHtml = itemsData
    .map(
      (item) => `
        <div class="low-stock-item">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${item.name} - ${item.currentStock} left!</span>
        </div>
    `
    )
    .join("");

  return `
        <div class="report-card low-stock-alerts">
            <h2>Low Stock Alerts</h2>
            <div class="low-stock-list">
                ${itemListHtml}
            </div>
        </div>
    `;
}

function createCustomersCard(customersData) {
  let customerListHtml = customersData
    .map(
      (customer) => `
        <div class="customer-item">
            <span>${customer.name}</span>
            <span>${customer.purchases} purchases</span>
        </div>
    `
    )
    .join("");

  return `
        <div class="report-card active-customers">
            <h2>Customers with 5+ Purchases</h2>
            <div class="customer-list">
                ${customerListHtml}
            </div>
        </div>
    `;
}

function renderMonthlySalesChart(salesData) {
  const ctx = document.getElementById("monthlySalesChart");
  if (!ctx) {
    console.error("Canvas element for monthly sales chart not found!");
    return;
  }

  const labels = salesData.map((item) => item.category);
  const dataValues = salesData.map((item) => item.sales);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Monthly Sales",
          data: dataValues,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

export function initAdminDashboard() {
  const reportsGrid = document.querySelector(".dashboard-reports-grid");

  if (!reportsGrid) {
    console.error("Error: .dashboard-reports-grid element not found!");
    return;
  }

  console.log("Admin Dashboard initialization started...");

  const mockTopSellingProducts = [
    { name: "Laptop X", sales: 120, percentage: "25%" },
    { name: "Mouse Pro", sales: 90, percentage: "18%" },
    { name: "Keyboard RGB", sales: 70, percentage: "15%" },
    { name: "Webcam HD", sales: 60, percentage: "12%" },
  ];

  const mockMonthlySalesData = [
    { category: "Electronics", sales: 50000 },
    { category: "Apparel", sales: 30000 },
    { category: "Books", sales: 15000 },
    { category: "Home Goods", sales: 25000 },
  ];

  const mockLowStockData = [
    { name: "Headphones A", currentStock: 3 },
    { name: "Charger B", currentStock: 7 },
    { name: "Speaker C", currentStock: 5 },
    { name: "Monitor D", currentStock: 2 },
  ];

  const mockCustomersData = [
    { name: "Ali Ahmadi", purchases: 8 },
    { name: "Sara Karimi", purchases: 6 },
    { name: "Reza Mousavi", purchases: 7 },
    { name: "Fatemeh Nazari", purchases: 9 },
  ];

  reportsGrid.innerHTML = "";
  reportsGrid.innerHTML += createTopSellingCard(mockTopSellingProducts);
  reportsGrid.innerHTML += createMonthlySalesCard(mockMonthlySalesData);
  reportsGrid.innerHTML += createLowStockAlertsCard(mockLowStockData);
  reportsGrid.innerHTML += createCustomersCard(mockCustomersData);

  renderMonthlySalesChart(mockMonthlySalesData);

  console.log("Admin Dashboard initialized and all report cards added!");
}
