<template>
	<div class="grey lighten-4" style="height:100%">
		<v-container>
            <v-app-bar
            color="white"
            elevation="0"
            >
            <v-btn 
                icon
                v-on:click="goBack">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <v-toolbar-title>{{crud.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
                <v-btn 
                    small 
                    class="d-none d-sm-flex mx-2"
                    v-on:click="handelPilihFile">
                    <v-icon left>mdi-microsoft-excel</v-icon>
                    Pilih file
                </v-btn>
                <input 
                    type="file" 
                    id="input-file"
                    class="d-none"
                    v-on:change="handelPilihFileProses"/>
                <v-btn 
                    small 
                    color="primary"
                    v-on:click="handelSimpan"
                    class="d-none d-sm-flex"
                    :disabled="error">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    Simpan
                </v-btn>
    </v-app-bar>
		

        <v-data-table
			dense
			:headers="crud.headers.filter((item)=>item.table!=false)"
			:items="data"
            :items-per-page="20"
			item-key="name"
			elevation="0"
			height="75vh"
            >
			<!-- <template v-slot:[`item.status`]="{item}">
				<v-switch v-model="item.status" readonly class="mt-0" style="height:-webkit-fill-available"/>
			</template> -->
            <!-- <template v-slot:[`item.id_dusun`]="{item}">
                <div class="primary white--text">
                    {{ item.id_dusun }}
                </div>
			</template> -->
			<!-- <template v-slot:[`item.aksi`]="{item}">
                <div>
                    <slot 
                        name="aksi" 
                        :handleOpenFormEdit="handleOpenFormEdit" 
                        :handleKonfirmasiHapus="handleKonfirmasiHapus"
                        :item="item">
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
                    </slot>
                </div>
			</template> -->
			
		</v-data-table>
        
		</v-container>
        <v-dialog
			v-model="isFetching"
			hide-overlay
			persistent
			width="300"
			>
			<v-card
				color="primary"
				dark
			>
				<v-card-text>
				Menyimpan ...
				<v-progress-linear
					indeterminate
					color="white"
					class="mb-0"
				></v-progress-linear>
				</v-card-text>
			</v-card>
		</v-dialog>
        <v-dialog
            v-if="dialog"
			v-model="modal"            
			width="300">
			<v-alert
                v-model="modal"
                border="top"
                color="green accent-4"
                dark
                dismissible
                type="success"
                >
                {{ dialog.message }}
            </v-alert>
		</v-dialog>
	</div>
</template>
<script>
import readXlsxFile from 'read-excel-file'
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
        
    },
    beforeMount: function(){
        
    },
	data(){
        return {
            error:true,
            isFetching: false,
            dialog: {},
            modal:false,
            crud: {
                title: "Import Penduduk",
                subtitle: "Kelola data penduduk",
                api: `/v1/api/query/master_kk_anggota`,
                apiData: `/v1/api/query/master_kk_anggota`,
                apiTambah: `/v1/api/tambah_master_kk_anggota`,
                apiUbah: `/v1/api/ubah/master_kk_anggota`,
                apiHapus: `/v1/api/hapus/master_kk_anggota`,

                headers: [    
                    {
                        text: 'Dusun',
                        value: 'id_dusun',    
                        width: '150px',                    
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
                            },
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
                        ],
                    }, 
                    // {
                    //     text: 'Aksi',
                    //     value: 'aksi',
                    //     width: '100px',
                    //     form: false
                    // }
                ],
            },
            data:[]
        }
    },
	methods:{
        goBack(){
            history.back()
        },
		
        
        handelPilihFile(){
            document.getElementById("input-file").click()
        },
        handelPilihFileProses(event){
            let xlsxfile = event.target.files ? event.target.files[0] : null;
            const map = {
                'dusun': 'id_dusun',
                'no kk': 'no_kk',
                'nik': 'nik',
                'nama lengkap': 'nama_lengkap',
                'kelamin': 'jenis_kelamin',
                'tempat lahir': 'tempat_lahir',
                'tanggal lahir': 'tanggal_lahir',
                'agama': 'agama',
                'pendidikan': 'pendidikan',
                'jenis pekerjaan': 'jenis_pekerjaan',
                'gol darah': 'golongan_darah',
                'status perkawinan': 'status_perkawinan',
                'tanggal perkawinan': 'tanggal_perkawinan',
                'status hubungan': 'status_hubungan_dalam_keluarga',
                'kewarganegaraan': 'kewarganegaraan',
                'no paspor': 'no_paspor',
                'no kitap': 'no_kitap',
                'nama ayah': 'ayah',
                'nama ibu': 'ibu',
                'status perubahan': 'status',
            }
            event.target.value = ''
            readXlsxFile(xlsxfile, {map}).then((rows) => {
                const error = false;
                const dusun = []
                this.dusun.filter((row)=>{
                    dusun[row.nama] = row.id
                })
                this.data   = rows.rows.map((item)=>{
                    if(dusun[item.id_dusun]){
                        item.id_dusun       = dusun[item.id_dusun]
                    }else{
                        item.id_dusun       = '[belum dibuat]'
                        error               = true
                    }
                    item.status_hubungan_dalam_keluarga = item.status_hubungan_dalam_keluarga.toLocaleLowerCase()
                    item.tanggal_lahir      = this.$moment(item.tanggal_lahir).format('YYYY-MM-DD')
                    item.tanggal_perkawinan = this.$moment(item.tanggal_perkawinan).format('YYYY-MM-DD')
                    return item
                })
                this.error          = error
            })
            
        },
        handelSimpan: function(){
			this.isFetching = true
            const api       = this.crud.apiTambah
			this.$api.$post(api, this.data).then(async (resp)=>{
                this.isFetching = false
                this.dialog     = {
                    message: resp.message,
                    status: resp.status
                }
				if(resp.status){
                    this.dialogForm     = false
                    this.modal          = true
                    setTimeout(this.goBack, 1000)
                    
				}
			})
		},
	}
}
</script>
