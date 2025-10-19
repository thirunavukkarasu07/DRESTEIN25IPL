import React, { useState } from 'react';

export default function AdminCSVUpload({ url, label }){
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const submit = async () => {
    if (!file) return alert('Select a file');
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(url, { method: 'POST', body: fd });
    const json = await res.json();
    setResult(json);
  }

  return (
    <div className="csv-upload">
      <label>{label}</label>
      <input type="file" accept=".csv,.json" onChange={e=>setFile(e.target.files[0])} />
      <button className="btn" onClick={submit}>Upload</button>
      {result && <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
