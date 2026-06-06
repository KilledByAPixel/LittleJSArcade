'use strict';
// ============================================================================
// Menu Designer — an opt-in dev overlay for dialing in menus.js title FX +
// theme live, then copying the exact setMenuTheme(...) / titleFx code.
//
// Load AFTER menus.js:  <script src="../templates/menuDesigner.js"></script>
// A small 🎨 button appears bottom-left; click it (or call MenuDesigner.toggle())
// to open the panel. Controls apply live to the 'title' menu and the global
// theme; the Copy button puts paste-ready code on your clipboard.
//
// It's a dev tool: include it only while designing. Nothing here ships unless
// you keep the script tag. No effect until menus.js is present.
// ============================================================================
(function () {
    const FILLS   = ['none','neon','rainbow','shine','fire','gold','outline','hardshadow','3d','glitch','crt'];
    const MOTIONS = ['none','wave','heartbeat','jelly','float'];
    // Mirror of menus.js MENU_THEME_PRESETS so Copy output stays faithful.
    const PRESETS = {
        neon:   { accent:'#33e0ff', bg:'rgba(8,10,20,.9)',  borderWidth:3, radius:10 },
        casino: { accent:'#ffd700', bg:'rgba(22,8,0,.93)',  borderWidth:2, radius:6 },
        felt:   { accent:'#33cc66', bg:'rgba(8,22,14,.93)', borderWidth:2, radius:8 },
        retro:  { accent:'#46d846', bg:'rgba(0,0,0,.9)',    borderWidth:2, radius:0, font:'monospace' },
        arcade: { accent:'#ff2aa8', bg:'rgba(10,6,18,.92)', borderWidth:3, radius:8 },
        mono:   { accent:'#cccccc', bg:'rgba(0,0,0,.85)',   borderWidth:2, radius:4 },
    };

    const theme = { accent:'#66ccff', bg:undefined, borderWidth:2, radius:12 };
    const fx = {
        fill:'neon', motion:'none', sparkle:false,
        tint:false, color:'#66ccff', useShadow:false, shadow:'#aaaaaa',
        size:1.75, spacing:0, hue:0, speed:1, invert:false,
    };

    let panel, codeBox, open = false;

    const has = name => typeof window[name] === 'function';
    const titleMenu = () => has('getMenu') ? getMenu('title') : null;

    // --- spec / code -------------------------------------------------------
    function buildFxSpec() {
        const s = {};
        if (fx.fill   !== 'none') s.fill   = fx.fill;
        if (fx.motion !== 'none') s.motion = fx.motion;
        if (fx.sparkle)           s.sparkle = true;
        if (fx.tint)              s.color  = fx.color;
        if (fx.useShadow)         s.shadow = fx.shadow;
        if (Math.abs(fx.size - 1.75) > 1e-6) s.size    = round(fx.size);
        if (Math.abs(fx.spacing)     > 1e-6) s.spacing = round(fx.spacing);
        if (+fx.hue)                          s.hue     = +fx.hue;
        if (Math.abs(fx.speed - 1)   > 1e-6) s.speed   = round(fx.speed);
        if (fx.invert)            s.invert = true;
        return s;
    }
    function buildThemePatch() {
        const t = { accent: theme.accent };
        if (theme.bg) t.bg = theme.bg;
        if (+theme.borderWidth !== 2)  t.borderWidth = +theme.borderWidth;
        if (+theme.radius      !== 12) t.radius      = +theme.radius;
        return t;
    }
    const round = n => Math.round(+n * 100) / 100;
    function objLit(o) {
        const parts = Object.keys(o).map(k => {
            const v = o[k];
            return k + ':' + (typeof v === 'string' ? "'" + v + "'" : v);
        });
        return '{' + parts.join(', ') + '}';
    }
    function codeString() {
        const lines = ['setMenuTheme(' + objLit(buildThemePatch()) + ');'];
        const spec = buildFxSpec();
        if (Object.keys(spec).length) lines.push('titleFx: ' + objLit(spec) + ',');
        return lines.join('\n');
    }

    // --- live apply --------------------------------------------------------
    function apply() {
        if (has('setMenuTheme')) setMenuTheme(buildThemePatch());
        const m = titleMenu();
        if (m && m.setTitleFx) {
            m.setTitleFx(buildFxSpec());
            if (has('showMenu')) showMenu('title');   // make the preview visible
        }
        if (codeBox) codeBox.value = codeString();
    }

    // --- small DOM helpers -------------------------------------------------
    function el(tag, props, kids) {
        const e = document.createElement(tag);
        Object.assign(e, props || {});
        (kids || []).forEach(k => e.appendChild(k));
        return e;
    }
    function row(label, control) {
        const l = el('label', { textContent: label });
        l.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:8px;margin:4px 0;font:12px monospace;color:#cdd6e0;';
        l.appendChild(control);
        return l;
    }
    function select(options, value, on) {
        const s = el('select');
        options.forEach(o => s.appendChild(el('option', { value:o, textContent:o, selected:o===value })));
        s.style.cssText = 'background:#0d1118;color:#cdd6e0;border:1px solid #2a3344;border-radius:4px;font:12px monospace;';
        s.onchange = () => { on(s.value); apply(); };
        return s;
    }
    function range(min, max, step, value, on) {
        const wrap = el('span'); wrap.style.cssText = 'display:flex;align-items:center;gap:6px;';
        const r = el('input', { type:'range', min, max, step, value });
        const out = el('span', { textContent:(+value).toFixed(2) }); out.style.cssText = 'width:36px;text-align:right;color:#8fa0b5;';
        r.oninput = () => { out.textContent = (+r.value).toFixed(2); on(+r.value); apply(); };
        wrap.appendChild(r); wrap.appendChild(out);
        return wrap;
    }
    function color(value, on) {
        const c = el('input', { type:'color', value: toHex6(value) });
        c.style.cssText = 'width:42px;height:22px;border:none;background:none;';
        c.oninput = () => { on(c.value); apply(); };
        return c;
    }
    function check(value, on) {
        const c = el('input', { type:'checkbox', checked:!!value });
        c.onchange = () => { on(c.checked); apply(); };
        return c;
    }
    function colorRow(label, getEnabled, setEnabled, getColor, setColor) {
        const span = el('span'); span.style.cssText = 'display:flex;align-items:center;gap:6px;';
        span.appendChild(check(getEnabled(), v => setEnabled(v)));
        span.appendChild(color(getColor(), v => setColor(v)));
        return row(label, span);
    }
    function section(title) {
        const h = el('div', { textContent:title });
        h.style.cssText = 'margin:12px 0 4px;font:bold 11px monospace;letter-spacing:.1em;color:#6cf;';
        return h;
    }

    function toHex6(c) {
        if (!c) return '#000000';
        c = ('' + c).trim();
        if (/^#[0-9a-f]{3}$/i.test(c)) return '#' + c[1]+c[1]+c[2]+c[2]+c[3]+c[3];
        if (/^#[0-9a-f]{6}$/i.test(c)) return c;
        const m = c.match(/rgba?\(([^)]+)\)/i);
        if (m) {
            const p = m[1].split(',').map(x => parseFloat(x));
            return '#' + p.slice(0,3).map(n => ('0'+clamp(n|0,0,255).toString(16)).slice(-2)).join('');
        }
        return '#000000';
    }

    // --- panel -------------------------------------------------------------
    function build() {
        panel = el('div');
        panel.style.cssText = 'position:fixed;top:8px;right:8px;width:250px;max-height:94vh;overflow-y:auto;'
            + 'z-index:100000;background:rgba(10,14,20,.96);border:1px solid #2a3344;border-radius:8px;'
            + 'padding:10px 12px;box-sizing:border-box;display:none;box-shadow:0 4px 20px rgba(0,0,0,.5);';

        panel.appendChild(el('div', { textContent:'MENU DESIGNER', style:'font:bold 13px monospace;color:#6cf;letter-spacing:.08em;margin-bottom:6px;' }));

        // THEME
        panel.appendChild(section('THEME'));
        const presetRow = el('div'); presetRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;margin:2px 0 6px;';
        Object.keys(PRESETS).forEach(name => {
            const b = el('button', { textContent:name });
            b.style.cssText = 'flex:1 0 30%;background:#16202e;color:#cdd6e0;border:1px solid #2a3344;border-radius:4px;font:11px monospace;cursor:pointer;padding:3px 0;';
            b.onclick = () => { Object.assign(theme, { accent:PRESETS[name].accent, bg:PRESETS[name].bg, borderWidth:PRESETS[name].borderWidth, radius:PRESETS[name].radius }); refresh(); apply(); };
            presetRow.appendChild(b);
        });
        panel.appendChild(presetRow);
        controls.accent = color(theme.accent, v => theme.accent = v);
        panel.appendChild(row('accent', controls.accent));
        controls.borderWidth = range(0, 8, 1, theme.borderWidth, v => theme.borderWidth = v);
        panel.appendChild(row('borderWidth', controls.borderWidth));
        controls.radius = range(0, 30, 1, theme.radius, v => theme.radius = v);
        panel.appendChild(row('radius', controls.radius));

        // TITLE FX
        panel.appendChild(section('TITLE FX'));
        controls.fill = select(FILLS, fx.fill, v => fx.fill = v);
        panel.appendChild(row('fill', controls.fill));
        controls.motion = select(MOTIONS, fx.motion, v => fx.motion = v);
        panel.appendChild(row('motion', controls.motion));
        controls.sparkle = check(fx.sparkle, v => fx.sparkle = v);
        panel.appendChild(row('sparkle', controls.sparkle));
        panel.appendChild(colorRow('tint (color)', () => fx.tint, v => fx.tint = v, () => fx.color, v => fx.color = v));
        panel.appendChild(colorRow('shadow', () => fx.useShadow, v => fx.useShadow = v, () => fx.shadow, v => fx.shadow = v));
        controls.size = range(1, 3.5, 0.05, fx.size, v => fx.size = v);
        panel.appendChild(row('size (em)', controls.size));
        controls.spacing = range(-0.1, 0.4, 0.02, fx.spacing, v => fx.spacing = v);
        panel.appendChild(row('spacing (em)', controls.spacing));
        controls.hue = range(0, 360, 5, fx.hue, v => fx.hue = v);
        panel.appendChild(row('hue', controls.hue));
        controls.speed = range(0.3, 3, 0.1, fx.speed, v => fx.speed = v);
        panel.appendChild(row('speed', controls.speed));
        controls.invert = check(fx.invert, v => fx.invert = v);
        panel.appendChild(row('invert', controls.invert));

        // CODE + COPY
        panel.appendChild(section('CODE'));
        codeBox = el('textarea', { readOnly:true });
        codeBox.style.cssText = 'width:100%;height:64px;box-sizing:border-box;background:#0d1118;color:#9fd;border:1px solid #2a3344;border-radius:4px;font:11px monospace;resize:vertical;';
        panel.appendChild(codeBox);
        const copyBtn = el('button', { textContent:'Copy code' });
        copyBtn.style.cssText = 'width:100%;margin-top:6px;background:#1d6;color:#021;border:none;border-radius:4px;font:bold 12px monospace;cursor:pointer;padding:6px 0;';
        copyBtn.onclick = () => {
            const txt = codeString();
            const done = () => { copyBtn.textContent = 'Copied!'; setTimeout(() => copyBtn.textContent = 'Copy code', 1200); };
            if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, () => { codeBox.select(); done(); });
            else { codeBox.select(); document.execCommand && document.execCommand('copy'); done(); }
        };
        panel.appendChild(copyBtn);

        document.body.appendChild(panel);
    }

    const controls = {};
    // Push current state values back into the controls (after preset/init).
    function refresh() {
        if (!panel) return;
        controls.accent.value = toHex6(theme.accent);
        setRange(controls.borderWidth, theme.borderWidth);
        setRange(controls.radius, theme.radius);
        controls.fill.value = fx.fill;
        controls.motion.value = fx.motion;
        controls.sparkle.checked = fx.sparkle;
        setRange(controls.size, fx.size);
        setRange(controls.spacing, fx.spacing);
        setRange(controls.hue, fx.hue);
        setRange(controls.speed, fx.speed);
        controls.invert.checked = fx.invert;
    }
    function setRange(wrap, v) {
        const r = wrap.querySelector('input'); const out = wrap.querySelector('span');
        if (r) r.value = v; if (out) out.textContent = (+v).toFixed(2);
    }

    // Seed from the game's current title FX + accent, best-effort.
    function initFromCurrent() {
        try {
            const root = document.getElementById('littlejs-menus');
            if (root) {
                const a = getComputedStyle(root).getPropertyValue('--menu-accent').trim();
                if (a) theme.accent = toHex6(a);
            }
            const m = titleMenu();
            const spec = m && m.getTitleFx && m.getTitleFx();
            if (spec && typeof spec === 'object') {
                if (spec.fill)    fx.fill = spec.fill;
                if (spec.motion)  fx.motion = spec.motion;
                if (spec.sparkle) fx.sparkle = true;
                if (spec.color)  { fx.tint = true; fx.color = toHex6(spec.color); }
                if (spec.shadow) { fx.useShadow = true; fx.shadow = toHex6(spec.shadow); }
                if (spec.size != null)    fx.size = +spec.size;
                if (spec.spacing != null) fx.spacing = +spec.spacing;
                if (spec.hue != null)     fx.hue = +spec.hue;
                if (spec.speed != null)   fx.speed = +spec.speed;
                if (spec.invert)          fx.invert = true;
            } else if (typeof spec === 'string') {
                if (FILLS.includes(spec)) fx.fill = spec;
                else if (MOTIONS.includes(spec)) { fx.fill = 'none'; fx.motion = spec; }
            }
        } catch (e) { /* best-effort */ }
    }

    function toggle(force) {
        if (!panel) { build(); initFromCurrent(); refresh(); if (codeBox) codeBox.value = codeString(); }
        open = (force === undefined) ? !open : !!force;
        panel.style.display = open ? 'block' : 'none';
    }

    function addButton() {
        const btn = el('button', { textContent:'🎨', title:'Menu Designer' });
        btn.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:100000;width:34px;height:34px;'
            + 'border-radius:50%;border:1px solid #2a3344;background:rgba(10,14,20,.9);font-size:18px;cursor:pointer;line-height:1;';
        btn.onclick = () => toggle();
        document.body.appendChild(btn);
    }

    function boot() {
        if (typeof getMenu !== 'function') return;   // menus.js not present
        addButton();
    }
    if (document.readyState === 'loading')
        window.addEventListener('DOMContentLoaded', boot);
    else
        boot();

    window.MenuDesigner = { toggle, open: () => toggle(true), close: () => toggle(false) };
})();
