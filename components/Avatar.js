import { Platform, StyleSheet, Text, View } from 'react-native';
import { BOYUTLAR, PALET, TIPOGRAFI } from '../constants';

function adınBasHarfleri(ad) {
  return ad
    .split(' ')
    .map((k) => k[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Her isim için tutarlı ama farklı bir renk tonu üretir
function avatarRengi(ad) {
  const renkler = [
    PALET.primary[500],
    PALET.secondary[500],
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#06b6d4',
  ];
  const index = ad.charCodeAt(0) % renkler.length;
  return renkler[index];
}

export default function Avatar({ ad }) {
  const renk = avatarRengi(ad);

  return (
    <View style={[styles.daire, { backgroundColor: renk }]}>
      {/* iOS'ta ince bir iç gölge efekti */}
      {Platform.OS === 'ios' && <View style={styles.iceGolge} />}
      <Text style={styles.harf}>{adınBasHarfleri(ad)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  daire: {
    width: BOYUTLAR.avatar,
    height: BOYUTLAR.avatar,
    borderRadius: BOYUTLAR.borderRadius.avatar,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iceGolge: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BOYUTLAR.borderRadius.avatar,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  harf: {
    ...TIPOGRAFI.h3,
    color: '#ffffff',
    includeFontPadding: false,
  },
});
