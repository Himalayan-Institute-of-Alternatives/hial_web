const { list } = require('@vercel/blob');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { blobs } = await list({ prefix: 'content/items/' });

    const items = await Promise.all(
      blobs.map(async (blob) => {
        const response = await fetch(blob.url);
        return response.json();
      })
    );

    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Cache for a minute at the edge - content doesn't change every second,
    // and this avoids re-fetching every blob on every single page view.
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load content' });
  }
};
