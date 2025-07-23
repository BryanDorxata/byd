export async function GET() {
  const WEBFLOW_TOKEN = process.env.WEBFLOW_TOKEN;

  const res = await fetch(
    'https://api.webflow.com/v2/collections/67a328e1c604a981c58db5b3/items?offset=0&limit=1001',
    {
      headers: {
        Authorization: `Bearer ${WEBFLOW_TOKEN}`,
        'Content-Type': 'application/json',
        'accept-version': '2.0.0',
      },
      cache: 'no-store',
    }
  );

  const json = await res.json();

  // Create an array of objects, each containing the name and region
  const itemsWithRegion = json.items.map((item) => ({
    name: item.fieldData.name,
    region: item.fieldData.region,
  }));

  // Sort the array. First by region, then by name.
  itemsWithRegion.sort((a, b) => {
    // Sort by region first
    if (a.region < b.region) {
      return -1;
    }
    if (a.region > b.region) {
      return 1;
    }
    // If regions are the same, sort by name
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0; // If both region and name are the same
  });

  // Extract only the names in the sorted order
  const sortedNames = itemsWithRegion.map((item) => item.name);

  return Response.json(sortedNames);
}
