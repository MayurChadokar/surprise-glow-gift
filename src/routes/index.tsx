import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOMIZE HERE
// ─────────────────────────────────────────────────────────────────────────────
const HER_NAME = "Beautiful";
const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946bc4a2b3.mp3?filename=romantic-piano-11895.mp3";
const GALLERY = [
  "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800",
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
  "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
  "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?w=800",
];
const WISHES = [
  "Stay happy always ✨",
  "Keep shining like the star you are 🌟",
  "Never stop smiling — it suits you 💫",
  "Have an amazing year ahead 🎈",
  "Chase every dream fearlessly 🌸",
  "You deserve all the love 💖",
];
// ─────────────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/")({
  component: BirthdayPage,
});

function BirthdayPage() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader />;
  if (!opened) return <LandingCard onOpen={() => setOpened(true)} />;
  return <MainExperience />;
}

// ─── LOADER ──────────────────────────────────────────────────────────────────
function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-8">
      <ParticleField />
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-2 border-transparent border-t-pink border-r-lavender animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-gold animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      </div>
      <p className="text-lg tracking-[0.3em] uppercase text-muted-foreground animate-glow-pulse">
        Preparing your surprise
      </p>
    </div>
  );
}

// ─── LANDING ─────────────────────────────────────────────────────────────────
function LandingCard({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (open) { onOpen(); return; }
    setOpen(true);
    setTimeout(onOpen, 1600);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-6 gap-8">
      <ParticleField />
      <div className="text-center animate-fade-up">
        <p className="text-sm uppercase tracking-[0.4em] text-gold mb-3">A little surprise</p>
        <h1 className="text-4xl md:text-6xl text-gradient mb-2">Hi, {HER_NAME} 👋</h1>
        <p className="text-muted-foreground font-light italic">You've got a letter…</p>
      </div>

      <div className="envelope-wrap animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <div className={`envelope ${open ? "open" : ""}`} onClick={handleClick} role="button" aria-label="Open the letter">
          <div className="envelope-body" />
          <div className="envelope-letter">
            <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "oklch(0.55 0.14 340)" }}>For You</p>
            <p className="text-2xl md:text-3xl" style={{ fontFamily: "var(--font-script)", color: "oklch(0.45 0.15 340)" }}>
              Happy Birthday, {HER_NAME}
            </p>
            <p className="text-sm mt-3 opacity-70">Tap again to continue ❤️</p>
          </div>
          <div className="envelope-flap" />
          <div className="envelope-seal">❤</div>
        </div>
      </div>

      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground animate-glow-pulse">
        {open ? "Opening…" : "Tap the envelope"}
      </p>
    </div>
  );
}


// ─── MAIN EXPERIENCE ─────────────────────────────────────────────────────────
function MainExperience() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicOn, setMusicOn] = useState(true);

  useEffect(() => {
    // opening burst
    fireConfetti();
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.35;
    audio.play().catch(() => {});
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play(); setMusicOn(true); } else { a.pause(); setMusicOn(false); }
  };

  return (
    <div className="relative">
      <ParticleField />
      <FloatingHearts />
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 glass rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Toggle music"
      >
        {musicOn ? "🔊" : "🔇"}
      </button>

      <HeroSection />
      <GallerySection />
      <LetterSection />
      <CakeSection />
      <MemoryWallSection />
      <FinaleSection />
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <Balloons />
      <div className="relative z-10 text-center animate-fade-up">
        <p className="text-sm uppercase tracking-[0.5em] text-gold mb-6">Today is your day</p>
        <h1 className="text-5xl md:text-8xl lg:text-9xl mb-6 text-gradient leading-tight">
          🎂 Happy Birthday
        </h1>
        <h2 className="text-6xl md:text-9xl font-script text-gold mb-8" style={{ textShadow: "var(--glow-gold)" }}>
          {HER_NAME}
        </h2>
        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light italic">
          Wishing you endless happiness, success, smiles, and unforgettable memories.
        </p>
      </div>
      <Sparkles />
    </section>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────
function GallerySection() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading eyebrow="Moments" title="A Little Gallery" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {GALLERY.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(src)}
            className="group glass rounded-3xl overflow-hidden aspect-[4/5] relative animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s`, boxShadow: "var(--shadow-glass), 0 0 30px oklch(0.78 0.17 350 / 0.15)" }}
          >
            <img
              src={src}
              alt={`Memory ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-fade-up"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-2xl shadow-2xl" />
          <button className="absolute top-6 right-6 text-white text-3xl">✕</button>
        </div>
      )}
    </section>
  );
}

// ─── LETTER ──────────────────────────────────────────────────────────────────
const LETTER = `Hi ${HER_NAME},

I know everyone sends birthday messages.
So instead of just sending a text,
I wanted to create something you'll remember.

I hope this birthday brings you happiness,
beautiful memories,
good health,
and everything you've been wishing for.

Keep smiling,
because it suits you.

Happy Birthday ❤️`;

function LetterSection() {
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setStarted(true);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(LETTER.slice(0, i));
      if (i >= LETTER.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [started]);

  return (
    <section ref={ref} className="py-24 px-6 max-w-4xl mx-auto">
      <SectionHeading eyebrow="From me to you" title="A Letter" />
      <div className="glass rounded-3xl p-8 md:p-16 mt-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px animate-shimmer" />
        <pre className="whitespace-pre-wrap font-display text-lg md:text-2xl leading-relaxed text-foreground/90" style={{ fontFamily: "var(--font-display)" }}>
          {text}
          <span className="inline-block w-0.5 h-6 bg-pink ml-1 animate-glow-pulse align-middle" />
        </pre>
      </div>
    </section>
  );
}

// ─── CAKE ────────────────────────────────────────────────────────────────────
function CakeSection() {
  const [blown, setBlown] = useState(false);

  const blow = () => {
    if (blown) return;
    setBlown(true);
    fireConfetti();
    setTimeout(fireworks, 300);
    setTimeout(fireworks, 900);
  };

  return (
    <section className="py-24 px-6 text-center relative overflow-hidden">
      <SectionHeading eyebrow="Your cake" title="Make a Wish" />
      <div className="mt-16 flex flex-col items-center">
        <Cake blown={blown} />
        {!blown ? (
          <button onClick={blow} className="btn-premium btn-premium-hover mt-12">
            Blow the Candles 🎂
          </button>
        ) : (
          <div className="mt-12 animate-fade-up">
            <h3 className="text-4xl md:text-6xl text-gradient">🎉 Make a Wish!</h3>
            <p className="text-muted-foreground mt-4 italic">Close your eyes... it's coming true.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Cake({ blown }: { blown: boolean }) {
  return (
    <div className="relative" style={{ width: 280, height: 320 }}>
      {/* candles */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-6" style={{ top: 20 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative flex flex-col items-center">
            {!blown && (
              <div
                className="w-3 h-5 rounded-full animate-flicker"
                style={{
                  background: "radial-gradient(circle, oklch(0.95 0.15 85), oklch(0.7 0.2 40))",
                  boxShadow: "0 0 20px oklch(0.85 0.2 60), 0 0 40px oklch(0.85 0.2 60 / 0.5)",
                }}
              />
            )}
            <div className="w-1.5 h-10 rounded-sm" style={{ background: "linear-gradient(180deg, var(--gold), var(--pink))" }} />
          </div>
        ))}
      </div>
      {/* top tier */}
      <div className="absolute left-1/2 -translate-x-1/2 rounded-t-2xl rounded-b-md" style={{ top: 80, width: 140, height: 70, background: "linear-gradient(180deg, oklch(0.9 0.06 340), oklch(0.78 0.12 340))", boxShadow: "var(--glow-pink), inset 0 -8px 12px oklch(0.5 0.15 340 / 0.4)" }}>
        <div className="absolute -bottom-2 left-0 right-0 h-3 rounded-full" style={{ background: "repeating-linear-gradient(90deg, var(--gold) 0 8px, transparent 8px 16px)" }} />
      </div>
      {/* middle tier */}
      <div className="absolute left-1/2 -translate-x-1/2 rounded-t-xl rounded-b-md" style={{ top: 160, width: 200, height: 70, background: "linear-gradient(180deg, oklch(0.85 0.08 300), oklch(0.65 0.15 300))", boxShadow: "var(--glow-purple), inset 0 -8px 12px oklch(0.4 0.15 300 / 0.4)" }}>
        <div className="absolute -bottom-2 left-0 right-0 h-3 rounded-full" style={{ background: "repeating-linear-gradient(90deg, var(--gold) 0 10px, transparent 10px 20px)" }} />
      </div>
      {/* bottom tier */}
      <div className="absolute left-1/2 -translate-x-1/2 rounded-t-xl rounded-b-lg" style={{ top: 240, width: 260, height: 80, background: "linear-gradient(180deg, oklch(0.88 0.05 340), oklch(0.7 0.12 340))", boxShadow: "var(--glow-pink), inset 0 -10px 15px oklch(0.5 0.15 340 / 0.4)" }} />
      {/* plate */}
      <div className="absolute left-1/2 -translate-x-1/2 rounded-full" style={{ bottom: -10, width: 300, height: 20, background: "linear-gradient(180deg, oklch(0.4 0.02 300), oklch(0.2 0.02 300))" }} />
    </div>
  );
}

// ─── MEMORY WALL ─────────────────────────────────────────────────────────────
function MemoryWallSection() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading eyebrow="From the heart" title="Memory Wall" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {WISHES.map((w, i) => (
          <StickyNote key={i} text={w} index={i} />
        ))}
      </div>
    </section>
  );
}

function StickyNote({ text, index }: { text: string; index: number }) {
  const palettes = [
    "linear-gradient(135deg, oklch(0.88 0.12 340), oklch(0.78 0.15 350))",
    "linear-gradient(135deg, oklch(0.85 0.1 300), oklch(0.75 0.15 290))",
    "linear-gradient(135deg, oklch(0.9 0.09 85), oklch(0.82 0.12 75))",
  ];
  const rot = [-3, 2, -1, 3, -2, 1][index % 6];
  return (
    <div
      className="p-8 rounded-2xl min-h-[180px] flex items-center justify-center text-center font-display text-xl md:text-2xl text-neutral-900 animate-fade-up hover:scale-105 hover:rotate-0 transition-all duration-500"
      style={{
        background: palettes[index % palettes.length],
        transform: `rotate(${rot}deg)`,
        boxShadow: "0 20px 40px -10px oklch(0.14 0.04 300 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.3)",
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {text}
    </div>
  );
}

// ─── FINALE ──────────────────────────────────────────────────────────────────
function FinaleSection() {
  const [final, setFinal] = useState(false);

  const celebrate = () => {
    setFinal(true);
    fireConfetti();
    fireworks();
    setTimeout(fireworks, 600);
    setTimeout(fireworks, 1200);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <StarsBackground />
      <div className="relative z-10 text-center max-w-2xl animate-fade-up">
        <h2 className="text-5xl md:text-7xl mb-6 text-gradient">Thank you for visiting.</h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 italic font-light">
          I hope this little surprise made you smile.
        </p>
        <button onClick={celebrate} className="btn-premium btn-premium-hover text-lg" style={{ boxShadow: "var(--glow-gold), 0 0 80px oklch(0.78 0.17 350 / 0.6)" }}>
          Happy Birthday Once Again ❤️
        </button>
        {final && (
          <p className="mt-16 text-2xl md:text-3xl font-script text-gold animate-fade-up">
            Made with ❤️ especially for you.
          </p>
        )}
      </div>
    </section>
  );
}

// ─── SHARED ──────────────────────────────────────────────────────────────────
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-gold mb-4">{eyebrow}</p>
      <h2 className="text-4xl md:text-6xl text-gradient">{title}</h2>
      <div className="mx-auto mt-6 h-px w-24" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
    </div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 30 });
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
      {particles.map((_, i) => {
        const size = Math.random() * 4 + 1;
        return (
          <div
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              width: size,
              height: size,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: ["var(--pink)", "var(--lavender)", "var(--gold)"][i % 3],
              boxShadow: `0 0 ${size * 4}px currentColor`,
              color: ["var(--pink)", "var(--lavender)", "var(--gold)"][i % 3],
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 12 });
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
      {hearts.map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl opacity-0"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `float-up ${8 + Math.random() * 6}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
            filter: "drop-shadow(0 0 10px oklch(0.78 0.17 350 / 0.6))",
          }}
        >
          {["💖", "💗", "💕", "✨"][i % 4]}
        </div>
      ))}
    </div>
  );
}

function Balloons() {
  const balloons = [
    { color: "var(--pink)", left: "10%", delay: 0 },
    { color: "var(--purple)", left: "20%", delay: 1.5 },
    { color: "var(--lavender)", left: "80%", delay: 0.7 },
    { color: "var(--gold)", left: "90%", delay: 2.2 },
    { color: "var(--pink)", left: "5%", delay: 3 },
    { color: "var(--purple)", left: "75%", delay: 1.2 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {balloons.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: b.left,
            bottom: "-100px",
            animation: `float-up ${14 + i * 1.5}s ease-in infinite`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <div
            className="w-14 h-16 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, oklch(1 0 0 / 0.4), ${b.color})`,
              boxShadow: `0 0 30px ${b.color}`,
            }}
          />
          <div className="w-px h-16 mx-auto" style={{ background: "oklch(1 0 0 / 0.3)" }} />
        </div>
      ))}
    </div>
  );
}

function Sparkles() {
  const s = Array.from({ length: 20 });
  return (
    <div className="absolute inset-0 pointer-events-none">
      {s.map((_, i) => (
        <div
          key={i}
          className="absolute text-xl animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            color: "var(--gold)",
            filter: "drop-shadow(0 0 8px var(--gold))",
          }}
        >
          ✦
        </div>
      ))}
    </div>
  );
}

function StarsBackground() {
  const stars = Array.from({ length: 80 });
  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((_, i) => {
        const size = Math.random() * 2 + 0.5;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: size,
              height: size,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${size * 3}px white`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── EFFECTS ─────────────────────────────────────────────────────────────────
function fireConfetti() {
  const colors = ["#f9a8d4", "#c084fc", "#e9d5ff", "#fde68a", "#ffffff"];
  confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors });
  setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0 }, colors }), 200);
  setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1 }, colors }), 400);
}

function fireworks() {
  const colors = ["#f9a8d4", "#c084fc", "#fde68a"];
  const end = Date.now() + 800;
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
