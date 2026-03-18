import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ARALIK, BASLANGIC_BUTCE, BOYUTLAR, GOLGE, RENKLER, TIPOGRAFI } from '../constants';

export default function OyunSonu({ iseAlinanSayisi, harcanan, onYenidenOyna }) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 9,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const verimlilik = harcanan > 0
    ? Math.round((iseAlinanSayisi / (harcanan / BASLANGIC_BUTCE)) * 10) / 10
    : 0;

  return (
    <Animated.View style={[styles.kapsayici, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.ust}>
        <Text style={styles.buyukEmoji}>🎉</Text>
        <Text style={styles.baslik}>Harika İş!</Text>
        <Text style={styles.aciklama}>
          {iseAlinanSayisi} kişilik takımını {harcanan} puanla kurdun.
        </Text>
      </View>

      <View style={styles.istatistikSatiri}>
        <IstatistikKutusu etiket="İşe Alınan" deger={`${iseAlinanSayisi}`} birim="kişi" emoji="👥" renk="#6366f1" />
        <IstatistikKutusu etiket="Harcanan"   deger={`${harcanan}`}         birim="puan" emoji="💸" renk="#f59e0b" />
        <IstatistikKutusu etiket="Kalan"      deger={`${BASLANGIC_BUTCE - harcanan}`} birim="puan" emoji="💰" renk="#10b981" />
      </View>

      <TouchableOpacity
        style={styles.buton}
        onPress={onYenidenOyna}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Yeniden oyna"
      >
        <Text style={styles.butonMetin}>🔄  Yeniden Oyna</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function IstatistikKutusu({ etiket, deger, birim, emoji, renk }) {
  return (
    <View style={styles.kutu}>
      <View style={[styles.kutuIkon, { backgroundColor: renk + '18' }]}>
        <Text style={styles.kutuEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.kutuDeger}>{deger}</Text>
      <Text style={styles.kutuBirim}>{birim}</Text>
      <Text style={styles.kutuEtiket}>{etiket}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  kapsayici: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ARALIK.xxxl,
    paddingBottom: ARALIK.xxxl,
    backgroundColor: RENKLER.arkaplan,
  },
  ust: {
    alignItems: 'center',
    marginBottom: ARALIK.xxxl,
  },
  buyukEmoji: {
    fontSize: 72,
    marginBottom: ARALIK.lg,
  },
  baslik: {
    ...TIPOGRAFI.h1,
    color: RENKLER.metin.baslik,
    marginBottom: ARALIK.sm,
    textAlign: 'center',
  },
  aciklama: {
    ...TIPOGRAFI.govde,
    color: RENKLER.metin.ikincil,
    textAlign: 'center',
    lineHeight: 22,
  },
  istatistikSatiri: {
    flexDirection: 'row',
    gap: ARALIK.md,
    marginBottom: ARALIK.xxxl,
    width: '100%',
  },
  kutu: {
    flex: 1,
    backgroundColor: RENKLER.yuzey,
    borderRadius: BOYUTLAR.borderRadius.lg,
    padding: ARALIK.lg,
    alignItems: 'center',
    ...GOLGE.sm,
  },
  kutuIkon: {
    width: 40,
    height: 40,
    borderRadius: BOYUTLAR.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ARALIK.sm,
  },
  kutuEmoji: {
    fontSize: 20,
  },
  kutuDeger: {
    ...TIPOGRAFI.h2,
    color: RENKLER.metin.baslik,
  },
  kutuBirim: {
    ...TIPOGRAFI.caption,
    color: RENKLER.metin.ikincil,
    marginBottom: 2,
  },
  kutuEtiket: {
    ...TIPOGRAFI.etiket,
    color: RENKLER.metin.yer_tutucu,
    textTransform: 'uppercase',
  },
  buton: {
    backgroundColor: RENKLER.primary,
    borderRadius: BOYUTLAR.borderRadius.md,
    paddingVertical: 16,
    paddingHorizontal: ARALIK.xxxl + ARALIK.lg,
    minHeight: BOYUTLAR.dokunma,
    alignItems: 'center',
    justifyContent: 'center',
    ...GOLGE.md,
  },
  butonMetin: {
    ...TIPOGRAFI.altBaslik,
    fontSize: 16,
    color: '#ffffff',
    letterSpacing: 0.2,
  },
});
