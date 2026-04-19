// api/claude.js
// Vercel serverless function — proxies requests to Anthropic API
// Your API key is stored in Vercel’s environment variables, never in the code

export default async function handler(req, res) {
// Only allow POST
if (req.method !== ‘POST’) {
return res.status(405).json({ error: ‘Method not allowed’ });
}

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
return res.status(500).json({ error: { message: ‘API key not configured. Add ANTHROPIC_API_KEY to Vercel environment variables.’ } });
}

try {
const response = await fetch(‘https://api.anthropic.com/v1/messages’, {
method: ‘POST’,
headers: {
‘Content-Type’: ‘application/json’,
‘x-api-key’: apiKey,
‘anthropic-version’: ‘2023-06-01’
},
body: JSON.stringify(req.body)
});

```
const data = await response.json();
res.status(response.status).json(data);
```

} catch (err) {
res.status(500).json({ error: { message: err.message } });
}
}
