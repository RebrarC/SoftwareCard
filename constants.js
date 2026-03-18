import { Platform } from 'react-native';

// ─── Primary & Secondary palette ─────────────────────────────────────────────
export const PALET = {
  primary: {
    50:  '#eef2ff',
    100: '#e0e7ff',
    400: '#818cf8',
    500: '#6366f1',   // primary
    600: '#4f46e5',
    700: '#4338ca',
  },
  secondary: {
    400: '#34d399',
    500: '#10b981',   // secondary
    600: '#059669',
  },
  danger:  { 400: '#f87171', 500: '#ef4444', 100: '#fee2e2' },
  warning: { 400: '#fbbf24', 500: '#f59e0b', 100: '#fef3c7' },
  success: { 400: '#4ade80', 500: '#22c55e', 100: '#dcfce7' },
  neutral: {
    0:   '#ffffff',
    50:  '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    700: '#334155',
    900: '#0f172a',
  },
};

// ─── Semantic colour tokens ───────────────────────────────────────────────────
export const RENKLER = {
  arkaplan:   PALET.neutral[100],
  yuzey:      PALET.neutral[0],
  sinir:      PALET.neutral[200],

  primary:    PALET.primary[500],
  primaryKoyu: PALET.primary[600],
  secondary:  PALET.secondary[500],

  kart: {
    musait:   '#f0fdf4',
    mesgul:   '#fff1f2',
    yetersiz: PALET.neutral[50],
  },
  rozet: {
    musait: { zemin: PALET.success[100],  nokta: PALET.secondary[500], metin: PALET.secondary[600] },
    mesgul: { zemin: PALET.danger[100],   nokta: PALET.danger[500],    metin: PALET.danger[500]    },
  },
  buton: {
    aktif:    PALET.primary[500],
    hover:    PALET.primary[600],
    devre:    PALET.neutral[200],
    yetersiz: PALET.danger[100],
  },
  metin: {
    baslik:       PALET.neutral[900],
    govde:        PALET.neutral[700],
    ikincil:      PALET.neutral[500],
    yer_tutucu:   PALET.neutral[400],
    butonAktif:   PALET.neutral[0],
    butonDevre:   PALET.neutral[400],
    butonYetersiz: PALET.danger[500],
  },
  butce: {
    yuksek: PALET.secondary[500],
    orta:   PALET.warning[500],
    dusuk:  PALET.danger[500],
    zemin:  PALET.neutral[0],
  },
  avatar: [PALET.primary[500], PALET.primary[700]],
};

// ─── Typography scale ─────────────────────────────────────────────────────────
export const TIPOGRAFI = {
  h1:      { fontSize: 28, fontWeight: '800', letterSpacing: -0.5, lineHeight: 34 },
  h2:      { fontSize: 22, fontWeight: '700', letterSpacing: -0.3, lineHeight: 28 },
  h3:      { fontSize: 17, fontWeight: '700', letterSpacing: -0.2, lineHeight: 22 },
  altBaslik: { fontSize: 15, fontWeight: '600', lineHeight: 20 },
  govde:   { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  kucuk:   { fontSize: 13, fontWeight: '400', lineHeight: 18 },
  caption: { fontSize: 11, fontWeight: '500', lineHeight: 14, letterSpacing: 0.2 },
  etiket:  { fontSize: 11, fontWeight: '700', lineHeight: 14, letterSpacing: 0.5 },
};

// ─── Spacing & radius ─────────────────────────────────────────────────────────
export const ARALIK = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 };

export const BOYUTLAR = {
  borderRadius: { sm: 8, md: 12, lg: 16, xl: 24, pill: 999, avatar: 28 },
  avatar: 56,
  dokunma: 44,      // accessibility minimum
  font: {           // backward-compat — artık TIPOGRAFI kullanılıyor
    baslik: 22, ad: 16, uzmanlik: 13, seviye: 12,
    rozet: 11, buton: 14, avatarHarf: 20, maliyet: 12,
  },
};

// ─── Shadow presets (Platform-aware) ─────────────────────────────────────────
export const GOLGE = {
  sm: Platform.select({
    ios:     { shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 4 },
    android: { elevation: 2 },
    default: { shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 4 },
  }),
  md: Platform.select({
    ios:     { shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.10, shadowRadius: 12 },
    android: { elevation: 6 },
    default: { shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.10, shadowRadius: 12 },
  }),
  lg: Platform.select({
    ios:     { shadowColor: '#0f172a', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.14, shadowRadius: 20 },
    android: { elevation: 12 },
    default: { shadowColor: '#0f172a', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.14, shadowRadius: 20 },
  }),
};

// ─── Domain data ──────────────────────────────────────────────────────────────
export const SEVİYE_EMOJİ    = { Junior: '🌱', 'Mid-level': '⚡', Senior: '🔥' };
export const SEVİYE_MALİYET  = { Junior: 10, 'Mid-level': 25, Senior: 40 };
export const BASLANGIC_BUTCE = 100;

export const YAZILIMCILAR = [
  { id: '1', ad: 'Ahmet Yılmaz', uzmanlik: 'React Native',   seviye: 'Senior'    },
  { id: '2', ad: 'Ayşe Kaya',    uzmanlik: 'Backend (Node.js)', seviye: 'Mid-level' },
  { id: '3', ad: 'Mehmet Demir', uzmanlik: 'Frontend (React)',  seviye: 'Junior'    },
  { id: '4', ad: 'Fatma Çelik',  uzmanlik: 'Full Stack',        seviye: 'Senior'    },
];
