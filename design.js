document.addEventListener('DOMContentLoaded', () => {
  const termBody = document.getElementById('termBody');

  if (termBody) {
    const lines = [
      { p: 'daniel@oci-infra', path: '~', cmd: 'whoami' },
      { out: 'Daniel Bolaños — Cloud Technician & Developer' },
      { p: 'daniel@oci-infra', path: '~', cmd: 'cat skills.txt' },
      { out: 'Python · Linux · Git · Node.js · SQL' },
      { p: 'daniel@oci-infra', path: '~', cmd: 'terraform apply' },
      { out: '✔ Infrastructure deployed successfully.' }
    ];

    let li = 0;

    function typeLine(text, el, speed, cb) {
      let i = 0;
      const tick = setInterval(() => {
        el.textContent += text[i];
        i += 1;
        if (i >= text.length) {
          clearInterval(tick);
          if (cb) cb();
        }
      }, speed);
    }

    function nextLine() {
      if (li >= lines.length) {
        const cur = document.createElement('span');
        cur.className = 'cursor';
        termBody.appendChild(cur);
        return;
      }

      const item = lines[li];
      const row = document.createElement('div');

      if (item.cmd !== undefined) {
        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        promptSpan.textContent = item.p + ':';

        const pathSpan = document.createElement('span');
        pathSpan.className = 'path';
        pathSpan.textContent = item.path + '$ ';

        const cmdSpan = document.createElement('span');
        row.appendChild(promptSpan);
        row.appendChild(pathSpan);
        row.appendChild(cmdSpan);
        termBody.appendChild(row);

        typeLine(item.cmd, cmdSpan, 35, () => {
          li += 1;
          setTimeout(nextLine, 280);
        });
      } else {
        row.textContent = item.out;
        row.style.color = '#9fb8a8';
        termBody.appendChild(row);
        li += 1;
        setTimeout(nextLine, 380);
      }
    }

    nextLine();
  }

  const meters = document.querySelectorAll('.meter-fill');
  if (meters.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.w + '%';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    meters.forEach((meter) => io.observe(meter));
  }

});