const API_URL = "http://localhost:3000";

export async function fetchAll() {
  const end = `${API_URL}/backend/get_all_products.php`;

  try {
    console.log(~`Fetching all products from ${end}`);
    const res = await fetch(end);

    if (!res.ok) {
      throw new Error(`http error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("fetch successful:", data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}
