
import React from "react";
import LibraryTabs from "./LibraryTabs";
import AddSong from "./AddSong";
import UploadSong from "./UploadSong";
import { useMusicLibrary } from "./hooks/useMusicLibrary";

const MusicLibrary = () => {
  const libraryHook = useMusicLibrary();
  const { showUploadModal, setShowUploadModal, handleAddSong, handleUploadSong } = libraryHook;
  
  console.log("MusicLibrary rendering with libraryHook:", {
    songCount: libraryHook.songs.length,
    playlistCount: libraryHook.playlists.length,
    activeTab: libraryHook.activeTab
  });
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-32">
      <LibraryTabs library={libraryHook} />
      
      <AddSong onAddSong={handleAddSong} />
      
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <UploadSong 
            onSongUploaded={handleUploadSong} 
            onClose={() => setShowUploadModal(false)} 
          />
        </div>
      )}
    </div>
  );
};

export default MusicLibrary;
