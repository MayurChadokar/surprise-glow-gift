import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOMIZE HERE
// ─────────────────────────────────────────────────────────────────────────────
const HER_NAME = "Nandini";
const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946bc4a2b3.mp3?filename=romantic-piano-11895.mp3";
const GALLERY = [
  "/images/WhatsApp Image 2026-03-14 at 12.05.42 AM (1).jpeg",
  "/images/WhatsApp Image 2026-03-14 at 12.05.42 AM (2).jpeg",
  "/images/WhatsApp Image 2026-03-14 at 12.05.41 AM.jpeg",
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
          <div className="envelope-front" />
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


// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE IMAGES AND DATA
// ─────────────────────────────────────────────────────────────────────────────
const TIMELINE_DATA = [
  {
    id: 1,
    date: "31/01/2026",
    title: "The Beginning",
    description: "Where our journey started. A special date that marked a new chapter filled with hope and excitement.",
    images: [
      "/images/WhatsApp Image 2026-07-02 at 10.04.29 PM.jpeg",
      "/images/WhatsApp Image 2026-07-02 at 10.04.29 PM (1).jpeg",
    ],
    audioUrl: "/Shivaay – Darkhaast.mp3",
  },
  {
    id: 2,
    date: "14/02/2026",
    title: "Valentine's Magic",
    description: "A day filled with warmth, love, and sweet moments. Celebrating the bond that grew stronger every single day.",
    images: [
      "/images/WhatsApp Image 2026-07-02 at 10.04.28 PM.jpeg",
    ],
  },
  {
    id: 3,
    date: "15/02/2026",
    title: "Cherished Memories",
    description: "Continuing the beautiful celebration. Capturing laughter, bright eyes, and the comfort of being together.",
    images: [
      "/images/WhatsApp Image 2026-03-14 at 12.05.19 AM.jpeg",
    ],
  },
  {
    id: 4,
    date: "27/06/2026",
    title: "Our Beautiful Destination",
    description: "Looking back at the memories created and smiling. A perfect milestone celebrating you and the happiness you bring.",
    images: [
      "/images/WhatsApp Image 2026-07-02 at 10.04.26 PM.jpeg",
    ],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

// ─── IMAGE SLIDER COMPONENT ──────────────────────────────────────────────────
function ImageSlider({ images, title, onImageClick, onViewed }: { images: string[]; title: string; onImageClick: (src: string) => void; onViewed: (src: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  // Reset index when active milestone changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  // Report viewed image
  useEffect(() => {
    if (images[currentIndex]) {
      onViewed(images[currentIndex]);
    }
  }, [currentIndex, images, onViewed]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      onClick={() => onImageClick(images[currentIndex])}
      className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-md mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group bg-neutral-900 border border-white/10 cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {images.map((src, idx) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={src}
              alt={`${title} slide ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-25 w-10 h-10 rounded-full bg-black/50 hover:bg-pink backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/10"
            aria-label="Previous image"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-25 w-10 h-10 rounded-full bg-black/50 hover:bg-pink backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/10"
            aria-label="Next image"
          >
            ▶
          </button>
        </>
      )}

      {/* Bottom Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-25 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-6 bg-pink" : "w-1.5 bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Movie-style overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-15" />
    </div>
  );
}

// ─── MAIN EXPERIENCE ─────────────────────────────────────────────────────────
function MainExperience() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicOn, setMusicOn] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [unlockedSteps, setUnlockedSteps] = useState<number[]>([0]);
  const [galleryActive, setGalleryActive] = useState(false);

  // Handle active audio track based on current timeline milestone or active gallery section
  useEffect(() => {
    let targetAudioUrl = TIMELINE_DATA[activeStep]?.audioUrl || MUSIC_URL;

    // Switch to Happy Birthday song when scrolling in/to the gallery section
    if (galleryActive) {
      targetAudioUrl = "https://raw.githubusercontent.com/ProgrammerGaurav/happy-birthday/master/music.mp3";
    }
    
    if (!audioRef.current) {
      audioRef.current = new Audio(targetAudioUrl);
      audioRef.current.volume = 0.35;
    } else {
      // Check if the source needs to be updated
      const currentSrc = audioRef.current.src;
      const targetAbsolute = targetAudioUrl.startsWith("http") 
        ? targetAudioUrl 
        : window.location.origin + targetAudioUrl;
        
      if (currentSrc !== targetAbsolute) {
        audioRef.current.pause();
        audioRef.current.src = targetAudioUrl;
      }
    }

    // Always enforce looping
    audioRef.current.loop = true;

    if (musicOn) {
      audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));
    } else {
      audioRef.current.pause();
    }
  }, [activeStep, musicOn, galleryActive]);

  useEffect(() => {
    // opening burst
    fireConfetti();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const toggleMusic = () => {
    setMusicOn(!musicOn);
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
      <CakeSection />
      <TimelineSection 
        activeStep={activeStep} 
        setActiveStep={setActiveStep} 
        unlockedSteps={unlockedSteps} 
        setUnlockedSteps={setUnlockedSteps} 
      />
      <GallerySection onVisibleChange={setGalleryActive} />
      <MemoryWallSection />
      <LetterSection />
      <FinaleSection />
    </div>
  );
}

// ─── TIMELINE SECTION ────────────────────────────────────────────────────────
interface TimelineSectionProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  unlockedSteps: number[];
  setUnlockedSteps: (steps: number[]) => void;
}

function TimelineSection({ activeStep, setActiveStep, unlockedSteps, setUnlockedSteps }: TimelineSectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewedImages, setViewedImages] = useState<Record<string, boolean>>({});

  const handleViewed = (src: string) => {
    setViewedImages((prev) => {
      if (prev[src]) return prev;
      return { ...prev, [src]: true };
    });
  };

  const currentMilestone = TIMELINE_DATA[activeStep];
  const allImagesViewed = currentMilestone.images.every(img => viewedImages[img]);

  const unlockNext = () => {
    if (activeStep < TIMELINE_DATA.length - 1 && allImagesViewed) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      if (!unlockedSteps.includes(nextStep)) {
        setUnlockedSteps([...unlockedSteps, nextStep]);
      }
      // Trigger a confetti burst on unlocking new steps
      fireConfetti();
    }
  };

  const handleStepClick = (index: number) => {
    if (unlockedSteps.includes(index)) {
      setActiveStep(index);
    }
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <SectionHeading eyebrow="Our Journey" title="A Beautiful Timeline" />

      {/* Single Line Timeline Track */}
      <div className="mt-20 relative max-w-4xl mx-auto px-4 md:px-12">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-neutral-800 -translate-y-1/2 z-0 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-pink via-lavender to-gold transition-all duration-700 ease-out"
            style={{
              width: `${(unlockedSteps.length - 1) / (TIMELINE_DATA.length - 1) * 100}%`,
            }}
          />
        </div>

        {/* Milestone Nodes */}
        <div className="relative flex justify-between items-center z-10">
          {TIMELINE_DATA.map((item, idx) => {
            const isUnlocked = unlockedSteps.includes(idx);
            const isActive = activeStep === idx;
            return (
              <button
                key={item.id}
                onClick={() => handleStepClick(idx)}
                disabled={!isUnlocked}
                className={`relative flex flex-col items-center group focus:outline-none transition-all duration-500 ${
                  isUnlocked ? "cursor-pointer" : "cursor-not-allowed opacity-40"
                }`}
              >
                {/* Node bubble */}
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-display text-xs md:text-sm transition-all duration-500 ${
                    isActive
                      ? "scale-115 text-neutral-900 font-bold border-4 border-white shadow-[0_0_25px_var(--pink)]"
                      : isUnlocked
                      ? "text-white border-2 border-pink/60 hover:scale-105"
                      : "text-neutral-500 border-2 border-neutral-700"
                  }`}
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, var(--pink), var(--gold))"
                      : isUnlocked
                      ? "var(--card)"
                      : "#111",
                  }}
                >
                  {idx + 1}
                </div>

                {/* Node Date Label */}
                <span
                  className={`absolute -bottom-10 whitespace-nowrap text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 ${
                    isActive ? "text-gold font-bold scale-105" : isUnlocked ? "text-neutral-200" : "text-neutral-500"
                  }`}
                >
                  {item.date}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Milestone Card & Photos */}
      <div className="mt-24 max-w-5xl mx-auto animate-fade-up" key={activeStep}>
        <div className="glass rounded-3xl p-6 md:p-12 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink to-transparent animate-shimmer" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Description Text */}
            <div className="lg:col-span-2 space-y-4 text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-pink font-semibold">Milestone {activeStep + 1}</span>
              <h3 className="text-3xl md:text-4xl text-gradient font-display font-bold leading-tight">
                {TIMELINE_DATA[activeStep].title}
              </h3>
              <p className="text-sm md:text-base text-gold font-medium font-mono">{TIMELINE_DATA[activeStep].date}</p>
              
              {/* Progress/View Checkmark Indicators */}
              <div className="flex items-center gap-2">
                {allImagesViewed ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase animate-fade-up">
                    ✓ All Memories Seen
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase animate-glow-pulse">
                    👁 View all slides ({currentMilestone.images.filter(img => viewedImages[img]).length} / {currentMilestone.images.length})
                  </span>
                )}
              </div>

              <p className="text-neutral-300 font-light leading-relaxed pt-2">
                {TIMELINE_DATA[activeStep].description}
              </p>

              {/* Progress Button */}
              {activeStep < TIMELINE_DATA.length - 1 ? (
                <button
                  onClick={unlockNext}
                  disabled={!allImagesViewed}
                  className={`mt-6 text-sm py-3 px-6 rounded-full transition-all duration-300 ${
                    allImagesViewed 
                      ? "btn-premium btn-premium-hover cursor-pointer" 
                      : "bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed opacity-60"
                  }`}
                >
                  Unlock Next Date ➔
                </button>
              ) : (
                <div className="inline-block mt-6 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-widest font-bold">
                  ✨ Journey Unfolded 🎉
                </div>
              )}
            </div>

            {/* Photos slider */}
            <div className="lg:col-span-3">
              <ImageSlider 
                images={TIMELINE_DATA[activeStep].images} 
                title={TIMELINE_DATA[activeStep].title} 
                onImageClick={setSelectedImage} 
                onViewed={handleViewed}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for Timeline Images */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh]">
            <img src={selectedImage} alt="Enlarged memory" className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl border border-white/10 object-contain" />
            <button className="absolute -top-10 right-0 text-white text-3xl hover:text-pink transition-colors">✕</button>
          </div>
        </div>
      )}
    </section>
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
function GalleryItem({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`group glass rounded-3xl overflow-hidden aspect-[4/5] relative transition-all duration-1000 ease-out transform ${
        visible 
          ? "opacity-100 translate-y-0 scale-100 rotate-0" 
          : "opacity-0 translate-y-16 scale-90 -rotate-2"
      }`}
      style={{ 
        boxShadow: "var(--shadow-glass), 0 0 30px oklch(0.78 0.17 350 / 0.12)",
        transitionDelay: `${(index % 3) * 150}ms`
      }}
    >
      <img
        src={src}
        alt={`Memory ${index + 1}`}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
        <span className="text-white text-xs uppercase tracking-[0.2em] bg-pink/80 px-4 py-2 rounded-full backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-semibold border border-white/10">
          View Memory 🔍
        </span>
      </div>
    </button>
  );
}

function GallerySection({ onVisibleChange }: { onVisibleChange: (visible: boolean) => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onVisibleChange(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [onVisibleChange]);

  return (
    <section ref={ref} className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeading eyebrow="Moments" title="A Little Gallery" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {GALLERY.map((src, i) => (
          <GalleryItem
            key={i}
            src={src}
            index={i}
            onClick={() => setLightbox(src)}
          />
        ))}
      </div>

      {/* Happy Birthday Cutie Text */}
      <div className="mt-16 text-center animate-fade-up">
        <h3 className="text-3xl md:text-5xl font-script text-gold" style={{ textShadow: "var(--glow-gold)" }}>
          Happy Birthday Cutie! 💖🌸
        </h3>
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
const LETTER = `Hey ${HER_NAME}, Happy Birthday! 🎉❤️

Mujhe pata hai ki tumhe mujhse pehle wish karne wale aur bhi bahut log honge, aur shayad woh meri comparison mein tumhari zyada care bhi karte honge. Bas main itna chahta tha ki aaj ke din tumhare chehre par hamesha ek smile rahe.

I hope ye naya saal tumhari life mein bahut saari happiness, success aur beautiful memories lekar aaye. Khush raho, healthy raho, aur apne saare dreams achieve karo.


Once again, Happy Birthday! 🎂✨

I think apni ye last mulaqat ho. Theek hai... khush raho yaar. Ja bhi rahi ho, theek hai...

Goodbye from my side. Once again, Happy Birthday!

Thanks for the most beautiful memories jo maine tumhare saath spend ki hain.

But waqt aa gaya hai ki tumse alvida le liya jaye. Khush raho yaar, bas.

Main tumhare liye kuch complex nahi kar raha hoon, bas side hat raha hoon, because yaar, mujhse jyda pyaar krne wale log hai yr.

So please, stay healthy, stay safe.

Maybe bas ek baar aur milenge, if...

Aur jab bhi future mein kabhi milo, to mujhe ignore ya gusse se mat milna yaar. I don't want that. Jab bhi kabhi milein, bas chehre par ek smile ho.

Aur haan, saath mein bahut achhi yaadein bhi hain.

Sooooo... Goodbye, ${HER_NAME}. ❤️

– Mayur`;

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
        <h2 className="text-5xl md:text-7xl mb-6 text-gradient">Thank you for everything.</h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 italic font-light">
          Goody Byee.<br /><br />I really miss you.
        </p>
        <button onClick={celebrate} className="btn-premium btn-premium-hover text-lg" style={{ boxShadow: "var(--glow-gold), 0 0 80px oklch(0.78 0.17 350 / 0.6)" }}>
          Happy Birthday Once Again ❤️
        </button>
        {final && (
          <p className="mt-16 text-2xl md:text-3xl font-script text-gold animate-fade-up">
            Alvida... ❤️
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
