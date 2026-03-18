import { useRef } from 'react';
import {
  Animated, Platform,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import { ARALIK, BOYUTLAR, GOLGE, RENKLER, SEVİYE_EMOJİ, TIPOGRAFI } from '../constants';
import Avatar from './Avatar';
import DurumRozeti from './DurumRozeti';

export default function ProfilKarti({ ad, uzmanlik, seviye, maliyet, iseAlindi, butceYetersiz, onIseAl }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const kartRengi = iseAlindi
    ? RENKLER.kart.mesgul
    : butceYetersiz
    ? RENKLER.kart.yetersiz
    : RENKLER.kart.musait;

  const emoji = SEVİYE_EMOJİ[seviye] ?? '';

  function basıldı() {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
        speed: 50,
        bounciness: 0,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 6,
      }),
    ]).start();
    onIseAl();
  }

  return (
    <Animated.View style={[styles.kart, { backgroundColor: kartRengi, transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.ustSatir}>
        <Avatar ad={ad} />
        <BilgiBlogu ad={ad} uzmanlik={uzmanlik} seviye={seviye} emoji={emoji} maliyet={maliyet} />
        <DurumRozeti musaitMi={!iseAlindi} />
      </View>
      <IseAlButonu
        iseAlindi={iseAlindi}
        butceYetersiz={butceYetersiz}
        onPress={basıldı}
      />
    </Animated.View>
  );
}

function BilgiBlogu({ ad, uzmanlik, seviye, emoji, maliyet }) {
  return (
    <View style={styles.bilgiler}>
      <Text style={styles.ad} numberOfLines={1}>{ad}</Text>
      <Text style={styles.uzmanlik} numberOfLines={1}>{uzmanlik}</Text>
      <View style={styles.altSatir}>
        <Text style={styles.seviye}>{emoji} {seviye}</Text>
        <View style={styles.maliyetKapsayici}>
          <Text style={styles.maliyetMetin}>💰 {maliyet} puan</Text>
        </View>
      </View>
    </View>
  );
}

function IseAlButonu({ iseAlindi, butceYetersiz, onPress }) {
  const devreDisi = iseAlindi || butceYetersiz;

  const etiket = iseAlindi
    ? '✓  Projede çalışıyor'
    : butceYetersiz
    ? '🚫  Bütçe Yetersiz'
    : '+ İşe Al';

  const butonRengi = iseAlindi
    ? RENKLER.buton.devre
    : butceYetersiz
    ? RENKLER.buton.yetersiz
    : RENKLER.buton.aktif;

  const metinRengi = iseAlindi
    ? RENKLER.metin.butonDevre
    : butceYetersiz
    ? RENKLER.metin.butonYetersiz
    : RENKLER.metin.butonAktif;

  return (
    <TouchableOpacity
      style={[styles.buton, { backgroundColor: butonRengi }]}
      onPress={onPress}
      disabled={devreDisi}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={etiket}
      accessibilityState={{ disabled: devreDisi }}
    >
      <Text style={[styles.butonMetin, { color: metinRengi }]}>{etiket}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  kart: {
    borderRadius: BOYUTLAR.borderRadius.lg,
    padding: ARALIK.xl,
    marginBottom: ARALIK.lg,
    borderWidth: Platform.OS === 'android' ? 0 : 1,
    borderColor: 'rgba(0,0,0,0.04)',
    ...GOLGE.md,
  },
  ustSatir: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ARALIK.lg,
  },
  bilgiler: {
    flex: 1,
    marginRight: ARALIK.sm,
  },
  ad: {
    ...TIPOGRAFI.h3,
    color: RENKLER.metin.baslik,
    marginBottom: 2,
  },
  uzmanlik: {
    ...TIPOGRAFI.kucuk,
    color: RENKLER.metin.ikincil,
    marginBottom: ARALIK.xs,
  },
  altSatir: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ARALIK.sm,
  },
  seviye: {
    ...TIPOGRAFI.caption,
    color: RENKLER.metin.yer_tutucu,
    fontWeight: '600',
  },
  maliyetKapsayici: {
    backgroundColor: 'rgba(245,158,11,0.1)',
    borderRadius: BOYUTLAR.borderRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  maliyetMetin: {
    ...TIPOGRAFI.caption,
    color: '#b45309',
    fontWeight: '700',
  },
  // Minimum 44pt dokunma alanı (accessibility standardı)
  buton: {
    borderRadius: BOYUTLAR.borderRadius.md,
    paddingVertical: Platform.OS === 'android' ? 13 : 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: BOYUTLAR.dokunma,
  },
  butonMetin: {
    ...TIPOGRAFI.altBaslik,
    letterSpacing: 0.1,
  },
});
