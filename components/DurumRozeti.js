import { StyleSheet, Text, View } from 'react-native';
import { BOYUTLAR, RENKLER, TIPOGRAFI } from '../constants';

export default function DurumRozeti({ musaitMi }) {
  const renk  = musaitMi ? RENKLER.rozet.musait : RENKLER.rozet.mesgul;
  const etiket = musaitMi ? 'Müsait' : 'Meşgul';

  return (
    <View style={[styles.rozet, { backgroundColor: renk.zemin }]}>
      <View style={[styles.nokta, { backgroundColor: renk.nokta }]} />
      <Text style={[styles.etiket, { color: renk.metin }]}>{etiket}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rozet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BOYUTLAR.borderRadius.pill,
    alignSelf: 'flex-start',
  },
  nokta: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  etiket: {
    ...TIPOGRAFI.etiket,
    textTransform: 'uppercase',
  },
});
