"use client";
import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export function AudioPlayer({ src, title }: { src: string; title?: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); } else { ref.current.play(); }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    if (!ref.current) return;
    setProgress((ref.current.currentTime / ref.current.duration) * 100 || 0);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    ref.current.currentTime = pct * ref.current.duration;
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <audio ref={ref} src={src} onTimeUpdate={onTimeUpdate} onEnded={() => setPlaying(false)} />
      {title && <p className="text-xs text-[var(--color-muted)] mb-3 font-[family-name:var(--font-accent)] uppercase tracking-wider">Now Playing</p>}
      <div className="flex items-center gap-4">
        <button onClick={toggle} className="w-12 h-12 rounded-full bg-[var(--color-green)] text-white flex items-center justify-center hover:bg-[var(--color-green-light)] transition-colors shrink-0">
          {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>
        <div className="flex-1 cursor-pointer" onClick={seek}>
          <div className="h-2 bg-black/10 rounded-full overflow-hidden">
            <div className="h-full bg-[var(--color-green)] rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <button onClick={() => { if (ref.current) ref.current.muted = !muted; setMuted(!muted); }} className="text-[var(--color-muted)] hover:text-[var(--color-green)]">
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}
