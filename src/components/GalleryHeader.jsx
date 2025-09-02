export default function GalleryHeader() {
  return (
    <header className="flex justify-between">
      <h1>My Videos</h1>
      <div className="flex gap-8">
        <button>New Video</button>
        <button>New Folder</button>
      </div>
    </header>
  );
}
