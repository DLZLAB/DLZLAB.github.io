<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Admin — Songs Manager</title>
<meta name="robots" content="noindex,nofollow" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:#0d0407;color:#f5e6d0;line-height:1.6;min-height:100vh;padding:2rem;-webkit-font-smoothing:antialiased}
a{color:#d4a043;text-decoration:none}
a:hover{color:#e8c47a}
button{cursor:pointer;font-family:inherit}

.container{max-width:800px;margin:0 auto}
h1{font-size:1.8rem;font-weight:800;margin-bottom:0.3rem;display:flex;align-items:center;gap:0.6rem}
h1 i{color:#d4a043}
.sub{color:#b8945a;font-size:0.9rem;margin-bottom:2rem}
.back{display:inline-flex;align-items:center;gap:0.4rem;color:#b8945a;font-size:0.85rem;margin-bottom:1.5rem}
.back:hover{color:#d4a043}

.card{background:linear-gradient(145deg,rgba(60,15,28,0.4),rgba(30,8,14,0.6));backdrop-filter:blur(16px);border:1px solid rgba(212,160,67,0.2);border-radius:16px;padding:1.5rem;margin-bottom:2rem}
.card h2{font-size:1.2rem;font-weight:700;margin-bottom:1.2rem;color:#d4a043;display:flex;align-items:center;gap:0.5rem}

.form-group{margin-bottom:1rem}
.form-group label{display:block;font-weight:600;font-size:0.85rem;color:#d4af7a;margin-bottom:0.35rem}
.form-group input,.form-group textarea{width:100%;padding:0.7rem 1rem;border-radius:10px;border:1px solid rgba(212,160,67,0.2);background:rgba(120,30,55,0.15);color:#f5e6d0;font-size:0.95rem;outline:none;transition:all 0.2s;font-family:inherit}
.form-group input:focus,.form-group textarea:focus{border-color:#d4a043;box-shadow:0 0 0 3px rgba(212,160,67,0.12)}
.form-group textarea{min-height:100px;resize:vertical}
.form-group input[type="file"]{padding:0.5rem;background:transparent;border-style:dashed}
.form-group input[type="file"]::file-selector-button{padding:0.4rem 1rem;border-radius:8px;border:1px solid rgba(212,160,67,0.2);background:rgba(120,30,55,0.3);color:#d4a043;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:inherit;margin-right:0.8rem}
.form-group input[type="file"]::file-selector-button:hover{background:#d4a043;color:#fff}
.hint{font-size:0.78rem;color:#6b5a3a;margin-top:0.25rem}

.btn{padding:0.7rem 1.4rem;border-radius:10px;font-weight:600;font-size:0.9rem;border:0;display:inline-flex;align-items:center;gap:0.5rem;transition:all 0.25s}
.btn-primary{background:linear-gradient(135deg,#6b1d2f,#d4a043);color:#fff;box-shadow:0 4px 20px rgba(212,160,67,0.25)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 28px rgba(212,160,67,0.35)}
.btn-danger{background:rgba(220,50,50,0.15);border:1px solid rgba(220,50,50,0.3);color:#e74c3c}
.btn-danger:hover{background:rgba(220,50,50,0.25)}
.btn-sm{padding:0.35rem 0.8rem;font-size:0.8rem}

.msg{padding:0.8rem 1rem;border-radius:10px;margin-bottom:1rem;font-size:0.9rem}
.msg-success{background:rgba(46,204,113,0.12);border:1px solid rgba(46,204,113,0.25);color:#2ecc71}
.msg-error{background:rgba(231,76,60,0.12);border:1px solid rgba(231,76,60,0.25);color:#e74c3c}

.song-row{display:flex;align-items:center;gap:1rem;padding:0.8rem 0;border-bottom:1px solid rgba(212,160,67,0.08)}
.song-row:last-child{border-bottom:0}
.song-row-info{flex:1;min-width:0}
.song-row-info strong{display:block;font-size:0.95rem;color:#f5e6d0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.song-row-info span{font-size:0.8rem;color:#b8945a}
.song-row-actions{display:flex;gap:0.4rem;flex-shrink:0}

.tag{display:inline-block;padding:0.15rem 0.5rem;border-radius:6px;font-size:0.7rem;font-weight:600;background:rgba(212,160,67,0.1);color:#d4a043;margin-top:0.2rem}
.tag-audio{background:rgba(46,204,113,0.1);color:#2ecc71;margin-left:0.3rem}

.empty-list{text-align:center;padding:2rem;color:#6b5a3a;font-size:0.9rem}
</style>
</head>
<body>
<div class="container">
  <a class="back" href="/"><i class="fas fa-arrow-left"></i> Back to Site</a>
  <h1><i class="fas fa-headphones"></i> Songs Manager</h1>
  <p class="sub">Add, edit, and manage your songs. Audio files are stored in <code>songs/audio/</code>.</p>

<?php
$dataFile = __DIR__ . '/../../songs/data.json';
$audioDir = __DIR__ . '/../../songs/audio/';

if (!is_dir($audioDir)) mkdir($audioDir, 0755, true);

function loadSongs($file) {
  if (!file_exists($file)) return [];
  $data = json_decode(file_get_contents($file), true);
  return $data['songs'] ?? [];
}

function saveSongs($file, $songs) {
  file_put_contents($file, json_encode(['songs' => $songs], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$songs = loadSongs($dataFile);
$msg = '';

// Delete
if (isset($_GET['delete'])) {
  $delId = (int)$_GET['delete'];
  $songs = array_values(array_filter($songs, fn($s) => $s['id'] !== $delId));
  saveSongs($dataFile, $songs);
  $msg = '<div class="msg msg-success"><i class="fas fa-check-circle"></i> Song deleted.</div>';
  $songs = loadSongs($dataFile);
}

// Add
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add'])) {
  $title = trim($_POST['title'] ?? '');
  $artist = trim($_POST['artist'] ?? '');
  $poet = trim($_POST['poet'] ?? '');

  if (!$title) {
    $msg = '<div class="msg msg-error"><i class="fas fa-exclamation-circle"></i> Song name is required.</div>';
  } else {
    $audioFile = '';
    if (isset($_FILES['audio']) && $_FILES['audio']['error'] === UPLOAD_ERR_OK) {
      $ext = strtolower(pathinfo($_FILES['audio']['name'], PATHINFO_EXTENSION));
      $allowed = ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'];
      if (!in_array($ext, $allowed)) {
        $msg = '<div class="msg msg-error"><i class="fas fa-exclamation-circle"></i> Invalid audio format. Allowed: ' . implode(', ', $allowed) . '.</div>';
      } else {
        $newName = uniqid('song_') . '.' . $ext;
        move_uploaded_file($_FILES['audio']['tmp_name'], $audioDir . $newName);
        $audioFile = 'songs/audio/' . $newName;
      }
    } else {
      $msg = '<div class="msg msg-error"><i class="fas fa-exclamation-circle"></i> Please select an audio file.</div>';
    }

    if ($audioFile) {
      $newId = $songs ? max(array_column($songs, 'id')) + 1 : 1;
      $songs[] = [
        'id' => $newId,
        'title' => $title,
        'artist' => $artist ?: 'Dawood WaliZada',
        'poet' => $poet,
        'audio' => $audioFile,
        'date_added' => date('Y-m-d')
      ];
      saveSongs($dataFile, $songs);
      $msg = '<div class="msg msg-success"><i class="fas fa-check-circle"></i> Song "' . htmlspecialchars($title) . '" added!</div>';
      $songs = loadSongs($dataFile);
    }
  }
}
?>

<?= $msg ?>

<!-- Add Song Form -->
<div class="card">
  <h2><i class="fas fa-plus-circle"></i> Add New Song</h2>
  <form method="POST" enctype="multipart/form-data">
    <div class="form-group">
      <label for="title">Song Name *</label>
      <input id="title" name="title" type="text" required placeholder="e.g. My Song" />
    </div>
    <div class="form-group">
      <label for="artist">Artist Name</label>
      <input id="artist" name="artist" type="text" placeholder="Dawood WaliZada (default)" />
      <div class="hint">Leave blank to default to "Dawood WaliZada"</div>
    </div>
    <div class="form-group">
      <label for="poet">Poet / Lyrics</label>
      <textarea id="poet" name="poet" placeholder="Enter the song lyrics or poem text..."></textarea>
    </div>
    <div class="form-group">
      <label for="audio">Audio File *</label>
      <input id="audio" name="audio" type="file" accept="audio/*" required />
      <div class="hint">Allowed: MP3, WAV, OGG, M4A, AAC, FLAC</div>
    </div>
    <button type="submit" name="add" class="btn btn-primary"><i class="fas fa-upload"></i> Add Song</button>
  </form>
</div>

<!-- Existing Songs -->
<div class="card">
  <h2><i class="fas fa-list"></i> Existing Songs (<?= count($songs) ?>)</h2>
  <?php if (!$songs): ?>
    <div class="empty-list"><i class="fas fa-music"></i> No songs yet. Add your first song above.</div>
  <?php else: ?>
    <?php foreach (array_reverse($songs) as $s): ?>
      <div class="song-row">
        <div class="song-row-info">
          <strong><?= htmlspecialchars($s['title']) ?></strong>
          <span><?= htmlspecialchars($s['artist'] ?? 'Dawood WaliZada') ?></span>
          <div>
            <?php if (!empty($s['poet'])): ?><span class="tag"><i class="fas fa-feather"></i> Lyrics</span><?php endif; ?>
            <span class="tag tag-audio"><i class="fas fa-file-audio"></i> <?= basename($s['audio']) ?></span>
          </div>
        </div>
        <div class="song-row-actions">
          <a href="/<?= $s['audio'] ?>" class="btn btn-sm btn-primary" download title="Download"><i class="fas fa-download"></i></a>
          <a href="?delete=<?= $s['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Delete &quot;<?= htmlspecialchars($s['title']) ?>&quot;?')" title="Delete"><i class="fas fa-trash"></i></a>
        </div>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>
</div>

<p style="text-align:center;color:#6b5a3a;font-size:0.8rem;margin-top:2rem">
  <i class="fas fa-info-circle"></i> Data stored in <code>songs/data.json</code>. Commit &amp; push to GitHub to publish changes.
</p>
</div>
</body>
</html>
