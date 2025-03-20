// Enhance file type validation by adding more detailed error handling
const handleSongSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.type.startsWith('audio/')) {
                              setSongFile(file);
                              if (!title && file.name) {
                                                // Extract title from filename (remove extension)
                                  const titleFromFilename = file.name.replace(/\.[^/.]+$/, "");
                                                setTitle(titleFromFilename);
                              }
                } else {
                              // Detailed error handling for unsupported file types
                    toast({
                                      title: "Invalid file type",
                                      description: `The selected file is of type ${file.type}. Please upload an audio file (MP3, WAV, etc.).`,
                                      variant: "destructive"
                    });
                }
      }
};
