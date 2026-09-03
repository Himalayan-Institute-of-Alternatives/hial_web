const { del } = require('@vercel/blob');
const { isAuthenticated } = require('./_lib/auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!isAuthenticated(req)) {
    res.status(401).json({ error: 'Not logged in' });
    return;
  }

  let body = '';
  for await (const chunk of req) body += chunk;
  let id;
  try {
    ({ id } = JSON.parse(body || '{}'));
  } catch {
    res.status(400).json({ error: 'Invalid request body' });
    return;
  }

  if (!id || typeof id !== 'string' || id.includes('/')) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }

  try {
    const itemPathname = `content/items/${id}.json`;

    // The item's Blob URL includes a store-specific host we don't have
    // stored separately, so look it up by its known pathname instead.
    const { list } = require('@vercel/blob');
    const { blobs } = await list({ prefix: itemPathname });
    const match = blobs.find((b) => b.pathname === itemPathname);

    if (!match) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    const itemRes = await fetch(match.url);
    const item = await itemRes.json();

    if (item.mediaPathname) {
      await del(item.mediaPathname).catch(() => {});
    }
    await del(itemPathname);

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
};
