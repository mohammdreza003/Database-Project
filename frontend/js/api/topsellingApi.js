const API_URL = "http://localhost:3000";

export async function topSellingfetch(startDate, endDate) {
    const formatStartDate = startDate.toISOString().split("T")[0];
    const formatEndDate = endDate.toISOString().split("T")[0];

    const endpoint = `${API_URL}/backend/topSelling.php?start_date=${formatStartDate}&end_date=${formatEndDate}`;
    
    try{
        console.log(`fetching top selling product from :${endpoint}`);
        const res = await fetch(endpoint);

        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("fetching top selling data successful:" , data);
        return data;        


    }catch (error) {
        console.error("Error fetching top selling data:", error);
        return null;
    }

}