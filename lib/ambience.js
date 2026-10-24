// Procedural ambient soundscapes (Web Audio API). No audio files needed.

export const DEFAULT_VOLUME = 0.5;
const MASTER_SCALE = 0.7; // overall loudness ceiling; lower it if everything feels too loud
const FADE_IN = 1.0; // seconds (time constant; a full fade takes about 3x this)
const FADE_OUT = 0.4;

/* ---------- small helpers ---------- */

function makeNoiseBuffer(ctx, type = "pink", seconds = 6, channels = 2) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const fade = Math.floor(ctx.sampleRate * 0.05);
  const buffer = ctx.createBuffer(channels, length, ctx.sampleRate);

  for (let c = 0; c < channels; c++) {
    const raw = new Float32Array(length + fade);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;

    for (let i = 0; i < raw.length; i++) {
      const white = Math.random() * 2 - 1;
      if (type === "white") {
        raw[i] = white;
      } else if (type === "brown") {
        last = (last + 0.02 * white) / 1.02;
        raw[i] = last * 3.5;
      } else {
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        raw[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    }

    // Crossfade the loop seam so the noise never "clicks" when it repeats
    const data = buffer.getChannelData(c);
    for (let i = 0; i < length; i++) data[i] = raw[i];
    for (let i = 0; i < fade; i++) {
      const t = i / fade;
      data[i] = raw[i] * t + raw[length + i] * (1 - t);
    }
  }
  return buffer;
}

function loopNoise(ctx, type, seconds = 8) {
  const src = ctx.createBufferSource();
  src.buffer = makeNoiseBuffer(ctx, type, seconds, 2);
  src.loop = true;
  src.start();
  return src;
}

function filter(ctx, type, frequency, q = 0.7) {
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = frequency;
  f.Q.value = q;
  return f;
}

function gainNode(ctx, value) {
  const g = ctx.createGain();
  g.gain.value = value;
  return g;
}

function chain(...nodes) {
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1]);
}

// A slow oscillator that gently moves another parameter (for natural, breathing variation)
function lfo(ctx, frequency, depth, param) {
  const osc = ctx.createOscillator();
  osc.frequency.value = frequency;
  const g = gainNode(ctx, depth);
  osc.connect(g);
  g.connect(param);
  osc.start();
}

// Runs fn at random (exponential-ish) intervals; returns a function that stops it
function repeat(fn, nextDelay) {
  let id;
  let stopped = false;
  const tick = () => {
    if (stopped) return;
    fn();
    id = setTimeout(tick, nextDelay());
  };
  id = setTimeout(tick, nextDelay());
  return () => {
    stopped = true;
    clearTimeout(id);
  };
}

const expDelay = (meanMs) => () => -Math.log(1 - Math.random()) * meanMs;

/* ---------- sound ingredients ---------- */

// Soft, slowly swelling chord that sits far in the background
function addPad(ctx, out, { notes, gain, cutoff }) {
  const bus = gainNode(ctx, gain);
  chain(filter(ctx, "lowpass", cutoff, 0.3), bus, out);
  const input = bus; // placeholder to keep intent clear
  const lp = filter(ctx, "lowpass", cutoff, 0.3);
  lp.connect(bus);

  notes.forEach((freq, i) => {
    [-6, 6].forEach((detune, j) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.detune.value = detune;
      const g = gainNode(ctx, 1 / (notes.length * 2));
      lfo(ctx, 0.05 + i * 0.013 + j * 0.01, g.gain.value * 0.5, g.gain);
      chain(osc, g, lp);
      osc.start();
    });
  });
  void input;
}

function addRoomTone(ctx, out, { type, cutoff, gain }) {
  chain(loopNoise(ctx, type), filter(ctx, "lowpass", cutoff), gainNode(ctx, gain), out);
}

function addCrackle(ctx, out, { meanMs, gain }) {
  const noise = makeNoiseBuffer(ctx, "white", 1, 1);
  return repeat(() => {
    const pops = Math.random() < 0.2 ? 3 : 1;
    for (let k = 0; k < pops; k++) {
      const t = ctx.currentTime + k * 0.03;
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const bp = filter(ctx, "bandpass", 700 + Math.random() * 3200, 1.2);
      const g = gainNode(ctx, 0.0001);
      const peak = gain * (0.1 + Math.random() * 0.9);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(peak, t + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04 + Math.random() * 0.08);
      chain(src, bp, g, out);
      src.start(t, Math.random() * 0.7, 0.2);
    }
  }, expDelay(meanMs));
}

function addPaperRustle(ctx, out, { gain }) {
  const noise = makeNoiseBuffer(ctx, "white", 2, 1);
  return repeat(
    () => {
      const t = ctx.currentTime;
      const dur = 0.6 + Math.random() * 0.5;
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const bp = filter(ctx, "bandpass", 3000 + Math.random() * 1500, 0.7);
      const g = gainNode(ctx, 0.0001);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(gain, t + 0.15);
      g.gain.linearRampToValueAtTime(0.0001, t + dur);
      chain(src, bp, g, out);
      src.start(t, Math.random() * 0.5, dur + 0.05);
    },
    () => 15000 + Math.random() * 30000
  );
}

function addRain(ctx, out, { gain }) {
  const hiss = gainNode(ctx, gain * 2);
  lfo(ctx, 0.06, gain * 0.4, hiss.gain);
  chain(
    loopNoise(ctx, "pink"),
    filter(ctx, "highpass", 500),
    filter(ctx, "lowpass", 7000),
    hiss,
    out
  );
  chain(loopNoise(ctx, "brown"), filter(ctx, "lowpass", 320), gainNode(ctx, gain * 0.8), out);
}

function addDrips(ctx, out, { meanMs, gain }) {
  return repeat(() => {
    const t = ctx.currentTime;
    const f = 1400 + Math.random() * 1800;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(f, t);
    osc.frequency.exponentialRampToValueAtTime(f * 0.55, t + 0.08);
    const g = gainNode(ctx, 0.0001);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain * (0.3 + Math.random() * 0.7), t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    const pan = ctx.createStereoPanner();
    pan.pan.value = Math.random() * 2 - 1;
    chain(osc, g, pan, out);
    osc.start(t);
    osc.stop(t + 0.15);
  }, expDelay(meanMs));
}

function addWind(ctx, out, { gain }) {
  const bp = filter(ctx, "bandpass", 450, 0.7);
  lfo(ctx, 0.07, 220, bp.frequency);
  const g = gainNode(ctx, gain);
  lfo(ctx, 0.045, gain * 0.6, g.gain);
  chain(loopNoise(ctx, "pink"), bp, g, out);

  // Leaves, whispering in and out
  const leaves = gainNode(ctx, 0.06);
  lfo(ctx, 0.11, 0.045, leaves.gain);
  chain(
    loopNoise(ctx, "white"),
    filter(ctx, "highpass", 3500),
    filter(ctx, "lowpass", 8000),
    leaves,
    out
  );
}

// Very faint, slowly swelling crickets. Delete the addCrickets line in the forest below if you'd rather not have them.
function addCrickets(ctx, out, gain) {
  const bus = gainNode(ctx, gain);
  bus.connect(out);
  [4200, 4380, 4560].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const amp = gainNode(ctx, 0.5);
    lfo(ctx, 26 + i * 3, 0.5, amp.gain); // the quick chirp pulses
    const gate = gainNode(ctx, 0.5);
    lfo(ctx, 0.17 + i * 0.05, 0.5, gate.gain); // slow swell between phrases
    const pan = ctx.createStereoPanner();
    pan.pan.value = (i - 1) * 0.6;
    chain(osc, amp, gate, pan, bus);
    osc.start();
  });
}

/* ---------- one soundscape per room ---------- */

const BUILDERS = {
  "grand-library": (ctx, out) => {
    addRoomTone(ctx, out, { type: "pink", cutoff: 480, gain: 1.1 });
    addPad(ctx, out, { notes: [73.42, 110, 185, 277.18], gain: 0.14, cutoff: 800 });
    return [addPaperRustle(ctx, out, { gain: 0.5 })];
  },
  "candlelit-archive": (ctx, out) => {
    addRoomTone(ctx, out, { type: "brown", cutoff: 260, gain: 1.0 });
    addPad(ctx, out, { notes: [55, 82.41, 110, 130.81, 164.81], gain: 0.13, cutoff: 600 });
    return [addCrackle(ctx, out, { meanMs: 240, gain: 2.5 })];
  },
  "rainy-observatory": (ctx, out) => {
    addRain(ctx, out, { gain: 1 });
    addPad(ctx, out, { notes: [73.42, 110, 164.81, 220], gain: 0.1, cutoff: 700 });
    return [addDrips(ctx, out, { meanMs: 600, gain: 0.15 })];
  },
  "hidden-forest-study": (ctx, out) => {
    addWind(ctx, out, { gain: 3 });
    addPad(ctx, out, { notes: [98, 146.83, 220, 246.94], gain: 0.1, cutoff: 650 });
    addCrickets(ctx, out, 0.025);
    return [];
  },
};

/* ---------- player ---------- */

export function createAmbience(slug) {
  let ctx = null;
  let master = null;
  let cleanups = [];
  let closeTimer = null;
  let volume = DEFAULT_VOLUME;
  let playing = false;

  const target = () => volume * volume * MASTER_SCALE;

  function teardown() {
    clearTimeout(closeTimer);
    cleanups.forEach((fn) => fn());
    cleanups = [];
    if (ctx) ctx.close().catch(() => {});
    ctx = null;
    master = null;
  }

  async function start() {
    clearTimeout(closeTimer);
    playing = true;

    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        playing = false;
        return false;
      }
      ctx = new AudioCtx();

      const bus = ctx.createGain();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -24;
      comp.ratio.value = 3;
      comp.attack.value = 0.05;
      comp.release.value = 0.4;
      master = gainNode(ctx, 0);
      chain(bus, filter(ctx, "lowpass", 9000, 0.5), comp, master, ctx.destination);

      const build = BUILDERS[slug] || BUILDERS["grand-library"];
      cleanups = build(ctx, bus).filter(Boolean);
    }

    // If the browser blocks sound (no click yet), resume() never settles, so don't wait forever
    try {
      await Promise.race([ctx.resume(), new Promise((r) => setTimeout(r, 400))]);
    } catch {}

    if (!playing || !ctx) return false;
    if (ctx.state !== "running") {
      playing = false;
      teardown();
      return false;
    }

    master.gain.setTargetAtTime(target(), ctx.currentTime, FADE_IN);
    return true;
  }

  function stop() {
    playing = false;
    if (!ctx) return;
    master.gain.setTargetAtTime(0, ctx.currentTime, FADE_OUT);
    clearTimeout(closeTimer);
    closeTimer = setTimeout(teardown, 2000);
  }

  function setVolume(v) {
    volume = v;
    if (playing && ctx && master) {
      master.gain.setTargetAtTime(target(), ctx.currentTime, 0.1);
    }
  }

  return { start, stop, setVolume };
}