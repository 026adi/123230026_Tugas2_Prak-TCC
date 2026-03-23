const API = "http://localhost:3000/api/v1/notes";

const judul = document.getElementById("judul");
const isi = document.getElementById("isi");
const list = document.getElementById("list");
const noteId = document.getElementById("noteId");



// 🔥 AMBIL DATA + TAMPILKAN
async function getNotes() {
  try {
    const res = await fetch(API);
    const result = await res.json();
    const data = result.data;

    list.innerHTML = "";

    data.forEach(note => {

      // 🔥 FORMAT TANGGAL
      const tgl = new Date(note.tanggal_dibuat);
      const tanggal = `${tgl.getDate().toString().padStart(2,'0')}-${(tgl.getMonth()+1).toString().padStart(2,'0')}-${tgl.getFullYear()}`;

      list.innerHTML += `
        <li class="card">
          <div class="card-header" onclick="toggleDetail(${note.id})">
            
            <div class="title">
              <span class="badge">${note.id}</span>

              <div>
                <div>${note.judul}</div>
                <small class="date">${tanggal}</small>
              </div>
            </div>

          </div>

          <div class="card-body" id="detail-${note.id}">
            <p>${note.isi}</p>

            <div class="actions">
              <button onclick="editNote(${note.id}, \`${note.judul}\`, \`${note.isi}\`)">
                ✏️
              </button>

              <button onclick="deleteNote(${note.id})">
                🗑️
              </button>
            </div>
          </div>
        </li>
      `;
    });

  } catch (err) {
    console.error(err);
  }
}

// 🔥 SIMPAN (CREATE + UPDATE)
async function simpanNote() {
  try {
    const data = {
      judul: judul.value,
      isi: isi.value
    };

    if (!judul.value) {
      alert("Judul wajib diisi!");
      return;
    }

    if (noteId.value) {
      // UPDATE
      await fetch(`${API}/${noteId.value}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      alert("Catatan berhasil diupdate!");
    } else {
      // CREATE
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      alert("Catatan berhasil ditambahkan!");
    }

    // reset form
    judul.value = "";
    isi.value = "";
    noteId.value = "";

    getNotes();

  } catch (err) {
    console.error("ERROR SIMPAN:", err);
  }
}

// 🔥 DELETE
async function deleteNote(id) {
  const konfirmasi = confirm("Yakin mau hapus catatan ini?");

  if (!konfirmasi) return;

  try {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    alert("Catatan berhasil dihapus!");

    getNotes();

  } catch (err) {
    console.error("ERROR DELETE:", err);
  }
}

// 🔥 EDIT
function editNote(id, j, i) {
  noteId.value = id;
  judul.value = j;
  isi.value = i;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function toggleDetail(id) {
  const el = document.getElementById(`detail-${id}`);
  el.style.display = el.style.display === "block" ? "none" : "block";
}

// 🔥 LOAD AWAL
getNotes();