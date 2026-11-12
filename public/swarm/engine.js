/* Independent DOM rebuild animation for Marko's Swarm Studio. */
(async () => {
  'use strict';
  const config = document.currentScript.dataset;
  let count = Math.min(48, Math.max(1, +config.agents || 4));
  let speed = Math.min(10, Math.max(.05, +config.speed || 1));
  let follow = config.follow !== 'false', paused = false;
  const report = message => parent.postMessage({ type: 'swarm-status', message }, '*');
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  await Promise.race([document.fonts.ready, delay(3500)]);
  await Promise.race([Promise.all([...document.images].map(img => img.decode().catch(() => {}))), delay(4000)]);
  const docHeight = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  // Reveal common entrance animations in static captures; no source scripts run.
  for (const el of document.querySelectorAll('[style]')) {
    if (el.style.opacity === '0' && el.style.transform) { el.style.opacity = '1'; el.style.transform = 'none'; }
  }
  // Give direct text its own measurable node without reusing tags such as span
  // that source styles may reposition (e.g. Cybercab's mobile subtitle).
  for (const el of [...document.body.querySelectorAll('*')]) {
    if (el.namespaceURI !== 'http://www.w3.org/1999/xhtml' || !el.children.length ||
        ['SCRIPT', 'STYLE', 'TEXTAREA', 'SELECT', 'NOSCRIPT'].includes(el.tagName)) continue;
    for (const child of [...el.childNodes]) {
      if (child.nodeType !== 3 || !child.textContent.trim()) continue;
      const text = document.createElement('swarm-text');
      child.replaceWith(text); text.append(child);
    }
  }
  scrollTo(0, 0);
  const vw = innerWidth, vh = innerHeight;
  const height = Math.min(24000, Math.max(vh, docHeight()));
  const tasks = [];
  let serial = 0;
  const canvas = document.createElement('div');
  canvas.id = 'swarm-scene';
  Object.assign(canvas.style, { position: 'absolute', top: '0', left: '0', width: '100%', height: height + 'px', overflow: 'hidden', background: '#f8fafc', isolation: 'isolate' });
  const bodyStyle = getComputedStyle(document.body);
  const htmlStyle = getComputedStyle(document.documentElement);
  canvas.style.background = bodyStyle.backgroundColor === 'rgba(0, 0, 0, 0)' ? htmlStyle.backgroundColor : bodyStyle.backgroundColor;
  if (!canvas.style.background || canvas.style.background === 'rgba(0, 0, 0, 0)') canvas.style.background = '#f8fafc';
  const decorative = ['background', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderRadius', 'boxShadow', 'backdropFilter', 'maskImage', 'maskSize', 'maskRepeat', 'maskPosition', 'webkitMaskImage', 'webkitMaskSize', 'webkitMaskRepeat', 'webkitMaskPosition'];
  function copyStyle(from, to) {
    const css = getComputedStyle(from);
    for (let i = 0; i < css.length; i++) to.style.setProperty(css[i], css.getPropertyValue(css[i]));
    to.style.animation = 'none'; to.style.transition = 'none';
  }
  function cloneStyled(el) {
    const clone = el.cloneNode(true);
    copyStyle(el, clone);
    const originals = el.querySelectorAll('*'), copies = clone.querySelectorAll('*');
    originals.forEach((child, i) => copyStyle(child, copies[i]));
    clone.querySelectorAll('[id]').forEach(e => e.removeAttribute('id'));
    clone.removeAttribute('id');
    return clone;
  }
  const excluded = new Set(['SCRIPT', 'STYLE', 'LINK', 'META', 'NOSCRIPT', 'TEMPLATE', 'HEAD']);
  const textTags = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'BUTTON', 'LABEL', 'A', 'LI', 'SPAN', 'STRONG', 'SMALL', 'TD', 'TH']);
  function visit(el) {
    if (tasks.length >= 1800 || excluded.has(el.tagName)) return;
    const css = getComputedStyle(el), r = el.getBoundingClientRect();
    if (css.display === 'none' || css.visibility === 'hidden' || +css.opacity === 0 || r.bottom < 0 || r.top > height) return;
    const media = ['IMG', 'svg', 'SVG', 'VIDEO', 'CANVAS'].includes(el.tagName);
    const field = ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
    const text = (el.textContent || '').trim();
    const directText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    const blockChild = [...el.children].some(child => !['inline', 'inline-block', 'contents'].includes(getComputedStyle(child).display));
    const leaf = !media && text && !blockChild && (textTags.has(el.tagName) || !el.children.length || directText);
    const hasBox = css.backgroundColor !== 'rgba(0, 0, 0, 0)' || css.backgroundImage !== 'none' || css.boxShadow !== 'none' || ['Top', 'Right', 'Bottom', 'Left'].some(side => parseFloat(css['border' + side + 'Width']) > 0 && css['border' + side + 'Style'] !== 'none');
    if (r.width > 1 && r.height > 1 && (media || leaf || field || hasBox)) {
      // Flattening must preserve scroll-container clipping (game/photo carousels).
      let left = Math.max(0, r.left), right = Math.min(vw, r.right);
      let top = Math.max(0, r.top), bottom = Math.min(height, r.bottom);
      for (let parent = el.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
        const style = getComputedStyle(parent), bounds = parent.getBoundingClientRect();
        if (/hidden|clip|auto|scroll/.test(style.overflowX)) { left = Math.max(left, bounds.left); right = Math.min(right, bounds.right); }
        if (/hidden|clip|auto|scroll/.test(style.overflowY)) { top = Math.max(top, bounds.top); bottom = Math.min(bottom, bounds.bottom); }
      }
      if (right <= left || bottom <= top) return;
      const node = media || leaf || field ? cloneStyled(el) : document.createElement('div');
      if (!media && !leaf && !field) for (const key of decorative) node.style[key] = css[key];
      Object.assign(node.style, { position: 'absolute', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', minWidth: '0', maxWidth: 'none', minHeight: '0', maxHeight: 'none', margin: '0', transform: 'none', boxSizing: 'border-box', opacity: '0', visibility: 'visible', pointerEvents: 'none', overflow: 'hidden' });
      if (!media && !leaf && !field) node.style.padding = '0';
      const clip = document.createElement('div');
      Object.assign(clip.style, { position: 'absolute', left: left + 'px', top: top + 'px', width: (right - left) + 'px', height: (bottom - top) + 'px', overflow: 'hidden', pointerEvents: 'none' });
      node.style.left = (r.left - left) + 'px'; node.style.top = (r.top - top) + 'px';
      clip.append(node); canvas.append(clip);
      const fontSize = parseFloat(css.fontSize) || 16;
      const lineHeight = parseFloat(css.lineHeight) || fontSize * 1.25;
      const kind = media ? 'image' : leaf ? 'text' : 'box';
      const duration = kind === 'text' ? Math.min(8, Math.max(.65, text.length / 33)) : kind === 'image' ? 1.8 : .85;
      tasks.push({ id: serial++, node, x: r.left, y: r.top, w: r.width, h: r.height, kind, duration, lineHeight, state: 'waiting', progress: 0 });
    }
    if (!media && !leaf && !field) for (const child of el.children) visit(child);
  }
  visit(document.body);
  tasks.sort((a, b) => a.y - b.y || a.id - b.id);
  if (tasks.length < 1) {
    report('This site needs JavaScript or blocks previews. Try another URL.');
    return;
  }
  const original = [...document.body.children];
  original.forEach(el => { el.style.display = 'none'; });
  Object.assign(document.body.style, { margin: '0', padding: '0', minHeight: height + 'px', height: height + 'px', overflow: 'visible', background: canvas.style.background });
  Object.assign(document.documentElement.style, { overflowX: 'hidden', overflowY: 'auto', scrollBehavior: 'auto' });
  document.body.append(canvas);
  const overlay = document.createElement('div');
  Object.assign(overlay.style, { position: 'absolute', inset: '0', height: height + 'px', pointerEvents: 'none', zIndex: '2147483646', overflow: 'hidden' });
  document.body.append(overlay);
  const palette = ['#c29a34', '#4d80ed', '#d46a82', '#30a992', '#a27ae0', '#eb924d'];
  const agents = [];
  function addAgent(i) {
    const color = palette[i % palette.length];
    const pointer = document.createElement('div');
    pointer.innerHTML = `<svg width="24" height="30" viewBox="0 0 24 30"><path d="M2 2L21 18L12 19L8 27Z" fill="${color}" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg><span style="display:block;margin-left:17px;margin-top:-2px;padding:3px 7px;background:${color};border-radius:5px;color:white;font:11px system-ui;white-space:nowrap">Agent ${i + 1}</span>`;
    Object.assign(pointer.style, { position: 'absolute', top: '0', left: '0', willChange: 'transform', filter: 'drop-shadow(0 2px 3px #0003)' });
    const outline = document.createElement('div');
    Object.assign(outline.style, { position: 'absolute', border: '1px solid ' + color, boxSizing: 'border-box', opacity: '0', background: color + '08' });
    const badge = document.createElement('span');
    Object.assign(badge.style, { position: 'absolute', bottom: '-23px', left: '0', padding: '3px 6px', background: color, color: 'white', borderRadius: '3px', font: '10px monospace', whiteSpace: 'nowrap' });
    outline.append(badge); overlay.append(outline, pointer);
    return { pointer, outline, badge, color, x: vw / 2, y: scrollY + vh / 3, task: null, time: 0 };
  }
  function syncAgents() {
    while (agents.length < count) agents.push(addAgent(agents.length));
    while (agents.length > count) {
      const a = agents.pop();
      if (a.task) { a.task.state = 'waiting'; a.task.progress = 0; a.task.node.style.opacity = '0'; }
      a.pointer.remove(); a.outline.remove();
    }
  }
  syncAgents();
  let complete = 0, last = performance.now(), elapsed = 0, lastReport = 0, camera = 0, finishing = 0;
  window.addEventListener('message', event => {
    if (event.source !== parent || event.data?.type !== 'swarm-control') return;
    const d = event.data;
    if (Number.isFinite(d.speed)) speed = Math.min(10, Math.max(.05, d.speed));
    if (Number.isFinite(d.agents)) { count = Math.min(48, Math.max(1, Math.round(d.agents))); syncAgents(); }
    if (typeof d.paused === 'boolean') paused = d.paused;
    if (typeof d.follow === 'boolean') { follow = d.follow; camera = scrollY; }
  });
  function point(task, amount) {
    if (task.kind === 'text') {
      const rows = Math.max(1, Math.ceil(task.h / task.lineHeight));
      const line = Math.min(rows - 1, Math.floor(amount * rows));
      const fraction = amount >= 1 ? 1 : (amount * rows) % 1;
      const top = line / rows * 100, bottom = Math.min(100, (line + 1) / rows * 100), right = fraction * 100;
      task.node.style.clipPath = `polygon(0 0,100% 0,100% ${top}%,${right}% ${top}%,${right}% ${bottom}%,0 ${bottom}%)`;
      return [task.x + task.w * fraction, task.y + (line + .6) * task.h / rows];
    }
    task.node.style.clipPath = `inset(0 0 ${100 * (1 - amount)}% 0)`;
    return [task.x + task.w * Math.min(1, amount * 1.4), task.y + Math.min(task.h, 450) * amount];
  }
  function frame(now) {
    const dt = Math.min(.04, Math.max(0, (now - last) / 1000)); last = now;
    if (!paused) {
      elapsed += dt;
      const pending = tasks.filter(t => t.state !== 'done');
      const first = pending[0];
      if (follow && first && elapsed > 1) {
        const target = Math.min(height - innerHeight, Math.max(0, first.y - innerHeight * .28));
        const delta = (target - camera) * (1 - Math.exp(-3.8 * dt));
        const step = 420 * Math.sqrt(speed) * dt;
        camera += Math.max(-step, Math.min(step, delta));
        scrollTo(0, camera);
      }
      const bottom = scrollY + innerHeight >= height - 3;
      const frontier = scrollY + innerHeight * (bottom ? 1.2 : .74);
      for (let i = 0; i < agents.length; i++) {
        const a = agents[i];
        if (!a.task && elapsed > .45) {
          const next = pending.find(t => t.state === 'waiting' && (!follow || t.y < frontier));
          if (next) { next.state = 'active'; a.task = next; a.time = 0; }
        }
        let tx, ty;
        if (a.task) {
          const t = a.task;
          a.time += dt * speed;
          const progress = Math.min(1, Math.max(0, (a.time - .4) / t.duration));
          t.progress = progress;
          if (progress > 0) t.node.style.opacity = '1';
          [tx, ty] = point(t, progress);
          Object.assign(a.outline.style, { left: t.x + 'px', top: t.y + 'px', width: Math.max(2, t.w * Math.min(1, a.time / .4)) + 'px', height: Math.min(t.h, 450) + 'px', opacity: '.7' });
          a.badge.textContent = t.kind === 'text' ? 'Typing…' : `${Math.round(t.w)} × ${Math.round(t.h)}`;
          if (progress >= 1) {
            t.node.style.clipPath = 'none'; t.state = 'done'; complete++;
            a.task = null; a.outline.style.opacity = '0';
          }
        } else {
          const angle = elapsed * .5 + i * 2.4;
          tx = vw / 2 + Math.cos(angle) * Math.min(vw * .25, 180);
          ty = scrollY + innerHeight * .35 + Math.sin(angle) * 70;
        }
        const ease = 1 - Math.exp(-15 * Math.sqrt(speed) * dt);
        a.x += (tx - a.x) * ease; a.y += (ty - a.y) * ease;
        a.pointer.style.transform = `translate3d(${a.x}px,${a.y}px,0)`;
      }
      if (complete === tasks.length) {
        finishing += dt;
        overlay.style.opacity = String(Math.max(0, 1 - finishing / 1.5));
        if (finishing > 1.5) { report(`Complete · ${tasks.length} elements rebuilt`); return; }
      }
    }
    if (now - lastReport > 450) { report(paused ? `Paused · ${complete} / ${tasks.length}` : `${complete} / ${tasks.length} elements · ${count} agents · ${speed}×`); lastReport = now; }
    window.__swarmState = { complete, total: tasks.length, agents: agents.length, speed, paused, scroll: scrollY, firstY: tasks.find(t => t.state !== 'done')?.y };
    requestAnimationFrame(frame);
  }
  report(`Rebuilding ${tasks.length} elements…`);
  requestAnimationFrame(frame);
})().catch(() => parent.postMessage({ type: 'swarm-status', message: 'Could not prepare this page. Try another website.' }, '*'));
