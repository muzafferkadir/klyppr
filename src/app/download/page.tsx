'use client';

import { useEffect, useState } from 'react';

type OS = 'mac' | 'win';
type Lang = 'tr' | 'en';

const REPO = 'muzafferkadir/klyppr-desktop';
const MAC_CMD = `curl -fsSL https://raw.githubusercontent.com/${REPO}/main/install.sh | bash`;
const WIN_CMD = `irm https://raw.githubusercontent.com/${REPO}/main/install.ps1 | iex`;
const BREW_CMD = 'brew install --cask muzafferkadir/tap/klyppr';

const copy = {
  tr: {
    tagline: 'Otomatik video sessizlik kesici. Sessiz boşlukları bulur, iyi kısımları tutar.',
    mac: 'macOS', win: 'Windows',
    step1mac: '1 · Terminal’i aç', step1macHint: '⌘ + Boşluk → “Terminal” yaz → Enter.',
    step1win: '1 · PowerShell’i aç', step1winHint: '⊞ Win → “PowerShell” yaz → Enter.',
    step2: '2 · Bu komutu yapıştır',
    macHint: 'Klyppr.app’i Applications’a kurar (Apple Silicon & Intel). Gatekeeper uyarısı çıkmaz.',
    winHint: 'En son imzalı kurulumu indirip çalıştırır. Klyppr’ı Başlat menüsünden aç.',
    brew: 'Homebrew ile:', manual: '.dmg’yi elle indir', manualWin: '.exe’yi elle indir',
    copy: 'Kopyala', copied: 'Kopyalandı!',
    foot: 'FFmpeg uygulama tarafından ilk açılışta indirilir — başka kurulum gerekmez.',
    back: '← Web sürümüne dön',
  },
  en: {
    tagline: 'Automatic video silence cutter. Finds the quiet gaps, keeps the good parts.',
    mac: 'macOS', win: 'Windows',
    step1mac: '1 · Open Terminal', step1macHint: '⌘ + Space → type “Terminal” → Enter.',
    step1win: '1 · Open PowerShell', step1winHint: '⊞ Win → type “PowerShell” → Enter.',
    step2: '2 · Paste this command',
    macHint: 'Installs Klyppr.app to Applications (Apple Silicon & Intel). No Gatekeeper prompt.',
    winHint: 'Downloads and runs the latest signed installer. Launch Klyppr from the Start menu.',
    brew: 'With Homebrew:', manual: 'download the .dmg', manualWin: 'download the .exe',
    copy: 'Copy', copied: 'Copied!',
    foot: 'FFmpeg is downloaded by the app on first launch — nothing else to set up.',
    back: '← Back to the web version',
  },
};

function CopyRow({ cmd, prompt, label, copied }: { cmd: string; prompt: string; label: string; copied: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="flex items-center gap-3 overflow-x-auto rounded-xl border border-hairline bg-black/30 px-4 py-3.5">
      <span className="select-none font-mono text-accent">{prompt}</span>
      <code className="whitespace-nowrap font-mono text-[13.5px] text-ink">{cmd}</code>
      <button
        type="button"
        onClick={async () => {
          try { await navigator.clipboard.writeText(cmd); setDone(true); setTimeout(() => setDone(false), 1500); } catch {}
        }}
        className={`ml-auto flex-shrink-0 rounded-lg px-3.5 py-1.5 text-[13px] font-semibold text-white transition-colors ${done ? 'bg-success' : 'bg-accent hover:bg-accent-hover'}`}
      >
        {done ? copied : label}
      </button>
    </div>
  );
}

export default function DownloadPage() {
  const [os, setOs] = useState<OS>('mac');
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setOs(navigator.userAgent.includes('Windows') ? 'win' : 'mac');
      if (navigator.language?.toLowerCase().startsWith('tr')) setLang('tr');
    }
  }, []);

  const t = copy[lang];

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-5 py-14">
      <div className="mb-6 flex justify-end gap-1.5">
        {(['tr', 'en'] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase transition ${lang === l ? 'bg-accent text-white' : 'text-ink-3 hover:text-ink'}`}
          >
            {l}
          </button>
        ))}
      </div>

      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-ink">Klyppr</h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-ink-2">{t.tagline}</p>
      </header>

      <div className="mb-5 flex justify-center gap-2">
        {(['mac', 'win'] as OS[]).map((o) => (
          <button
            key={o}
            onClick={() => setOs(o)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              os === o ? 'border-accent bg-accent text-white' : 'border-hairline bg-surface text-ink-2 hover:text-ink'
            }`}
          >
            {o === 'mac' ? `🍎 ${t.mac}` : `🪟 ${t.win}`}
          </button>
        ))}
      </div>

      {os === 'mac' ? (
        <section>
          <div className="mb-4 rounded-2xl border border-hairline bg-surface p-5">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-3">{t.step1mac}</div>
            <p className="text-sm text-ink-2">{t.step1macHint}</p>
          </div>
          <div className="mb-4 rounded-2xl border border-hairline bg-surface p-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">{t.step2}</div>
            <CopyRow cmd={MAC_CMD} prompt="$" label={t.copy} copied={t.copied} />
            <p className="mt-3 text-[13.5px] text-ink-2">{t.macHint}</p>
          </div>
          <p className="text-center text-[13px] text-ink-3">
            {t.brew} <code className="font-mono text-ink-2">{BREW_CMD}</code>
            <span className="mx-1.5">·</span>
            <a href={`https://github.com/${REPO}/releases/latest`} className="text-accent hover:underline">{t.manual}</a>
          </p>
        </section>
      ) : (
        <section>
          <div className="mb-4 rounded-2xl border border-hairline bg-surface p-5">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-3">{t.step1win}</div>
            <p className="text-sm text-ink-2">{t.step1winHint}</p>
          </div>
          <div className="mb-4 rounded-2xl border border-hairline bg-surface p-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-3">{t.step2}</div>
            <CopyRow cmd={WIN_CMD} prompt=">" label={t.copy} copied={t.copied} />
            <p className="mt-3 text-[13.5px] text-ink-2">{t.winHint}</p>
          </div>
          <p className="text-center text-[13px] text-ink-3">
            <a href={`https://github.com/${REPO}/releases/latest`} className="text-accent hover:underline">{t.manualWin}</a>
          </p>
        </section>
      )}

      <footer className="mt-12 text-center text-[13px] text-ink-3">
        <p>{t.foot}</p>
        <a href="/" className="mt-3 inline-block text-ink-2 hover:text-ink">{t.back}</a>
      </footer>
    </main>
  );
}
