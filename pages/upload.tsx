import AddFile from "@/components/AddFile";
import Head from "next/head";
import { useEffect, useState } from "react";

interface File {
  id: string;
  filename: string;
  originalName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  createdAt: number;
}

export default function Upload() {
  const [files, setFiles] = useState<File[]>([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files");
      const data = await response.json();
      // Sort Files by createdAt in descending order
      const sortedFiles: File[] = data.sort(
        (a: File, b: File) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setFiles(sortedFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [files]);

  return (
    <>
      <Head>
        <title>File Upload</title>
        <meta name="description" content="iNotes is notes web application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto mb-2 px-5 pt-20">
        <AddFile />
        <div className="-m-4 flex flex-wrap">
          {/* {notes.length > 0 ? (
            notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                handleNoteModalToggle={handleNoteModalToggle}
              />
            ))
          ) : (
            <div className="ml-4 pt-2">
              No notes available, click the Add Notes button to add a note.
            </div>
          )} */}
          Table
        </div>
      </div>
    </>
  );
}
