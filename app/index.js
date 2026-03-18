import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BudgetBar from '../components/BudgetBar';
import OyunSonu from '../components/OyunSonu';
import ProfilKarti from '../components/ProfilKarti';
import {
  ARALIK,
  BASLANGIC_BUTCE,
  BOYUTLAR,
  GOLGE,
  RENKLER,
  SEVİYE_MALİYET,
  TIPOGRAFI,
  YAZILIMCILAR,
} from '../constants';

function oyunBittiMi(kalanButce, iseAlinanlar) {
  const tumAlindi      = YAZILIMCILAR.every((y) => iseAlinanlar[y.id]);
  const hicBiriAlinamaz = YAZILIMCILAR
    .filter((y) => !iseAlinanlar[y.id])
    .every((y) => SEVİYE_MALİYET[y.seviye] > kalanButce);
  return tumAlindi || hicBiriAlinamaz;
}

function BosDurum({ mesaj, ikon }) {
  return (
    <View style={bosDurumStil.kapsayici}>
      <Text style={bosDurumStil.ikon}>{ikon}</Text>
      <Text style={bosDurumStil.mesaj}>{mesaj}</Text>
    </View>
  );
}

const bosDurumStil = StyleSheet.create({
  kapsayici: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: ARALIK.xxxl,
  },
  ikon: { fontSize: 48, marginBottom: ARALIK.lg },
  mesaj: {
    ...TIPOGRAFI.altBaslik,
    color: RENKLER.metin.ikincil,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default function App() {
  const [kalanButce, setKalanButce]   = useState(BASLANGIC_BUTCE);
  const [iseAlinanlar, setIseAlinanlar] = useState({});

  const harcanan        = BASLANGIC_BUTCE - kalanButce;
  const iseAlinanSayisi = Object.keys(iseAlinanlar).length;
  const oyunBitti       = oyunBittiMi(kalanButce, iseAlinanlar);

  const yazilimciIseAl = useCallback((yazilimci) => {
    const maliyet = SEVİYE_MALİYET[yazilimci.seviye];
    setKalanButce((onceki) => onceki - maliyet);
    setIseAlinanlar((onceki) => ({ ...onceki, [yazilimci.id]: true }));
  }, []);

  const oyunuSifirla = useCallback(() => {
    setKalanButce(BASLANGIC_BUTCE);
    setIseAlinanlar({});
  }, []);

  if (oyunBitti) {
    return (
      <SafeAreaView style={styles.ekran}>
        <StatusBar style="dark" />
        <OyunSonu
          iseAlinanSayisi={iseAlinanSayisi}
          harcanan={harcanan}
          onYenidenOyna={oyunuSifirla}
        />
      </SafeAreaView>
    );
  }

  const gosterilecekListeBosMu = YAZILIMCILAR.length === 0;

  return (
    <SafeAreaView style={styles.ekran}>
      <StatusBar style="dark" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerUstYazi}>TAKIM KURMA</Text>
          <Text style={styles.headerBaslik}>İşe Alım</Text>
        </View>
        <View style={styles.sayac}>
          <Text style={styles.sayacDeger}>{iseAlinanSayisi}</Text>
          <Text style={styles.sayacEtiket}>işe alındı</Text>
        </View>
      </View>

      {/* ── Bütçe Çubuğu ── */}
      <BudgetBar kalanButce={kalanButce} harcanan={harcanan} />

      {/* ── Liste ── */}
      {gosterilecekListeBosMu ? (
        <BosDurum
          ikon="😶"
          mesaj="Henüz yazılımcı yok. Yakında yeni adaylar gelecek!"
        />
      ) : (
        <FlatList
          data={YAZILIMCILAR}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.liste}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <BosDurum ikon="🎉" mesaj="Tüm yazılımcılar değerlendirildi!" />
          }
          renderItem={({ item }) => {
            const maliyet = SEVİYE_MALİYET[item.seviye];
            return (
              <ProfilKarti
                ad={item.ad}
                uzmanlik={item.uzmanlik}
                seviye={item.seviye}
                maliyet={maliyet}
                iseAlindi={!!iseAlinanlar[item.id]}
                butceYetersiz={!iseAlinanlar[item.id] && kalanButce < maliyet}
                onIseAl={() => yazilimciIseAl(item)}
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ekran: {
    flex: 1,
    backgroundColor: RENKLER.arkaplan,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ARALIK.xl,
    paddingTop: Platform.OS === 'android' ? ARALIK.xl : ARALIK.md,
    paddingBottom: ARALIK.lg,
  },
  headerUstYazi: {
    ...TIPOGRAFI.etiket,
    color: RENKLER.metin.ikincil,
    marginBottom: 2,
  },
  headerBaslik: {
    ...TIPOGRAFI.h2,
    color: RENKLER.metin.baslik,
  },
  sayac: {
    backgroundColor: RENKLER.yuzey,
    borderRadius: BOYUTLAR.borderRadius.md,
    paddingHorizontal: ARALIK.lg,
    paddingVertical: ARALIK.sm,
    alignItems: 'center',
    ...GOLGE.sm,
  },
  sayacDeger: {
    ...TIPOGRAFI.h2,
    color: RENKLER.primary,
    lineHeight: 26,
  },
  sayacEtiket: {
    ...TIPOGRAFI.caption,
    color: RENKLER.metin.ikincil,
  },
  liste: {
    paddingHorizontal: ARALIK.xl,
    paddingBottom: ARALIK.xxl,
  },
});
