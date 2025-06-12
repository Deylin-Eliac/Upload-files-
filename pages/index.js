// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const uploadImage = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(',')[1];
      const filename = file.name;

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, content: base64 }),
      });

      const json = await res.json();
      setResult(json);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Subir Imagen a GitHub y servir desde Vercel</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadImage}>Subir</button>

      {result && (
        <div>
          <p>📦 Imagen subida:</p>
          <a href={result.url} target="_blank" rel="noreferrer">{result.url}</a>
        </div>
      )}
    </div>
  );
}