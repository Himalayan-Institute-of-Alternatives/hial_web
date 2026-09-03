const { put } = require('@vercel/blob');
const formidable = require('formidable');
const crypto = require('crypto');
const { isAuthenticated } = require('./_lib/auth');

const ALLOWED_TYPES = ['testimonial', 'gallery-photo', 'gallery-video'];
const MAX_FILE_SIZE_BYTES = 75 * 1024 * 1024; // 75MB, generous for a short clip

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!isAuthenticated(req)) {
    res.status(401).json({ error: 'Not logged in' });
    return;
  }

  const form = formidable({ maxFileSize: MAX_FILE_SIZE_BYTES, multiples: false });

  let fields, files;
  try {
    [fields, files] = await form.parse(req);
  } catch (err) {
    res.status(400).json({ error: 'Could not read upload (file may be too large)' });
    return;
  }

  const type = Array.isArray(fields.type) ? fields.type[0] : fields.type;
  if (!ALLOWED_TYPES.includes(type)) {
    res.status(400).json({ error: 'Invalid content type' });
    return;
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  let item = { id, type, createdAt };

  try {
    if (type === 'testimonial') {
      const authorName = firstValue(fields.authorName);
      const role = firstValue(fields.role) || '';
      const quote = firstValue(fields.quote);

      if (!authorName || !quote) {
        res.status(400).json({ error: 'authorName and quote are required' });
        return;
      }
      item = { ...item, authorName, role, quote };
    } else {
      // gallery-photo or gallery-video
      const caption = firstValue(fields.caption) || '';
      const fileArr = files.media;
      const file = Array.isArray(fileArr) ? fileArr[0] : fileArr;

      if (!file) {
        res.status(400).json({ error: 'A file is required for gallery items' });
        return;
      }

      const fs = require('fs');
      const buffer = fs.readFileSync(file.filepath);
      const ext = (file.originalFilename || '').split('.').pop() || 'bin';
      const mediaPathname = `media/${id}.${ext}`;

      const mediaBlob = await put(mediaPathname, buffer, {
        access: 'public',
        addRandomSuffix: false,
        contentType: file.mimetype || undefined,
      });

      item = {
        ...item,
        caption,
        mediaUrl: mediaBlob.url,
        mediaPathname,
      };
    }

    await put(`content/items/${id}.json`, JSON.stringify(item), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    });

    res.status(200).json({ ok: true, item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
};

function firstValue(v) {
  return Array.isArray(v) ? v[0] : v;
}
