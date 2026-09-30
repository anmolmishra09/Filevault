/**
 * FileVault — Modern Public File Upload and Sharing Web Application
 * Core Modules:
 * 1. CONFIG & ALLOWED FORMATS
 * 2. REST API CLIENT LAYER
 * 3. UI TOAST & NOTIFICATION SYSTEM
 * 4. THEME MANAGER
 * 5. UPLOAD & DRAG/DROP MANAGER
 * 6. PUBLIC REPOSITORY & SEARCH/FILTER MANAGER
 * 7. MODAL PREVIEW & SHARING ENGINE
 */

const CONFIG = {
  API_BASE_URL: "http://localhost:3000/api",
  MAX_FILE_SIZE_BYTES: 100 * 1024 * 1024, // 100 MB
  DEMO_MODE: true,
  SEARCH_DEBOUNCE_MS: 220,
};

// Configurable Allowed Formats & Category Mapping
const FILE_CATEGORIES = {
  image: {
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    mimes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
    label: 'Image',
    iconColor: 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900',
    badge: 'IMG'
  },
  pdf: {
    extensions: ['pdf'],
    mimes: ['application/pdf'],
    label: 'PDF Document',
    iconColor: 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900',
    badge: 'PDF'
  },
  doc: {
    extensions: ['doc', 'docx'],
    mimes: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    label: 'Word Document',
    iconColor: 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900',
    badge: 'DOC'
  },
  sheet: {
    extensions: ['xls', 'xlsx', 'csv'],
    mimes: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'],
    label: 'Spreadsheet',
    iconColor: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
    badge: 'XLS'
  },
  pres: {
    extensions: ['ppt', 'pptx'],
    mimes: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    label: 'Presentation',
    iconColor: 'bg-orange-50 dark:bg-orange-950/70 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900',
    badge: 'PPT'
  },
  text: {
    extensions: ['txt', 'md', 'json', 'js', 'html', 'css'],
    mimes: ['text/plain', 'text/markdown', 'application/json', 'text/javascript', 'text/html'],
    label: 'Text / Code',
    iconColor: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    badge: 'TXT'
  },
  archive: {
    extensions: ['zip', 'rar', 'tar', 'gz', '7z'],
    mimes: ['application/zip', 'application/x-zip-compressed', 'application/x-tar', 'application/gzip'],
    label: 'Archive',
    iconColor: 'bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900',
    badge: 'ZIP'
  }
};

/**
 * Dedicated REST API service layer
 */
class ApiService {
  constructor(baseUrl, isDemo = false) {
    this.baseUrl = baseUrl;
    this.isDemo = isDemo;
    this.mockStorage = this.initSeedData();
  }

  setDemoMode(val) {
    this.isDemo = val;
  }

  setBaseUrl(url) {
    this.baseUrl = url;
  }

  initSeedData() {
    return [
      {
        id: "f-101",
        name: "Cloud_Infrastructure_2026.pdf",
        extension: "pdf",
        type: "application/pdf",
        category: "pdf",
        size: 4718592,
        uploadedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        downloadCount: 342,
        uploader: "DevOps Team",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        contentSnippet: "FileVault Cloud System Overview\n\nHigh Availability distributed public repository designed for multi-region replication."
      },
      {
        id: "f-102",
        name: "Architecture_Topology_Blueprint.webp",
        extension: "webp",
        type: "image/webp",
        category: "image",
        size: 2097152,
        uploadedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        downloadCount: 889,
        uploader: "Systems Architect",
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=70"
      },
      {
        id: "f-103",
        name: "Global_Latency_Report_Q3.csv",
        extension: "csv",
        type: "text/csv",
        category: "sheet",
        size: 524288,
        uploadedAt: new Date(Date.now() - 3600000 * 30).toISOString(),
        downloadCount: 156,
        uploader: "Performance Analyst",
        url: "#",
        contentSnippet: "Region,AvgLatencyMs,P99LatencyMs,ThroughputMbps\nus-east-1,12.4,34.1,840\neu-central-1,18.2,42.8,790\nap-southeast-1,24.6,58.3,620\nsa-east-1,45.1,98.2,410"
      },
      {
        id: "f-104",
        name: "Public_API_Specification.json",
        extension: "json",
        type: "application/json",
        category: "text",
        size: 131072,
        uploadedAt: new Date(Date.now() - 3600000 * 50).toISOString(),
        downloadCount: 673,
        uploader: "API Core Team",
        url: "#",
        contentSnippet: '{\n  "name": "FileVault REST Specification",\n  "version": "2.4.0",\n  "protocol": "HTTPS",\n  "endpoints": ["/api/files", "/api/files/upload", "/api/stats"],\n  "publicAccess": true\n}'
      },
      {
        id: "f-105",
        name: "Data_Pipeline_Bundle_v4.zip",
        extension: "zip",
        type: "application/zip",
        category: "archive",
        size: 24117248,
        uploadedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
        downloadCount: 94,
        uploader: "Data Engineering",
        url: "#"
      },
      {
        id: "f-106",
        name: "Team_Offsite_Keynote_Deck.pptx",
        extension: "pptx",
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        category: "pres",
        size: 14680064,
        uploadedAt: new Date(Date.now() - 3600000 * 96).toISOString(),
        downloadCount: 88,
        uploader: "Product Ops",
        url: "#"
      }
    ];
  }

  async getFiles() {
    if (!this.isDemo) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(`${this.baseUrl}/files`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        console.warn("Live API GET /files unreachable. Gracefully switching to demo sandbox:", err.message);
        updateApiIndicator(false);
      }
    }
    await new Promise(r => setTimeout(r, 450));
    return [...this.mockStorage];
  }

  async getFile(id) {
    if (!this.isDemo) {
      try {
        const res = await fetch(`${this.baseUrl}/files/${id}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn("Live API getFile failed, using demo store");
      }
    }
    const file = this.mockStorage.find(f => f.id === id);
    if (!file) throw new Error("File not found");
    return { ...file };
  }

  async uploadFile(fileObj, onProgress) {
    if (!this.isDemo) {
      try {
        return await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const formData = new FormData();
          formData.append("file", fileObj);

          xhr.open("POST", `${this.baseUrl}/files/upload`, true);

          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable && onProgress) {
              const pct = Math.round((e.loaded / e.total) * 100);
              onProgress(pct);
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                resolve(JSON.parse(xhr.responseText));
              } catch (e) {
                resolve({ id: "gen-" + Date.now(), name: fileObj.name });
              }
            } else {
              reject(new Error(`Server responded with ${xhr.status}`));
            }
          };

          xhr.onerror = () => reject(new Error("Network connection error"));
          xhr.send(formData);
        });
      } catch (err) {
        console.warn("Live upload endpoint failed, falling back to simulated stream:", err.message);
      }
    }

    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 22) + 12;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          if (onProgress) onProgress(100);

          const ext = getExtension(fileObj.name);
          const category = getCategoryFromExtension(ext);
          const isImage = category === 'image';
          const localUrl = URL.createObjectURL(fileObj);

          const newFileRecord = {
            id: "f-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
            name: fileObj.name,
            extension: ext,
            type: fileObj.type || 'application/octet-stream',
            category: category,
            size: fileObj.size,
            uploadedAt: new Date().toISOString(),
            downloadCount: 0,
            uploader: "Visitor (" + (navigator.platform || 'Public User').split(' ')[0] + ")",
            url: localUrl,
            thumbnailUrl: isImage ? localUrl : null,
            isLocalBlob: true
          };

          this.mockStorage.unshift(newFileRecord);
          resolve(newFileRecord);
        } else {
          if (onProgress) onProgress(progress);
        }
      }, 140);
    });
  }

  async deleteFile(id) {
    if (!this.isDemo) {
      try {
        const res = await fetch(`${this.baseUrl}/files/${id}`, { method: 'DELETE' });
        if (res.ok) return true;
      } catch (e) {
        console.warn("Live delete failed, using demo fallback");
      }
    }
    const index = this.mockStorage.findIndex(f => f.id === id);
    if (index !== -1) {
      const removed = this.mockStorage.splice(index, 1)[0];
      if (removed.isLocalBlob && removed.url && removed.url.startsWith("blob:")) {
        URL.revokeObjectURL(removed.url);
      }
      return true;
    }
    return false;
  }

  async getStats() {
    if (!this.isDemo) {
      try {
        const res = await fetch(`${this.baseUrl}/stats`);
        if (res.ok) return await res.json();
      } catch (e) {}
    }
    const totalFiles = this.mockStorage.length;
    const totalBytes = this.mockStorage.reduce((acc, f) => acc + (f.size || 0), 0);
    const totalDownloads = this.mockStorage.reduce((acc, f) => acc + (f.downloadCount || 0), 0);

    return { totalFiles, totalBytes, totalDownloads };
  }
}

const FileVaultAPI = new ApiService(CONFIG.API_BASE_URL, CONFIG.DEMO_MODE);

// Utility functions
function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatDate(isoString) {
  if (!isoString) return 'Just now';
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function getExtension(filename) {
  if (!filename || filename.indexOf('.') === -1) return '';
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
}

function getCategoryFromExtension(ext) {
  if (!ext) return 'doc';
  for (const [key, meta] of Object.entries(FILE_CATEGORIES)) {
    if (meta.extensions.includes(ext.toLowerCase())) return key;
  }
  return 'doc';
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Toast System
const toastContainer = document.getElementById('toast-container');

function showToast(message, type = 'info', duration = 3800) {
  const toast = document.createElement('div');
  toast.className = `pointer-events-auto flex items-center gap-3 p-3.5 rounded-2xl border shadow-xl text-xs font-semibold transform transition-all duration-300 translate-y-3 opacity-0 ${
    type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800' :
    type === 'error' ? 'bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-800' :
    type === 'warning' ? 'bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-800' :
    'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-800 dark:border-slate-200'
  }`;

  let icon = '';
  if (type === 'success') {
    icon = `<svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>`;
  } else if (type === 'error') {
    icon = `<svg class="w-4 h-4 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>`;
  } else {
    icon = `<svg class="w-4 h-4 text-brand-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
  }

  toast.innerHTML = `
    ${icon}
    <span class="flex-1">${message}</span>
    <button class="text-slate-400 hover:text-slate-700 dark:hover:text-white ml-1">
      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  `;

  toast.querySelector('button').addEventListener('click', () => {
    toast.classList.add('opacity-0', 'translate-y-3');
    setTimeout(() => toast.remove(), 250);
  });

  toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.remove('opacity-0', 'translate-y-3'));

  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.add('opacity-0', 'translate-y-3');
      setTimeout(() => toast.remove(), 300);
    }
  }, duration);
}

// Theme handling
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function initTheme() {
  const savedTheme = localStorage.getItem('filevault_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

  if (isDark) {
    document.documentElement.classList.add('dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }
}

themeToggleBtn.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('filevault_theme', isDark ? 'dark' : 'light');
  if (isDark) {
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
    showToast("Switched to Dark Mode", "info", 1800);
  } else {
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
    showToast("Switched to Light Mode", "info", 1800);
  }
});

initTheme();

// Mode Toggle (Live API vs Demo Sandbox)
const modeToggleBtn = document.getElementById('mode-toggle-btn');
const apiStatusDot = document.getElementById('api-status-dot');
const apiStatusText = document.getElementById('api-status-text');

function updateApiIndicator(isLive) {
  if (isLive) {
    apiStatusDot.className = 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse';
    apiStatusText.textContent = 'REST API Connected';
    FileVaultAPI.setDemoMode(false);
  } else {
    apiStatusDot.className = 'w-2 h-2 rounded-full bg-amber-500';
    apiStatusText.textContent = 'Demo Mode (Local)';
    FileVaultAPI.setDemoMode(true);
  }
}

modeToggleBtn.addEventListener('click', () => {
  const newMode = !FileVaultAPI.isDemo;
  updateApiIndicator(!newMode);
  showToast(newMode ? "Demo Mode Active: Storage isolated locally" : "Live API Mode Active: Targeting " + FileVaultAPI.baseUrl, "warning");
  loadFiles();
  loadStats();
});

updateApiIndicator(false);

// Upload & Drag/Drop
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const uploadQueueContainer = document.getElementById('upload-queue-container');
const uploadQueueList = document.getElementById('upload-queue-list');
const queueCountBadge = document.getElementById('queue-count');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

let activeQueue = [];

dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    fileInput.click();
  }
});

['dragenter', 'dragover'].forEach(eventName => {
  dropZone.addEventListener(eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.add('dropzone-active');
  }, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove('dropzone-active');
  }, false);
});

dropZone.addEventListener('drop', (e) => {
  const dt = e.dataTransfer;
  const files = dt.files;
  if (files && files.length > 0) {
    handleIncomingFiles(Array.from(files));
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files && fileInput.files.length > 0) {
    handleIncomingFiles(Array.from(fileInput.files));
    fileInput.value = '';
  }
});

function handleIncomingFiles(fileList) {
  if (!fileList.length) return;
  const allowedExtList = Object.values(FILE_CATEGORIES).flatMap(c => c.extensions);

  fileList.forEach(file => {
    if (file.size === 0) {
      showToast(`"${file.name}" is an empty file (0 Bytes). Upload rejected.`, 'error');
      return;
    }
    if (file.size > CONFIG.MAX_FILE_SIZE_BYTES) {
      showToast(`"${file.name}" exceeds the maximum 100 MB size limit.`, 'error');
      return;
    }
    const ext = getExtension(file.name);
    if (!allowedExtList.includes(ext)) {
      showToast(`Format .${ext || 'unknown'} is not supported on FileVault.`, 'error');
      return;
    }
    const isDuplicate = activeQueue.some(item => item.name === file.name && item.size === file.size && !item.isFinished);
    if (isDuplicate) {
      showToast(`"${file.name}" is already pending in the upload queue.`, 'warning');
      return;
    }
    enqueueFile(file);
  });
}

function enqueueFile(file) {
  const queueId = "q-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6);
  const ext = getExtension(file.name);
  const catKey = getCategoryFromExtension(ext);
  const catMeta = FILE_CATEGORIES[catKey];

  const queueItem = {
    id: queueId,
    file: file,
    name: file.name,
    size: file.size,
    ext: ext,
    catMeta: catMeta,
    progress: 0,
    status: 'uploading',
    isFinished: false
  };

  activeQueue.unshift(queueItem);
  renderQueueUI();
  initiateUpload(queueItem);
}

function renderQueueUI() {
  if (activeQueue.length === 0) {
    uploadQueueContainer.classList.add('hidden');
    return;
  }

  uploadQueueContainer.classList.remove('hidden');
  queueCountBadge.textContent = activeQueue.length;

  const hasFinished = activeQueue.some(i => i.isFinished);
  if (hasFinished) {
    clearCompletedBtn.classList.remove('hidden');
  } else {
    clearCompletedBtn.classList.add('hidden');
  }

  uploadQueueList.innerHTML = activeQueue.map(item => `
    <div id="queue-item-${item.id}" class="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all flex flex-col gap-2.5">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 overflow-hidden">
          <span class="w-8 h-8 rounded-lg ${item.catMeta.iconColor} flex items-center justify-center text-[10px] font-extrabold shrink-0 border">
            ${item.catMeta.badge}
          </span>
          <div class="truncate">
            <p class="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">${item.name}</p>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">${item.catMeta.label} &bull; ${formatBytes(item.size)}</p>
          </div>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <span id="queue-status-text-${item.id}" class="text-xs font-mono font-medium ${
            item.status === 'success' ? 'text-emerald-600 dark:text-emerald-400 font-bold' :
            item.status === 'error' ? 'text-rose-600 dark:text-rose-400' :
            'text-brand-600 dark:text-brand-400'
          }">
            ${item.status === 'success' ? '✓ Uploaded' : item.status === 'error' ? '✕ Failed' : item.progress + '%'}
          </span>

          ${!item.isFinished ? `
            <button onclick="cancelQueueItem('${item.id}')" title="Cancel upload" class="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          ` : `
            <button onclick="dismissQueueItem('${item.id}')" title="Dismiss" class="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          `}
        </div>
      </div>

      <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
        <div 
          id="queue-bar-${item.id}"
          class="h-1.5 rounded-full transition-all duration-200 ${
            item.status === 'success' ? 'bg-emerald-500' :
            item.status === 'error' ? 'bg-rose-500' :
            'bg-gradient-to-r from-brand-600 to-cyan-500'
          }" 
          style="width: ${item.progress}%"
        ></div>
      </div>
    </div>
  `).join('');
}

async function initiateUpload(queueItem) {
  try {
    await FileVaultAPI.uploadFile(queueItem.file, (progress) => {
      queueItem.progress = progress;
      const bar = document.getElementById(`queue-bar-${queueItem.id}`);
      const text = document.getElementById(`queue-status-text-${queueItem.id}`);
      if (bar) bar.style.width = progress + '%';
      if (text && queueItem.status === 'uploading') text.textContent = progress + '%';
    });

    queueItem.status = 'success';
    queueItem.isFinished = true;
    renderQueueUI();

    showToast(`✓ "${queueItem.name}" published to repository`, 'success');
    loadFiles();
    loadStats();
  } catch (err) {
    queueItem.status = 'error';
    queueItem.isFinished = true;
    renderQueueUI();
    showToast(`Upload failed for "${queueItem.name}": ${err.message}`, 'error');
  }
}

window.cancelQueueItem = function(id) {
  const idx = activeQueue.findIndex(q => q.id === id);
  if (idx !== -1) {
    activeQueue.splice(idx, 1);
    renderQueueUI();
    showToast("Upload cancelled", "warning", 2000);
  }
};

window.dismissQueueItem = function(id) {
  const idx = activeQueue.findIndex(q => q.id === id);
  if (idx !== -1) {
    activeQueue.splice(idx, 1);
    renderQueueUI();
  }
};

clearCompletedBtn.addEventListener('click', () => {
  activeQueue = activeQueue.filter(i => !i.isFinished);
  renderQueueUI();
});

// File Library Display, Search & Filter
const filesSkeleton = document.getElementById('files-skeleton-container');
const filesGrid = document.getElementById('files-grid');
const emptyState = document.getElementById('empty-state');
const errorState = document.getElementById('error-state');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const sortSelect = document.getElementById('sort-select');
const categoryPills = document.querySelectorAll('.cat-pill');
const refreshFilesBtn = document.getElementById('refresh-files-btn');
const refreshIcon = document.getElementById('refresh-icon');
const libraryTotalCount = document.getElementById('library-total-count');

let rawFilesList = [];
let activeFilterCategory = 'all';
let activeSearchQuery = '';
let activeSortKey = 'newest';

async function loadFiles() {
  filesSkeleton.classList.remove('hidden');
  filesGrid.classList.add('hidden');
  emptyState.classList.add('hidden');
  errorState.classList.add('hidden');
  refreshIcon.classList.add('animate-spin');

  try {
    const files = await FileVaultAPI.getFiles();
    rawFilesList = files;
    applyFiltersAndRender();
  } catch (err) {
    filesSkeleton.classList.add('hidden');
    errorState.classList.remove('hidden');
    document.getElementById('error-state-message').textContent = err.message || "Failed to communicate with repository.";
  } finally {
    refreshIcon.classList.remove('animate-spin');
  }
}

function applyFiltersAndRender() {
  let filtered = [...rawFilesList];

  if (activeFilterCategory !== 'all') {
    filtered = filtered.filter(f => f.category === activeFilterCategory);
  }

  if (activeSearchQuery.trim()) {
    const q = activeSearchQuery.toLowerCase().trim();
    filtered = filtered.filter(f => 
      f.name.toLowerCase().includes(q) ||
      f.extension.toLowerCase().includes(q) ||
      (f.uploader && f.uploader.toLowerCase().includes(q))
    );
  }

  filtered.sort((a, b) => {
    switch (activeSortKey) {
      case 'newest':
        return new Date(b.uploadedAt) - new Date(a.uploadedAt);
      case 'oldest':
        return new Date(a.uploadedAt) - new Date(b.uploadedAt);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'size-desc':
        return (b.size || 0) - (a.size || 0);
      case 'size-asc':
        return (a.size || 0) - (b.size || 0);
      case 'downloads-desc':
        return (b.downloadCount || 0) - (a.downloadCount || 0);
      default:
        return 0;
    }
  });

  libraryTotalCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'file' : 'files'}`;
  filesSkeleton.classList.add('hidden');

  if (filtered.length === 0) {
    filesGrid.classList.add('hidden');
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    filesGrid.classList.remove('hidden');
    renderFileCards(filtered);
  }
}

function renderFileCards(items) {
  filesGrid.innerHTML = items.map(file => {
    const catKey = file.category || getCategoryFromExtension(file.extension);
    const catMeta = FILE_CATEGORIES[catKey] || FILE_CATEGORIES.doc;
    const isImage = catKey === 'image' && (file.thumbnailUrl || file.url);

    return `
      <div class="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden">
        
        <div class="relative bg-slate-100 dark:bg-slate-950/80 h-38 sm:h-42 flex items-center justify-center border-b border-slate-100 dark:border-slate-800/80 overflow-hidden cursor-pointer" onclick="openPreviewModal('${file.id}')">
          ${isImage ? `
            <img 
              src="${file.thumbnailUrl || file.url}" 
              alt="${file.name}" 
              loading="lazy" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onerror="this.parentElement.innerHTML='<span class=\\'text-xs text-slate-400 font-mono\\'>Image Preview</span>'"
            />
          ` : `
            <div class="w-14 h-14 rounded-2xl ${catMeta.iconColor} border flex items-center justify-center font-extrabold text-sm shadow-sm group-hover:scale-110 transition-transform">
              ${catMeta.badge}
            </div>
          `}

          <span class="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 backdrop-blur-sm shadow-sm">
            Public File
          </span>

          <div class="absolute inset-0 bg-brand-900/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
            <span class="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 text-brand-600 dark:text-brand-300 text-xs font-semibold shadow-lg">
              Preview
            </span>
          </div>
        </div>

        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white truncate" title="${file.name}">
              ${file.name}
            </h4>
            <div class="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
              <span>${formatBytes(file.size)}</span>
              <span>&bull;</span>
              <span>${formatDate(file.uploadedAt)}</span>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-1">
            <div class="flex items-center gap-1">
              <button onclick="openPreviewModal('${file.id}')" title="Preview file" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/60 transition">
                Preview
              </button>

              <button onclick="downloadFile('${file.id}')" title="Download to device" class="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>

              <button onclick="copyShareLink('${file.id}')" title="Copy public share URL" class="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </button>
            </div>

            <button onclick="confirmDeleteFile('${file.id}', '${encodeURIComponent(file.name)}')" title="Delete from public storage" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>

        </div>

      </div>
    `;
  }).join('');
}

// Search and Filter Listeners
searchInput.addEventListener('input', debounce((e) => {
  activeSearchQuery = e.target.value;
  if (activeSearchQuery.trim()) {
    clearSearchBtn.classList.remove('hidden');
  } else {
    clearSearchBtn.classList.add('hidden');
  }
  applyFiltersAndRender();
}, CONFIG.SEARCH_DEBOUNCE_MS));

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  activeSearchQuery = '';
  clearSearchBtn.classList.add('hidden');
  applyFiltersAndRender();
});

sortSelect.addEventListener('change', (e) => {
  activeSortKey = e.target.value;
  applyFiltersAndRender();
});

categoryPills.forEach(pill => {
  pill.addEventListener('click', () => {
    categoryPills.forEach(p => {
      p.classList.remove('bg-brand-600', 'text-white', 'shadow-sm');
      p.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
    });
    pill.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
    pill.classList.add('bg-brand-600', 'text-white', 'shadow-sm');

    activeFilterCategory = pill.dataset.cat;
    applyFiltersAndRender();
  });
});

refreshFilesBtn.addEventListener('click', () => {
  showToast("Syncing public repository with backend...", "info", 1800);
  loadFiles();
  loadStats();
});

document.getElementById('retry-load-btn').addEventListener('click', () => loadFiles());
document.getElementById('empty-upload-cta').addEventListener('click', () => {
  window.location.hash = 'upload-section';
  fileInput.click();
});

// Modal Preview System
const previewModal = document.getElementById('preview-modal');
const modalFileTitle = document.getElementById('modal-file-title');
const modalFileMeta = document.getElementById('modal-file-meta');
const modalTypeIcon = document.getElementById('modal-type-icon');
const modalContentCanvas = document.getElementById('modal-content-canvas');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalShareBtn = document.getElementById('modal-share-btn');
const modalDownloadBtn = document.getElementById('modal-download-btn');
const modalActionCopyUrl = document.getElementById('modal-action-copy-url');
const modalActionDownload = document.getElementById('modal-action-download');
const modalDownloadCounter = document.getElementById('modal-download-counter');

let currentViewingFile = null;

window.openPreviewModal = async function(fileId) {
  try {
    const file = await FileVaultAPI.getFile(fileId);
    if (!file) return;

    currentViewingFile = file;

    const catKey = file.category || getCategoryFromExtension(file.extension);
    const catMeta = FILE_CATEGORIES[catKey] || FILE_CATEGORIES.doc;

    modalFileTitle.textContent = file.name;
    modalFileMeta.textContent = `${catMeta.label} • ${formatBytes(file.size)} • Uploaded ${formatDate(file.uploadedAt)}`;
    modalTypeIcon.textContent = catMeta.badge;
    modalTypeIcon.className = `w-8 h-8 rounded-lg ${catMeta.iconColor} border flex items-center justify-center font-bold text-xs shrink-0`;
    modalDownloadCounter.textContent = `${file.downloadCount || 0} global downloads`;

    renderModalCanvasContent(file, catKey);

    previewModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  } catch (e) {
    showToast("Unable to load preview: " + e.message, "error");
  }
};

function renderModalCanvasContent(file, category) {
  modalContentCanvas.innerHTML = '';

  if (category === 'image' && file.url) {
    const img = document.createElement('img');
    img.src = file.url;
    img.alt = file.name;
    img.className = 'max-h-[68vh] max-w-full rounded-xl object-contain shadow-md';
    modalContentCanvas.appendChild(img);
  } else if (category === 'pdf' && file.url && file.url !== '#') {
    const iframe = document.createElement('iframe');
    iframe.src = file.url;
    iframe.title = file.name;
    iframe.className = 'w-full h-[65vh] rounded-xl border border-slate-200 dark:border-slate-800 bg-white';
    modalContentCanvas.appendChild(iframe);
  } else if ((category === 'text' || category === 'sheet') && file.contentSnippet) {
    const pre = document.createElement('pre');
    pre.className = 'w-full max-h-[65vh] p-4 bg-slate-900 text-slate-100 rounded-xl overflow-auto font-mono text-xs leading-relaxed border border-slate-800 select-text';
    pre.textContent = file.contentSnippet;
    modalContentCanvas.appendChild(pre);
  } else {
    const fallback = document.createElement('div');
    fallback.className = 'text-center py-10 px-6 max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm';
    fallback.innerHTML = `
      <div class="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center font-bold text-base mb-3 border border-amber-200 dark:border-amber-900">
        ${file.extension.toUpperCase()}
      </div>
      <h4 class="text-base font-bold text-slate-900 dark:text-white">In-Browser Preview Unavailable</h4>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
        This proprietary file format (${file.extension.toUpperCase()}) cannot be rendered directly in the web browser sandbox. Download to view natively.
      </p>
      <button onclick="downloadFile('${file.id}')" class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-md transition">
        Download File to Device
      </button>
    `;
    modalContentCanvas.appendChild(fallback);
  }
}

function closePreviewModal() {
  previewModal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  currentViewingFile = null;
}

modalCloseBtn.addEventListener('click', closePreviewModal);
previewModal.addEventListener('click', (e) => {
  if (e.target === previewModal) closePreviewModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !previewModal.classList.contains('hidden')) {
    closePreviewModal();
  }
});

// Download and Share Links
window.downloadFile = function(fileId) {
  const file = rawFilesList.find(f => f.id === fileId);
  if (!file) return;

  file.downloadCount = (file.downloadCount || 0) + 1;
  
  const link = document.createElement('a');
  link.href = file.url && file.url !== '#' ? file.url : 'data:text/plain;charset=utf-8,' + encodeURIComponent(file.contentSnippet || "FileVault Public Document: " + file.name);
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Download started for "${file.name}"`, "success");
  loadStats();
};

window.copyShareLink = function(fileId) {
  const shareUrl = `${window.location.origin}${window.location.pathname}?fileId=${fileId}`;
  const tempInput = document.createElement('input');
  tempInput.value = shareUrl;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    showToast("✓ Public share link copied to clipboard!", "success");
  } catch (err) {
    showToast("Share URL: " + shareUrl, "info", 5000);
  }
  document.body.removeChild(tempInput);
};

modalShareBtn.addEventListener('click', () => {
  if (currentViewingFile) copyShareLink(currentViewingFile.id);
});
modalActionCopyUrl.addEventListener('click', () => {
  if (currentViewingFile) copyShareLink(currentViewingFile.id);
});
modalDownloadBtn.addEventListener('click', () => {
  if (currentViewingFile) downloadFile(currentViewingFile.id);
});
modalActionDownload.addEventListener('click', (e) => {
  e.preventDefault();
  if (currentViewingFile) downloadFile(currentViewingFile.id);
});

// File Deletion
window.confirmDeleteFile = async function(fileId, encodedName) {
  const fileName = decodeURIComponent(encodedName);
  const proceed = window.confirm ? confirm(`Delete public file "${fileName}"?\n\nThis will remove it from the repository permanently.`) : true;
  if (!proceed) return;

  try {
    const success = await FileVaultAPI.deleteFile(fileId);
    if (success) {
      showToast(`File "${fileName}" deleted from repository`, "info");
      loadFiles();
      loadStats();
    } else {
      showToast("Failed to delete file", "error");
    }
  } catch (err) {
    showToast("Delete error: " + err.message, "error");
  }
};

// Platform Stats
async function loadStats() {
  try {
    const stats = await FileVaultAPI.getStats();
    document.getElementById('stat-total-files').textContent = stats.totalFiles.toLocaleString();
    document.getElementById('stat-storage-used').textContent = formatBytes(stats.totalBytes);
    document.getElementById('stat-total-downloads').textContent = stats.totalDownloads.toLocaleString();
  } catch (e) {
    console.warn("Could not load stats", e);
  }
}

// Architecture / API Specs Modal
const docsModal = document.getElementById('docs-modal');
const openDocsBtn = document.getElementById('open-docs-btn');
const mobileOpenDocs = document.getElementById('mobile-open-docs');
const footerDocsLink = document.getElementById('footer-docs-link');
const docsCloseBtn = document.getElementById('docs-close-btn');
const docsOkBtn = document.getElementById('docs-ok-btn');

function toggleDocsModal(show) {
  if (show) {
    docsModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  } else {
    docsModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

[openDocsBtn, mobileOpenDocs, footerDocsLink].forEach(btn => {
  if (btn) btn.addEventListener('click', () => toggleDocsModal(true));
});

[docsCloseBtn, docsOkBtn].forEach(btn => {
  if (btn) btn.addEventListener('click', () => toggleDocsModal(false));
});

docsModal.addEventListener('click', (e) => {
  if (e.target === docsModal) toggleDocsModal(false);
});

// Mobile menu drawer
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Deep link checks (?fileId=f-101)
function checkUrlDeepLink() {
  const urlParams = new URLSearchParams(window.location.search);
  const targetFileId = urlParams.get('fileId');
  if (targetFileId) {
    setTimeout(() => {
      openPreviewModal(targetFileId);
    }, 500);
  }
}

// App Initialization
window.addEventListener('DOMContentLoaded', () => {
  loadFiles();
  loadStats();
  checkUrlDeepLink();
});