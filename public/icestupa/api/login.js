const { createSessionToken, setSessionCookie } = require('./_lib/auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    res.status(500).json({ error: 'Server is not configured (ADMIN_PASSWORD missing)' });
    return;
  }

  let body = '';
  for await (const chunk of req) body += chunk;
  let password;
  try {
    ({ password } = JSON.parse(body || '{}'));
  } catch {
    res.status(400).json({ error: 'Invalid request body' });
    return;
  }

  if (typeof password !== 'string' || password !== adminPassword) {
    // Deliberately vague error - don't reveal whether the password was close
    res.status(401).json({ error: 'Incorrect password' });
    return;
  }

  const token = createSessionToken();
  setSessionCookie(res, token);
  res.status(200).json({ ok: true });
};
