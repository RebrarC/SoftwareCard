import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { ARALIK, BASLANGIC_BUTCE, BOYUTLAR, GOLGE, RENKLER, TIPOGRAFI } from '../constants';

function butceRengi(kalanButce) {
  const oran = kalanButce / BASLANGIC_BUTCE;
  if (oran > 0.5) return RENKLER.butce.yuksek;
  if (oran > 0.2) return RENKLER.butce.orta;
  return RENKLER.butce.dusuk;
}

export default function BudgetBar({ kalanButce, harcanan }) {
  const animDeger = useRef(new Animated.Value(kalanButce / BASLANGIC_BUTCE)).current;
  const renk = butceRengi(kalanButce);
  const hedefOran = Math.max(0, kalanButce / BASLANGIC_BUTCE);

  useEffect(() => {
    Animated.spring(animDeger, {
      toValue: hedefOran,
      useNativeDriver: false,
      tension: 60,
      friction: 10,
    }).start();
  }, [hedefOran]);

  const genislik = animDeger.interpolate({
    inputRange:  [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.kapsayici}>
      <View style={styles.ustSatir}>
        <View>
          <Text style={styles.etiket}>BÜTÇE</Text>
          <Text style={[styles.miktar, { color: renk }]}>{kalanButce} puan</Text>
        </View>
        <View style={styles.sagBilgi}>
          <Text style={styles.harcananEtiket}>Harcanan</Text>
          <Text style={styles.harcananDeger}>{harcanan} puan</Text>
        </View>
      </View>

      <View style={styles.cubukZemin}>
        <Animated.View style={[styles.cubukDolu, { width: genislik, backgroundColor: renk }]} />
      </View>

      <View style={styles.altSatir}>
        <Text style={styles.altMetin}>0</Text>
        <Text style={styles.altMetin}>{BASLANGIC_BUTCE}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kapsayici: {
    backgroundColor: RENKLER.butce.zemin,
    marginHorizontal: ARALIK.xl,
    marginBottom: ARALIK.lg,
    borderRadius: BOYUTLAR.borderRadius.lg,
    padding: ARALIK.lg,
    ...GOLGE.md,
  },
  ustSatir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: ARALIK.md,
  },
  etiket: {
    ...TIPOGRAFI.etiket,
    color: RENKLER.metin.ikincil,
    marginBottom: 2,
  },
  miktar: {
    ...TIPOGRAFI.h2,
    letterSpacing: -0.5,
  },
  sagBilgi: {
    alignItems: 'flex-end',
  },
  harcananEtiket: {
    ...TIPOGRAFI.caption,
    color: RENKLER.metin.ikincil,
    marginBottom: 2,
  },
  harcananDeger: {
    ...TIPOGRAFI.altBaslik,
    color: RENKLER.metin.govde,
  },
  cubukZemin: {
    height: 10,
    backgroundColor: RENKLER.arkaplan,
    borderRadius: BOYUTLAR.borderRadius.pill,
    overflow: 'hidden',
    marginBottom: ARALIK.xs,
  },
  cubukDolu: {
    height: '100%',
    borderRadius: BOYUTLAR.borderRadius.pill,
  },
  altSatir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  altMetin: {
    ...TIPOGRAFI.caption,
    color: RENKLER.metin.yer_tutucu,
  },
});
