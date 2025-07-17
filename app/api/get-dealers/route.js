export default defineEventHandler(async () => {
  const WEBFLOW_TOKEN = process.env.WEBFLOW_TOKEN;

  const res = await fetch("https://api.webflow.com/v2/collections/67a328e1c604a981c58db5b3/items?offset=0&limit=1001", {
    headers: {
      Authorization: `Bearer ${WEBFLOW_TOKEN}`,
      "Content-Type": "application/json",
      "accept-version": "2.0.0"
    },
  });

  const json = await res.json();

  // Extract only the names from the fieldData
  const names = json.items.map(item => item.fieldData.name);

  return names;
});