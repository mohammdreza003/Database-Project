const API_URL = "http://localhost:3000"; 

export async function fetchLowStockAlerts(threshold = 10) { 
    const endpoint = `${API_URL}/backend/StockAlert.php?threshold=${threshold}`;

    try {
        console.log(`Fetching low stock products from: ${endpoint}`);
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetching low stock data successful:", data);
        return data;
    } catch (error) {
        console.error("Error fetching low stock data:", error);
        return null;
    }
}