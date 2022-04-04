<template>
	<div class="grey lighten-4" style="height:100%">
		<v-container>
		<Crud
			:crud="crud">
            <template v-slot:action="{handleOpenFormTambah}">
                <v-btn 
                    small 
                    class="d-none d-sm-flex mx-2"
                    to="/apps/penduduk/import">
                    <v-icon left>mdi-microsoft-excel</v-icon>
                    Import Excell
                </v-btn>
                <v-btn 
                    small 
                    color="primary"
                    v-on:click="handleOpenFormTambah"
                    class="d-none d-sm-flex">
                    <v-icon left>mdi-plus-circle</v-icon>
                    Tambah
                </v-btn>
            </template>
            <template v-slot:filter="{handleUpdateData, handelSearch}">
                <v-row class="ml-2 mr-2 pt-0 pb-0 justify-center align-center" dense>
                    <v-col md="2" cols="12">
                        <v-autocomplete
                            label="Pilih Kecamatan"
                            v-model="kecamatanDipilih"
                            :items="kecamatan"
                            item-text="nama"
                            item-value="id"/>
                    </v-col>
                    <v-col md="2" cols="12">
                        <v-autocomplete
                            label="Pilih Desa"
                            v-model="desaDipilih"
                            :items="desa"
                            item-text="nama"
                            item-value="id"/>
                    </v-col>
                    <v-col md="2" cols="12">
                        <v-autocomplete
                            label="Pilih Dusun"
                            v-model="dusunDipilih"
                            :items="dusun"
                            item-text="nama"
                            item-value="id"/>
                    </v-col>
                    <v-col md="4" cols="12">
                        <v-text-field
                            v-on:keyup="handelSearch"
                            label="Kata kunci"
                            placeholder="Masukkan kata kunci"
                            />
                    </v-col>
                    <v-col md="2" cols="12">
                        <v-btn 
                            small 
                            block
                            v-on:click="handleUpdateData">
                            <v-icon left small>
                                mdi-text-box-search-outline
                            </v-icon>
                            Tampilkan
                        </v-btn>
                    </v-col>
                </v-row>
            </template>
            <template v-slot:aksi="{item, handleOpenFormEdit, handleKonfirmasiHapus}">
                <v-btn small icon v-on:click="handleOpenFormEdit(item)">
                    <v-icon small>
                        mdi-pencil
                    </v-icon>
                </v-btn>
                <v-btn small icon v-on:click="handleKonfirmasiHapus(item)">
                    <v-icon small>
                        mdi-delete
                    </v-icon>
                </v-btn>
                <!-- <v-btn small icon class="primary" :to="`/apps/kk/${item.id}`" dark>
                    <v-icon small>
                        mdi-account-group-outline
                    </v-icon>
                </v-btn> -->
            </template>
        </Crud>
		</v-container>
	</div>
</template>
<script>
export default {
	layout:'apps',
	props: [],
    async asyncData({ $api }) {
		let provinsi    = (await $api.$get(`/v1/api/data/master_provinsi`)).data
        let kabupaten   = (await $api.$get(`/v1/api/query/master_kabupaten?where=id_provinsi=${provinsi[0].id}`)).data
        let kecamatan   = (await $api.$get(`/v1/api/query/master_kecamatan?where=id_kabupaten=${kabupaten[0].id}`)).data
        let desa        = (await $api.$get(`/v1/api/query/master_desa?where=id_kecamatan=${kecamatan[0].id}`)).data
        let dusun       = (await $api.$get(`/v1/api/query/master_dusun?where=id_desa=${desa[0].id}`)).data
		return {
			provinsi,
            provinsiDipilih: provinsi[0].id,
            kabupaten,
            kabupatenDipilih: kabupaten[0].id,
            kecamatan,
            kecamatanDipilih: kecamatan[0].id,
            desa,
            desaDipilih: desa[0].id,
            dusun,
            dusunDipilih: dusun[0].id,
		}
	},
    watch: {
        provinsiDipilih: async function (val) {
            this.kabupaten                  = (await this.$api.$get(`/v1/api/query/master_kabupaten?where=id_provinsi=${val}`)).data
            this.kecamatan                  = []
            this.desa                       = []
            this.dusun                      = []
        },
        kabupatenDipilih: async function (val) {
            this.kecamatan                  = (await this.$api.$get(`/v1/api/query/master_kecamatan?where=id_kabupaten=${val}`)).data
            this.desa                       = []
            this.dusun                      = []
        },
        kecamatanDipilih: async function (val) {
            this.desa                       = (await this.$api.$get(`/v1/api/query/master_desa?where=id_kecamatan=${val}`)).data
            this.dusun                      = []
        },
        desaDipilih: async function (val) {
            this.dusun                      = (await this.$api.$get(`/v1/api/query/master_dusun?where=id_desa=${val}`)).data
        },
        dusunDipilih: async function (val) {
            this.crud.apiData               = `${this.crud.api}?where=id_dusun=${val}`
            this.crud.headers[0].default    = val
        },
    },
    beforeMount: function(){
        this.crud.apiData               = `${this.crud.api}?where=id_dusun=${this.dusunDipilih}`
        this.crud.headers[0].default    = this.dusunDipilih
    },
	data(){
        return {
            crud: {
                title: "Penduduk",
                subtitle: "Kelola data penduduk",
                api: `/v1/api/query/master_kk_anggota`,
                apiData: `/v1/api/query/master_kk_anggota`,
                apiTambah: `/v1/api/tambah/master_kk_anggota`,
                apiUbah: `/v1/api/ubah/master_kk_anggota`,
                apiHapus: `/v1/api/hapus/master_kk_anggota`,

                headers: [    
                    {
                        text: 'Dusun',
                        value: 'id_dusun',
                        type: 'hidden',
                        table: false,
                        default: 0,
                    },                 
                    {
                        text: 'KK',
                        value: 'no_kk',
                        info: ['Contoh : 12030437273947'],
                        width: '200px',
                    }, 
                    {
                        text: 'NIK',
                        value: 'nik', 
                        info: ['Contoh : 12030437273947'],
                        width: '200px',
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
                                value: 'l',
                            },
                            {
                                label: 'Perempuan',
                                value: 'p',
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
                            {
                                label: 'Kepercayaan Lainnya',
                                value: 'lainnya',
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
                        text: 'Status Perubahan',
                        value: 'status',
                        type:'radio',
                        width: '150px',
                        options: [
                            {
                                label: 'Lahir',
                                value: 'lahir',
                            },
                            {
                                label: 'Mati',
                                value: 'mati',
                            },
                            {
                                label: 'Keluar',
                                value: 'keluar',
                            },
                            {
                                label: 'Datang',
                                value: 'datang',
                            },
                            {
                                label: 'Permanen',
                                value: 'permanen',
                            },
                        ],
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
