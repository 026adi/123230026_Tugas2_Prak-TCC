import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const API =
    "https://notes-backend-764024000152.us-central1.run.app/api/v1/notes";

  const [notes, setNotes] = useState([]);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [editId, setEditId] = useState(null);

  // GET NOTES
  const getNotes = async () => {
    try {
      const response = await axios.get(API);
      setNotes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // ADD & UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, {
          judul,
          isi,
        });
      } else {
        await axios.post(API, {
          judul,
          isi,
        });
      }

      setJudul("");
      setIsi("");
      setEditId(null);

      await getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const deleteNote = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus catatan ini?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`);

      await getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT
  const editNote = (note) => {
    setJudul(note.judul);
    setIsi(note.isi);
    setEditId(note.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f1e8",
        padding: "30px 15px",
        fontFamily: "Arial",
      }}
    >
      {/* FORM */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 0 15px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#c9971a",
            marginBottom: "25px",
            fontSize: "30px",
          }}
        >
          📒 Catatan Harian
        </h1>

        <form onSubmit={handleSubmit}>
          {/* JUDUL */}
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                fontWeight: "bold",
                color: "#444",
              }}
            >
              Judul
            </label>

            <input
              type="text"
              placeholder="Masukkan judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
                outline: "none",
              }}
              required
            />
          </div>

          {/* ISI */}
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                fontWeight: "bold",
                color: "#444",
              }}
            >
              Isi Catatan
            </label>

            <textarea
              placeholder="Tulis catatan..."
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                minHeight: "100px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
                resize: "none",
                outline: "none",
              }}
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "12px",
              backgroundColor: "#c89b2d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {editId ? "Update Catatan" : "Tambah Catatan"}
          </button>
        </form>
      </div>

      {/* TITLE */}
      <h2
        style={{
          textAlign: "center",
          marginTop: "40px",
          marginBottom: "25px",
        }}
      >
        Daftar Catatan
      </h2>

      {/* NOTES */}
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 0 10px rgba(0,0,0,0.08)",
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            <h3
              style={{
                marginBottom: "10px",
                color: "#444",
              }}
            >
              {note.judul}
            </h3>

            <p
              style={{
                color: "#666",
              }}
            >
              {note.isi}
            </p>

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {/* EDIT */}
              <button
                onClick={() => editNote(note)}
                style={{
                  flex: "1",
                  minWidth: "100px",
                  backgroundColor: "orange",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteNote(note.id)}
                style={{
                  flex: "1",
                  minWidth: "100px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;