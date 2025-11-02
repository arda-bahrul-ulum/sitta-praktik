function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Selamat Pagi";
  } else if (hour >= 12 && hour < 15) {
    return "Selamat Siang";
  } else if (hour >= 15 && hour < 19) {
    return "Selamat Sore";
  } else {
    return "Selamat Malam";
  }
}

function showCustomAlert(message, type = "info", title = null) {
  return new Promise((resolve) => {
    const alertOverlay = document.getElementById("customAlert");
    const alertIcon = document.getElementById("customAlertIcon");
    const alertTitle = document.getElementById("customAlertTitle");
    const alertMessage = document.getElementById("customAlertMessage");
    const alertButtons = document.getElementById("customAlertButtons");

    if (!alertOverlay) return resolve();

    let iconText = "";
    let typeText = "";
    switch (type) {
      case "success":
        iconText = "✓";
        typeText = "Berhasil";
        alertIcon.className = "custom-alert-icon success";
        break;
      case "error":
        iconText = "✕";
        typeText = "Error";
        alertIcon.className = "custom-alert-icon error";
        break;
      case "warning":
        iconText = "⚠";
        typeText = "Peringatan";
        alertIcon.className = "custom-alert-icon warning";
        break;
      default:
        iconText = "ℹ";
        typeText = "Informasi";
        alertIcon.className = "custom-alert-icon info";
    }

    alertIcon.textContent = iconText;
    alertTitle.textContent = title || typeText;
    alertMessage.textContent = message;

    alertButtons.innerHTML = `
      <button class="custom-alert-btn custom-alert-btn-primary" id="customAlertOk">OK</button>
    `;

    const okButton = document.getElementById("customAlertOk");

    const closeAlert = () => {
      alertOverlay.style.display = "none";
      resolve();
    };

    okButton.onclick = closeAlert;

    const overlayHandler = function (e) {
      if (e.target === alertOverlay) {
        closeAlert();
        alertOverlay.removeEventListener("click", overlayHandler);
      }
    };
    alertOverlay.addEventListener("click", overlayHandler);

    alertOverlay.style.display = "block";
  });
}

function showCustomConfirm(message, title = "Konfirmasi") {
  return new Promise((resolve) => {
    const alertOverlay = document.getElementById("customAlert");
    const alertIcon = document.getElementById("customAlertIcon");
    const alertTitle = document.getElementById("customAlertTitle");
    const alertMessage = document.getElementById("customAlertMessage");
    const alertButtons = document.getElementById("customAlertButtons");

    if (!alertOverlay) return resolve(false);

    alertIcon.className = "custom-alert-icon warning";
    alertIcon.textContent = "?";
    alertTitle.textContent = title;
    alertMessage.textContent = message;

    alertButtons.innerHTML = `
      <button class="custom-alert-btn custom-alert-btn-secondary" id="customAlertCancel">Tidak</button>
      <button class="custom-alert-btn custom-alert-btn-primary" id="customAlertConfirm">Ya</button>
    `;

    const confirmButton = document.getElementById("customAlertConfirm");
    const cancelButton = document.getElementById("customAlertCancel");

    const closeAlert = (result) => {
      alertOverlay.style.display = "none";
      resolve(result);
    };

    confirmButton.onclick = () => closeAlert(true);
    cancelButton.onclick = () => closeAlert(false);

    const overlayHandler = function (e) {
      if (e.target === alertOverlay) {
        closeAlert(false);
        alertOverlay.removeEventListener("click", overlayHandler);
      }
    };
    alertOverlay.addEventListener("click", overlayHandler);

    alertOverlay.style.display = "block";
  });
}

window.customAlert = showCustomAlert;
window.customConfirm = showCustomConfirm;

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

async function logout() {
  const confirmed = await showCustomConfirm(
    "Apakah Anda yakin ingin logout?",
    "Konfirmasi Logout"
  );
  if (confirmed) {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  }
}

if (document.getElementById("loginForm")) {
  const loginForm = document.getElementById("loginForm");
  const btnLupaPassword = document.getElementById("btnLupaPassword");
  const btnDaftar = document.getElementById("btnDaftar");
  const modalLupaPassword = document.getElementById("modalLupaPassword");
  const modalDaftar = document.getElementById("modalDaftar");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      showCustomAlert(
        "Email dan password harus diisi!",
        "warning",
        "Validasi Form"
      );
      return;
    }

    const user = dataPengguna.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      showCustomAlert(
        "Login berhasil! Redirecting...",
        "success",
        "Login Berhasil"
      );
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } else {
      showCustomAlert("Email atau password salah!", "error", "Login Gagal");
    }
  });

  if (btnLupaPassword) {
    btnLupaPassword.addEventListener("click", function () {
      modalLupaPassword.style.display = "block";
    });
  }

  if (btnDaftar) {
    btnDaftar.addEventListener("click", function () {
      modalDaftar.style.display = "block";
    });
  }

  window.addEventListener("click", function (e) {
    if (e.target === modalLupaPassword) {
      modalLupaPassword.style.display = "none";
    }
    if (e.target === modalDaftar) {
      modalDaftar.style.display = "none";
    }
  });
}

if (document.getElementById("greetingText")) {
  const greetingText = document.getElementById("greetingText");
  greetingText.textContent = getGreeting();

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    const userName = document.getElementById("userName");
    if (userName) {
      userName.textContent = user.nama;
    }
  } else {
    window.location.href = "index.html";
  }
}

if (document.querySelector(".page-header #greetingText")) {
  const greetingText = document.getElementById("greetingText");
  const userName = document.getElementById("userName");

  if (greetingText) {
    greetingText.textContent = getGreeting();
  }

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    if (userName) {
      userName.textContent = user.nama;
    }
  } else {
    window.location.href = "index.html";
  }
}

if (document.getElementById("trackingForm")) {
  const trackingForm = document.getElementById("trackingForm");
  const trackingResult = document.getElementById("trackingResult");
  const trackingError = document.getElementById("trackingError");

  trackingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nomorDO = document.getElementById("nomorDO").value.trim();

    if (!nomorDO) {
      showCustomAlert(
        "Nomor Delivery Order harus diisi!",
        "warning",
        "Validasi Input"
      );
      return;
    }

    const trackingData = dataTracking[nomorDO];

    if (trackingData) {
      displayTrackingResult(trackingData);
      trackingResult.style.display = "block";
      trackingError.style.display = "none";
    } else {
      trackingResult.style.display = "none";
      trackingError.style.display = "block";
    }
  });

  function displayTrackingResult(data) {
    document.getElementById("namaMahasiswa").textContent = data.nama;
    document.getElementById("nomorDOValue").textContent = data.nomorDO;

    const statusBadge = document.getElementById("statusBadge");
    statusBadge.textContent = data.status;

    statusBadge.className = "status-badge";
    if (data.status.toLowerCase() === "dikirim") {
      statusBadge.classList.add("dikirim");
    } else if (data.status.toLowerCase() === "dalam perjalanan") {
      statusBadge.classList.add("dalam-perjalanan");
    }

    let progress = 0;
    if (data.status.toLowerCase() === "dikirim") {
      progress = 100;
    } else if (data.status.toLowerCase() === "dalam perjalanan") {
      progress = Math.min((data.perjalanan.length / 6) * 100, 90);
    } else {
      progress = (data.perjalanan.length / 6) * 100;
    }

    document.getElementById("progressFill").style.width = progress + "%";
    document.getElementById("progressText").textContent =
      Math.round(progress) + "%";

    document.getElementById("ekspedisi").textContent = data.ekspedisi;
    document.getElementById("tanggalKirim").textContent = data.tanggalKirim;
    document.getElementById("paket").textContent = data.paket;
    document.getElementById("total").textContent = data.total;

    const perjalananList = document.getElementById("perjalananList");
    perjalananList.innerHTML = "";

    data.perjalanan.forEach(function (perjalanan) {
      const item = document.createElement("div");
      item.className = "perjalanan-item";
      item.innerHTML = `
                <div class="waktu">${perjalanan.waktu}</div>
                <div class="keterangan">${perjalanan.keterangan}</div>
            `;
      perjalananList.appendChild(item);
    });
  }
}

if (document.getElementById("stokTableBody")) {
  let filteredStokData = dataBahanAjar;

  function saveDataBahanAjar() {
    try {
      localStorage.setItem("dataBahanAjar", JSON.stringify(dataBahanAjar));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }

  function loadDataBahanAjar() {
    try {
      const savedData = localStorage.getItem("dataBahanAjar");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          dataBahanAjar = parsedData;
        }
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }

  function readImageAsBase64(fileInput, callback) {
    const file = fileInput.files[0];
    if (!file) {
      callback(null);
      return;
    }

    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      showCustomAlert(
        "File harus berupa gambar (JPG/PNG)!",
        "warning",
        "Validasi File"
      );
      callback(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      callback(e.target.result);
    };
    reader.onerror = function () {
      showCustomAlert("Error membaca file gambar!", "error", "Error");
      callback(null);
    };
    reader.readAsDataURL(file);
  }

  window.previewCoverImage = function (input, previewId) {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById(previewId);
        const previewImg = document.getElementById(previewId + "Img");
        if (preview && previewImg) {
          previewImg.src = e.target.result;
          preview.style.display = "block";
        }
      };
      reader.readAsDataURL(file);
    } else {
      const preview = document.getElementById(previewId);
      if (preview) {
        preview.style.display = "none";
      }
    }
  };

  loadDataBahanAjar();
  filteredStokData = dataBahanAjar;
  renderStokTable();

  const btnTambahStok = document.getElementById("btnTambahStok");
  const modalTambahStok = document.getElementById("modalTambahStok");
  const formTambahStok = document.getElementById("formTambahStok");

  if (btnTambahStok) {
    btnTambahStok.addEventListener("click", function () {
      modalTambahStok.style.display = "block";
    });
  }

  if (formTambahStok) {
    formTambahStok.addEventListener("submit", async function (e) {
      e.preventDefault();

      const kodeLokasi = document.getElementById("kodeLokasi").value.trim();
      const kodeBarang = document.getElementById("kodeBarang").value.trim();
      const namaBarang = document.getElementById("namaBarang").value.trim();
      const jenisBarang = document.getElementById("jenisBarang").value.trim();
      const edisi = document.getElementById("edisi").value.trim();
      const stok = parseInt(document.getElementById("stok").value);
      const coverInput = document.getElementById("cover");

      if (!kodeLokasi || !kodeBarang || !namaBarang || !jenisBarang || !edisi) {
        showCustomAlert("Semua field harus diisi!", "warning", "Validasi Form");
        return;
      }

      if (isNaN(stok) || stok < 0) {
        showCustomAlert(
          "Stok harus berupa angka positif!",
          "warning",
          "Validasi Form"
        );
        return;
      }

      let cover = "assets/img/book.png";
      if (coverInput.files && coverInput.files.length > 0) {
        cover = await new Promise((resolve) => {
          readImageAsBase64(coverInput, (base64Data) => {
            resolve(base64Data || "assets/img/book.png");
          });
        });
      }

      const newItem = {
        kodeLokasi: kodeLokasi,
        kodeBarang: kodeBarang,
        namaBarang: namaBarang,
        jenisBarang: jenisBarang,
        edisi: edisi,
        stok: stok,
        cover: cover,
      };

      dataBahanAjar.push(newItem);
      saveDataBahanAjar();
      filteredStokData = dataBahanAjar;
      renderStokTable();

      formTambahStok.reset();
      document.getElementById("previewCover").style.display = "none";
      closeModal("modalTambahStok");

      showCustomAlert("Stok berhasil ditambahkan!", "success", "Berhasil");
    });
  }

  window.addEventListener("click", function (e) {
    if (e.target === modalTambahStok) {
      modalTambahStok.style.display = "none";
    }
    const modalEditStok = document.getElementById("modalEditStok");
    if (modalEditStok && e.target === modalEditStok) {
      modalEditStok.style.display = "none";
    }
  });

  const formEditStok = document.getElementById("formEditStok");
  const modalEditStok = document.getElementById("modalEditStok");

  if (formEditStok) {
    formEditStok.addEventListener("submit", async function (e) {
      e.preventDefault();

      const index = parseInt(document.getElementById("editIndex").value);

      if (isNaN(index) || index < 0 || index >= dataBahanAjar.length) {
        showCustomAlert("Data tidak valid!", "error", "Error");
        closeModal("modalEditStok");
        return;
      }

      const kodeLokasi = document.getElementById("editKodeLokasi").value.trim();
      const kodeBarang = document.getElementById("editKodeBarang").value.trim();
      const namaBarang = document.getElementById("editNamaBarang").value.trim();
      const jenisBarang = document
        .getElementById("editJenisBarang")
        .value.trim();
      const edisi = document.getElementById("editEdisi").value.trim();
      const stok = parseInt(document.getElementById("editStok").value);
      const coverInput = document.getElementById("editCover");
      const currentCover = dataBahanAjar[index]?.cover || "assets/img/book.png";

      if (!kodeLokasi || !kodeBarang || !namaBarang || !jenisBarang || !edisi) {
        showCustomAlert("Semua field harus diisi!", "warning", "Validasi Form");
        return;
      }

      if (isNaN(stok) || stok < 0) {
        showCustomAlert(
          "Stok harus berupa angka positif!",
          "warning",
          "Validasi Form"
        );
        return;
      }

      let cover = currentCover;
      if (coverInput.files && coverInput.files.length > 0) {
        cover = await new Promise((resolve) => {
          readImageAsBase64(coverInput, (base64Data) => {
            resolve(base64Data || currentCover);
          });
        });
      }

      dataBahanAjar[index] = {
        kodeLokasi: kodeLokasi,
        kodeBarang: kodeBarang,
        namaBarang: namaBarang,
        jenisBarang: jenisBarang,
        edisi: edisi,
        stok: stok,
        cover: cover,
      };

      saveDataBahanAjar();
      filteredStokData = dataBahanAjar;
      renderStokTable();

      formEditStok.reset();
      document.getElementById("previewEditCover").style.display = "none";
      document.getElementById("currentCoverPreview").style.display = "none";
      closeModal("modalEditStok");

      showCustomAlert("Stok berhasil diupdate!", "success", "Berhasil");
    });
  }

  window.editStok = function (index) {
    const item = dataBahanAjar[index];
    if (!item) return;

    document.getElementById("editIndex").value = index;
    document.getElementById("editKodeLokasi").value = item.kodeLokasi;
    document.getElementById("editKodeBarang").value = item.kodeBarang;
    document.getElementById("editNamaBarang").value = item.namaBarang;
    document.getElementById("editJenisBarang").value = item.jenisBarang;
    document.getElementById("editEdisi").value = item.edisi;
    document.getElementById("editStok").value = item.stok;

    document.getElementById("editCover").value = "";

    const currentCoverImg = document.getElementById("currentCoverImg");
    const currentCoverPreview = document.getElementById("currentCoverPreview");

    if (currentCoverPreview) {
      currentCoverPreview.style.display = "block";
    }

    if (currentCoverImg) {
      if (item.cover && item.cover.trim() !== "") {
        currentCoverImg.src = item.cover;
        currentCoverImg.style.display = "block";
        currentCoverImg.onerror = function () {
          this.src = "assets/img/book.png";
          this.style.display = "block";
        };
      } else {
        currentCoverImg.src = "assets/img/book.png";
        currentCoverImg.style.display = "block";
      }
    }

    document.getElementById("previewEditCover").style.display = "none";

    if (modalEditStok) {
      modalEditStok.style.display = "block";
    }
  };

  function renderStokTable() {
    const tbody = document.getElementById("stokTableBody");
    tbody.innerHTML = "";

    filteredStokData.forEach(function (item, index) {
      const originalIndex = dataBahanAjar.indexOf(item);
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.kodeLokasi}</td>
                <td>${item.kodeBarang}</td>
                <td>${item.namaBarang}</td>
                <td>${item.jenisBarang}</td>
                <td>${item.edisi}</td>
                <td>${item.stok}</td>
                <td>
                    ${
                      item.cover
                        ? `<img src="${item.cover}" alt="${item.namaBarang}" onerror="this.src='assets/img/book.png'; this.onerror=null;">`
                        : `<img src="assets/img/book.png" alt="${item.namaBarang}">`
                    }
                </td>
                <td>
                    <button class="btn btn-primary table-btn" onclick="editStok(${originalIndex})">Edit</button>
                    <button class="btn btn-danger" onclick="hapusStok(${originalIndex})">Hapus</button>
                </td>
            `;
      tbody.appendChild(row);
    });
  }

  window.searchStok = function () {
    const searchInput = document.getElementById("searchStok");
    const searchTerm = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";

    if (searchTerm === "") {
      filteredStokData = dataBahanAjar;
    } else {
      filteredStokData = dataBahanAjar.filter((item) => {
        const kodeLokasi = item.kodeLokasi ? item.kodeLokasi.toLowerCase() : "";
        const kodeBarang = item.kodeBarang ? item.kodeBarang.toLowerCase() : "";
        const namaBarang = item.namaBarang ? item.namaBarang.toLowerCase() : "";
        const jenisBarang = item.jenisBarang
          ? item.jenisBarang.toLowerCase()
          : "";
        const edisi = item.edisi ? item.edisi.toLowerCase() : "";

        return (
          kodeLokasi.includes(searchTerm) ||
          kodeBarang.includes(searchTerm) ||
          namaBarang.includes(searchTerm) ||
          jenisBarang.includes(searchTerm) ||
          edisi.includes(searchTerm)
        );
      });
    }

    renderStokTable();
  };

  window.hapusStok = async function (index) {
    const confirmed = await showCustomConfirm(
      "Apakah Anda yakin ingin menghapus stok ini?",
      "Konfirmasi Hapus"
    );
    if (confirmed) {
      dataBahanAjar.splice(index, 1);
      saveDataBahanAjar();
      filteredStokData = dataBahanAjar;
      renderStokTable();
      showCustomAlert("Stok berhasil dihapus!", "success", "Berhasil");
    }
  };
}

if (document.getElementById("monitoringTableBody")) {
  let filteredMonitoringData = dataMonitoringProgress;

  function renderMonitoringTable() {
    const tbody = document.getElementById("monitoringTableBody");
    tbody.innerHTML = "";

    filteredMonitoringData.forEach(function (item, index) {
      const row = document.createElement("tr");
      const statusClass =
        item.status === "Dikirim"
          ? "dikirim"
          : item.status === "Dalam Perjalanan"
          ? "dalam-perjalanan"
          : "";

      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.nomorDO}</td>
                <td>${item.namaMahasiswa}</td>
                <td>${item.kodeBarang}</td>
                <td>${item.namaBarang}</td>
                <td>${item.tanggalOrder}</td>
                <td><span class="status-badge ${statusClass}">${
        item.status
      }</span></td>
                <td>
                    <div class="progress-bar" style="height: 20px; margin: 0;">
                        <div class="progress-fill" style="width: ${
                          item.progress
                        }%"></div>
                        <div class="progress-text" style="font-size: 0.75em;">${
                          item.progress
                        }%</div>
                    </div>
                </td>
                <td>${item.ekspedisi}</td>
            `;
      tbody.appendChild(row);
    });
  }

  window.filterMonitoring = function () {
    const searchInput = document.getElementById("searchMonitoring");
    const filterStatusInput = document.getElementById("filterStatus");

    const searchTerm = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";
    const filterStatus = filterStatusInput
      ? filterStatusInput.value.trim()
      : "";

    filteredMonitoringData = dataMonitoringProgress.filter((item) => {
      let matchSearch = true;
      let matchStatus = true;

      if (searchTerm) {
        const nomorDO = item.nomorDO ? item.nomorDO.toLowerCase() : "";
        const namaMahasiswa = item.namaMahasiswa
          ? item.namaMahasiswa.toLowerCase()
          : "";
        const kodeBarang = item.kodeBarang ? item.kodeBarang.toLowerCase() : "";
        const namaBarang = item.namaBarang ? item.namaBarang.toLowerCase() : "";
        const ekspedisi = item.ekspedisi ? item.ekspedisi.toLowerCase() : "";

        matchSearch =
          nomorDO.includes(searchTerm) ||
          namaMahasiswa.includes(searchTerm) ||
          kodeBarang.includes(searchTerm) ||
          namaBarang.includes(searchTerm) ||
          ekspedisi.includes(searchTerm);
      }

      if (filterStatus) {
        const itemStatus = item.status ? item.status.trim() : "";
        matchStatus = itemStatus.toLowerCase() === filterStatus.toLowerCase();
      }

      return matchSearch && matchStatus;
    });

    renderMonitoringTable();
  };

  window.showTab = function (tabName, clickedBtn) {
    document.querySelectorAll(".tab-content").forEach((tab) => {
      tab.classList.remove("active");
    });
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    document.getElementById(tabName + "Tab").classList.add("active");

    if (clickedBtn) {
      clickedBtn.classList.add("active");
    } else {
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        if (
          tabName === "monitoring" &&
          btn.textContent.includes("Monitoring")
        ) {
          btn.classList.add("active");
        } else if (tabName === "rekap" && btn.textContent.includes("Rekap")) {
          btn.classList.add("active");
        }
      });
    }

    if (tabName === "monitoring") {
      if (typeof renderMonitoringTable === "function") {
        renderMonitoringTable();
      }
    } else if (tabName === "rekap") {
      if (typeof window.renderRekapTable === "function") {
        window.renderRekapTable();
      }
    }
  };

  renderMonitoringTable();
}

if (document.getElementById("rekapTableBody")) {
  let filteredRekapData = dataRekapBahanAjar;

  window.renderRekapTable = function () {
    const tbody = document.getElementById("rekapTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    filteredRekapData.forEach(function (item, index) {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.kodeBarang}</td>
                <td>${item.namaBarang}</td>
                <td>${item.jenisBarang}</td>
                <td>${item.stok}</td>
                <td>${item.totalTerjual}</td>
                <td>${item.totalPesanan}</td>
                <td>
                    <div class="progress-bar" style="height: 20px; margin: 0;">
                        <div class="progress-fill" style="width: ${
                          item.persentaseTerjual
                        }%"></div>
                        <div class="progress-text" style="font-size: 0.75em;">${
                          item.persentaseTerjual
                        }%</div>
                    </div>
                </td>
            `;
      tbody.appendChild(row);
    });
  };

  window.searchRekap = function () {
    const searchInput = document.getElementById("searchRekap");
    const searchTerm = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";

    if (searchTerm === "") {
      filteredRekapData = dataRekapBahanAjar;
    } else {
      filteredRekapData = dataRekapBahanAjar.filter((item) => {
        const kodeBarang = item.kodeBarang ? item.kodeBarang.toLowerCase() : "";
        const namaBarang = item.namaBarang ? item.namaBarang.toLowerCase() : "";
        const jenisBarang = item.jenisBarang
          ? item.jenisBarang.toLowerCase()
          : "";

        return (
          kodeBarang.includes(searchTerm) ||
          namaBarang.includes(searchTerm) ||
          jenisBarang.includes(searchTerm)
        );
      });
    }

    window.renderRekapTable();
  };

  if (
    document.getElementById("rekapTab") &&
    document.getElementById("rekapTab").classList.contains("active")
  ) {
    window.renderRekapTable();
  }
}

if (document.getElementById("historiTableBody")) {
  let filteredHistoriData = dataHistoriTransaksi;

  function renderHistoriTable() {
    const tbody = document.getElementById("historiTableBody");
    tbody.innerHTML = "";

    filteredHistoriData.forEach(function (item, index) {
      const row = document.createElement("tr");
      const statusClass = item.status === "Selesai" ? "dikirim" : "";
      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.tanggal}</td>
                <td>${item.nomorDO}</td>
                <td>${item.namaMahasiswa}</td>
                <td>${item.kodeBarang}</td>
                <td>${item.namaBarang}</td>
                <td>${item.jumlah}</td>
                <td>${item.total}</td>
                <td><span class="status-badge ${statusClass}">${
        item.status
      }</span></td>
            `;
      tbody.appendChild(row);
    });
  }

  window.filterHistori = function () {
    const searchInput = document.getElementById("searchHistori");
    const filterTanggalInput = document.getElementById("filterTanggal");
    const filterStatusInput = document.getElementById("filterStatusHistori");

    const searchTerm = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";
    const filterTanggal = filterTanggalInput
      ? filterTanggalInput.value.trim()
      : "";
    const filterStatus = filterStatusInput
      ? filterStatusInput.value.trim()
      : "";

    filteredHistoriData = dataHistoriTransaksi.filter((item) => {
      let matchSearch = true;
      let matchTanggal = true;
      let matchStatus = true;

      if (searchTerm) {
        const nomorDO = item.nomorDO ? item.nomorDO.toLowerCase() : "";
        const namaMahasiswa = item.namaMahasiswa
          ? item.namaMahasiswa.toLowerCase()
          : "";
        const kodeBarang = item.kodeBarang ? item.kodeBarang.toLowerCase() : "";
        const namaBarang = item.namaBarang ? item.namaBarang.toLowerCase() : "";

        matchSearch =
          nomorDO.includes(searchTerm) ||
          namaMahasiswa.includes(searchTerm) ||
          kodeBarang.includes(searchTerm) ||
          namaBarang.includes(searchTerm);
      }

      if (filterTanggal) {
        const itemTanggal = item.tanggal ? item.tanggal.trim() : "";
        matchTanggal = itemTanggal === filterTanggal;
      }

      if (filterStatus) {
        const itemStatus = item.status ? item.status.trim() : "";
        matchStatus = itemStatus.toLowerCase() === filterStatus.toLowerCase();
      }

      return matchSearch && matchTanggal && matchStatus;
    });

    renderHistoriTable();
  };

  window.resetFilterHistori = function () {
    const searchInput = document.getElementById("searchHistori");
    if (searchInput) searchInput.value = "";
    document.getElementById("filterTanggal").value = "";
    document.getElementById("filterStatusHistori").value = "";
    filteredHistoriData = dataHistoriTransaksi;
    renderHistoriTable();
  };

  renderHistoriTable();
}
