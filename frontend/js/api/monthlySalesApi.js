// frontend/js/api/monthlySalesApi.js

const API_URL = "http://localhost:3000";

export async function fetchMonthlySales(year , month = null) {
    let endpoint = `${API_URL}/backend/monthlySalesByCat.php?year=${year}`;
    if (month !== null){
        endpoint += `&month=${month}`;
    }

    try{
        console.log(`fetching monthly sales from : ${endpoint}`);
        const res = await fetch(endpoint);
        
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json(); 

        if (data && data.message && data.message === "no sales found") {
            console.warn("Monthly sales data: Backend returned no sales message.");
            return []; 
        }
        
        if (Array.isArray(data)) {
            const formattedData = data.map(item => ({
                category: item.category_name, 
                sales: item.total_revenue,   
                month_year_label: item.month 
            }));
            console.log("Fetching monthly sales data successful (formatted):", formattedData);
            return formattedData;
        } else {
            console.warn("Monthly sales data: Unexpected format from backend.", data);
            return []; 
        }

    }catch (error){
        console.error("Error fetching monthly sales data:", error);
        return null; 
    }
}