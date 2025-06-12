// pages/api/upload.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Only POST allowed');

  const { filename, content } = req.body;

  if (!filename || !content) return res.status(400).json({ error: 'Missing filename or content' });

  const repo = 'Deylin-Eliac/Upload-files-/';
  const branch = 'main';
  const token = process.env.GITHUB_TOKEN;

  const url = `https://api.github.com/repos/${repo}/contents/public/${filename}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Subir ${filename}`,
      content: content, // debe venir en base64
      branch: branch,
    }),
  });

  const data = await response.json();

  if (response.status === 201) {
    return res.status(200).json({
      url: `https://${req.headers.host}/${filename}`,
      github_url: data.content.html_url,
    });
  } else {
    return res.status(500).json({ error: 'Error al subir', github: data });
  }
}