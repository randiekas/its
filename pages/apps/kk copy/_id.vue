<template>
	<div class="grey lighten-4" style="height:100%">
		<v-container>
		<Crud
			:crud="crud">
            <template v-slot:filter>
                
            </template>
        </Crud>
		</v-container>
	</div>
</template>
<script>
export default {
	layout:'apps',
	props: [],
    async asyncData({ params }) {
		
		return {
			id_kk: params.id
		}
	},
    beforeMount: function(){
        this.crud.apiData               = `${this.crud.api}?where=id_kk=${this.id_kk}`
        this.crud.headers[0].default    = this.id_kk
    },
	data(){
        return {
            crud: {
                title: "Anggota Keluarga",
                subtitle: "Kelola data kartu keluarga",
                api: `/v1/api/query/master_kk_anggota`,
                apiData: `/v1/api/query/master_kk_anggota`,
                apiTambah: `/v1/api/tambah/master_kk_anggota`,
                apiUbah: `/v1/api/ubah/master_kk_anggota`,
                apiHapus: `/v1/api/hapus/master_kk_anggota`,

                headers: [                    
                    {
                        text: 'KK',
                        value: 'id_kk',
                        type: 'hidden',
                        table: false,
                        default: 0,
                    }, 
                    {
                        text: 'NIK',
                        value: 'nik', 
                        info: ['Contoh : 12030437273947']
                    }, 
                    {
                        text: 'Nama Lengkap',
                        value: 'nama_lengkap',
                        width: '200px',
                        info: ['Contoh : Yustako Latimin']
                    }, 
                    {
                        text: 'Kelamin',
                        value: 'jenis_kelamin',
                        type:'radio',
                        width: '150px',
                        options: [
                            {
                                label: 'Laki-laki',
                                value: 'L',
                            },
                            {
                                label: 'Perempuan',
                                value: 'P',
                            },
                        ],
                    }, 
                    {
                        text: 'Tempat Lahir',
                        value: 'tempat_lahir',
                        width: '150px',
                        info: ['Contoh : Kurea']
                    }, 
                    {
                        text: 'Tanggal Lahir',
                        value: 'tanggal_lahir',
                        width: '150px',
                        type: 'date',
                    }, 
                    {
                        text: 'Agama',
                        value: 'agama',
                        type:'radio',
                        width: '150px',
                        options: [
                            {
                                label: 'Islam',
                                value: 'islam',
                            },
                            {
                                label: 'Kristen',
                                value: 'kristen',
                            },
                            {
                                label: 'Khatolik',
                                value: 'khatolik',
                            },
                            {
                                label: 'Hindu',
                                value: 'hindu',
                            },
                            {
                                label: 'Budha',
                                value: 'budha',
                            },
                        ],
                    }, 
                    {
                        text: 'Pendidikan',
                        value: 'pendidikan',
                        type:'select',
                        width: '150px',
                        options: [
                            {
                                label: 'Belum/Tidak Sekolah',
                                value: 'belum/tidak sekolah',
                            },
                            {
                                label: 'SD',
                                value: 'sd',
                            },
                            {
                                label: 'SMP',
                                value: 'smp',
                            },
                            {
                                label: 'SMA',
                                value: 'sma',
                            },
                            {
                                label: 'D1',
                                value: 'd1',
                            },
                            {
                                label: 'D2',
                                value: 'd2',
                            },
                            {
                                label: 'D3',
                                value: 'd3',
                            },
                            {
                                label: 'D4/S1',
                                value: 'd4/s1',
                            },
                            {
                                label: 'S2',
                                value: 's2',
                            },
                            {
                                label: 'S3',
                                value: 's3',
                            },
                        ],
                    }, 
                    {
                        text: 'Jenis pekerjaan',
                        value: 'jenis_pekerjaan',
                        width: '200px',
                        type:'select',
                        options: [
                            {
                                label: 'Belum Bekerja',
                                value: 'belum bekerja',
                            },
                            {
                                label: 'Petani',
                                value: 'petani',
                            },
                            {
                                label: 'Nelayan',
                                value: 'nelayan',
                            },
                            {
                                label: 'Wiraswasta',
                                value: 'wiraswasta',
                            },
                            {
                                label: 'PNS',
                                value: 'pns',
                            },
                            {
                                label: 'Honorer',
                                value: 'honorer',
                            },
                            {
                                label: 'Karyawan Swasta',
                                value: 'karyawan swasta',
                            },
                            {
                                label: 'TNI/Abri',
                                value: 'tni/abri',
                            },
                            {
                                label: 'Polisi',
                                value: 'polisi',
                            },
                            {
                                label: 'Lainnya',
                                value: 'lainnya',
                            },
                        ],
                    }, 
                    {
                        text: 'Gol Darah',
                        value: 'golongan_darah',
                        type:'radio',
                        width: '150px',
                        options: [
                            {
                                label: 'A',
                                value: 'a',
                            },
                            {
                                label: 'AB',
                                value: 'ab',
                            },
                            {
                                label: 'b',
                                value: 'B',
                            },
                            {
                                label: 'O',
                                value: 'o',
                            },
                            {
                                label: 'Tidak Tahu',
                                value: 'tidak tahu',
                            }
                        ],
                    }, 
                    {
                        text: 'Status Perkawinan',
                        value: 'status_perkawinan',
                        type:'select',
                        width: '200px',
                        options: [
                            {
                                label: 'Belum Kawin',
                                value: 'belum kawin',
                            },
                            {
                                label: 'Kawin Tecatat',
                                value: 'kawin tercatat',
                            },
                            {
                                label: 'Kawin Belum Tercatat',
                                value: 'kawin belum tercatat',
                            },
                            {
                                label: 'Cerai Mati',
                                value: 'cerai mati',
                            },
                            {
                                label: 'Cerai Hidup',
                                value: 'cerai hidup',
                            },
                        ],
                    }, 
                    {
                        text: 'Tgl. Perkawinan',
                        value: 'tanggal_perkawinan',
                        type: 'date',
                        width: '150px',
                    }, 
                    {
                        text: 'Status Hubungan',
                        value: 'status_hubungan_dalam_keluarga',
                        type:'select',
                        width: '150px',
                        options: [
                            {
                                label: 'Kepala Keluarga',
                                value: 'kepala keluarga',
                            },
                            {
                                label: 'Istri',
                                value: 'istri',
                            },
                            {
                                label: 'Anak',
                                value: 'anak',
                            },
                            {
                                label: 'Menantu',
                                value: 'menantu',
                            },
                            {
                                label: 'Cucu',
                                value: 'cucu',
                            },
                            {
                                label: 'Orang Tua',
                                value: 'orang tua',
                            },
                            {
                                label: 'Mertua',
                                value: 'mertua',
                            },
                            {
                                label: 'Lainnya',
                                value: 'lainnya',
                            },
                        ],
                    }, 
                    {
                        text: 'Kewarganegaraan',
                        value: 'kewarganegaraan',
                        type:'radio',
                        width: '150px',
                        options: [
                            {
                                label: 'WNI',
                                value: 'wni',
                            },
                            {
                                label: 'WNA',
                                value: 'wna',
                            },
                        ],
                    }, 
                    {
                        text: 'No. Paspor',
                        value: 'no_paspor',
                        width: '200px',
                    }, 
                    {
                        text: 'No. KITAP',
                        value: 'no_kitap',
                        width: '200px',
                    }, 
                    {
                        text: 'Ayah',
                        value: 'ayah',
                        width: '200px',
                    }, 
                    {
                        text: 'Ibu',
                        value: 'ibu',
                        width: '200px',
                    }, 
                    {
                        text: 'Aksi',
                        value: 'aksi',
                        width: '100px',
                        form: false
                    }
                ],
            },
            data:[]
        }
    },
	methods:{
		
	}
}
</script>
