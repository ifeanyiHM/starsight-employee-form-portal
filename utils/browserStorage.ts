// Save an array of File objects to localStorage (as base64 strings)
export async function saveFilesToLocalStorage(files: File[]) {
  const base64Files = await Promise.all(
    files.map(
      (file) =>
        new Promise<{ name: string; type: string; data: string }>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              name: file.name,
              type: file.type,
              data: reader.result as string,
            });
          };
          reader.readAsDataURL(file);
        })
    )
  );
  localStorage.setItem("storedFiles", JSON.stringify(base64Files));
}

// Load back as an array of real File objects
export function loadFilesFromLocalStorage(): File[] {
  const raw = localStorage.getItem("storedFiles");
  if (!raw) return [];
  const parsed: { name: string; type: string; data: string }[] =
    JSON.parse(raw);
  return parsed.map(
    (f) =>
      new File([dataURLToBlob(f.data)], f.name, {
        type: f.type,
      })
  );
}

// Helper to convert dataURL → Blob
function dataURLToBlob(dataURL: string): Blob {
  const [meta, content] = dataURL.split(",");
  const mime = meta.match(/:(.*?);/)?.[1] || "application/octet-stream";
  const bstr = atob(content);
  const u8arr = new Uint8Array(bstr.length);
  for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
  return new Blob([u8arr], { type: mime });
}
