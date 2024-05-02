import { redirect } from "@remix-run/node";
import NewNote from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
}

// this will run on the server, not client
// triggered when a non get request is sent to this route
export async function action({ request }) {
  const formData = await request.formData();
  const noteData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };

  const aSecondWayNoteData = Object.fromEntries(formData);
  console.log("aSecondWayNoteData.title", aSecondWayNoteData.title);
  console.log("aSecondWayNoteData.content", aSecondWayNoteData.content);

  // Add valicdation

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect("/notes");
}
