export interface KalkulatorData {
  id: string;
  tipe_kalkulasi: string;
  deskripsi: string;
  input: Record<string, number | string>;
  rumus_digunakan: string;
  hasil: {
    nilai: number;
    satuan: string;
  };
}

export interface JawabanLatihanData {
  kalkulator_anuitas_data: KalkulatorData[];
}
