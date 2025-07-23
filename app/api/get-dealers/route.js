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

  // Initialize an empty object to store the grouped data
  const groupedByRegion = {};

  json.items.forEach((item) => {
    const regionId = item.fieldData.region;
    const name = item.fieldData.name;

    // If the region ID doesn't exist as a key yet, create an empty array for it
    if (!groupedByRegion[regionId]) {
      groupedByRegion[regionId] = [];
    }

    // Add the name to the array corresponding to its region ID
    groupedByRegion[regionId].push(name);
  });

  // Optional: Sort the names alphabetically within each region
  for (const regionId in groupedByRegion) {
    groupedByRegion[regionId].sort(); // Sorts the array of names in place
  }

  return Response.json(groupedByRegion);
}
