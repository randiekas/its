<template>
	<div class="grey lighten-4" style="height:100%">
		<v-container>
		<v-card>
                <v-app-bar
                    color="white"
                    elevation="0">
                    <v-btn 
                        icon
                        v-on:click="goBack">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>

                    <v-toolbar-title>CETAK KK</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn 
                        v-on:click="handelCetak"
                        small>
                        <v-icon left>mdi-printer</v-icon>
                        Cetak KK
                    </v-btn>
                </v-app-bar>
                
            </v-card>
            <v-card class="mt-6">
                <v-card-text>
                    <vue-html2pdf
                        :show-layout="true"
                        :float-layout="false"
                        :enable-download="false"
                        :preview-modal="true"
                        filename="print laporan"
                        :paginate-elements-by-height="1100"
                        :pdf-quality="2"
                        pdf-format="a4"
                        pdf-orientation="landscape"
                        pdf-content-width="100%"
                        :manual-pagination="false"
                        ref="html2Pdf">
                        <section slot="pdf-content" style="padding:12px">
                            <div class="text-center">
                                <h1 class="text-h5" style="font-size: 36px">KARTU KELUARGA</h1>
                                <h1>No. {{ no_kk }}</h1>
                            </div>
                            <br/>
                            <small>
                            <table style="width:100%; margin-left:8px; margin-right:8px; margin-bottom:16px;">
                                <thead>
                                    <tr>
                                        <th width="35px" class="text-center">NO</th>
                                        <th class="text-center">Nama Lengkap</th>
                                        <th class="text-center">NIK</th>
                                        <th class="text-center">Jenis Kelamin</th>
                                        <th class="text-center">Tempat Lahir</th>
                                        <th class="text-center">Tanggal Lahir</th>
                                        <th class="text-center">Agama</th>
                                        <th class="text-center">Pendidikan</th>
                                        <th class="text-center">Jenis Pekerjaan</th>
                                        <th class="text-center">Golongan Darah</th>
                                    </tr>
                                    <tr>
                                        <th class="text-center"></th>
                                        <th class="text-center">(1)</th>
                                        <th class="text-center">(2)</th>
                                        <th class="text-center">(3)</th>
                                        <th class="text-center">(4)</th>
                                        <th class="text-center">(5)</th>
                                        <th class="text-center">(6)</th>
                                        <th class="text-center">(7)</th>
                                        <th class="text-center">(8)</th>
                                        <th class="text-center">(9)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in data" :key="index">
                                        <td>{{ index+1 }}</td>        
                                        <td>{{ item.nama_lengkap }}</td>        
                                        <td>{{ item.nik }}</td>        
                                        <td>{{ item.jenis_kelamin==="l"?"Laki-laki":"Perempuan" }}</td>        
                                        <td>{{ item.tempat_lahir }}</td>        
                                        <td>{{ item.tanggal_lahir }}</td>        
                                        <td>{{ item.agama }}</td>        
                                        <td>{{ item.pendidikan }}</td>        
                                        <td>{{ item.jenis_pekerjaan }}</td>        
                                        <td>{{ item.golongan_darah }}</td>        
                                    </tr>
                                </tbody>
                            </table>
                            </small>

                            <br/>
                            <small>
                            <table style="width:100%; margin-left:8px; margin-right:8px; margin-bottom:16px;">
                                <thead>
                                    <tr>
                                        <th width="35px" rowspan="2" class="text-center">NO</th>
                                        <th rowspan="2" class="text-center">Status Perkawinan</th>
                                        <th rowspan="2" class="text-center">Tanggal Perkawinan</th>
                                        <th rowspan="2" class="text-center">Status Hubungan Dalam Keluarga</th>
                                        <th rowspan="2" class="text-center">Kewarganegaraan</th>
                                        <th class="text-center" colspan="2">Dokumen Imigrasi</th>
                                        <th class="text-center" colspan="2">Nama Orang Tua</th>
                                    </tr>
                                    <tr>
                                        <th class="text-center">No. Paspor</th>
                                        <th class="text-center">No. KITAP</th>
                                        <th class="text-center">Ayah</th>
                                        <th class="text-center">Ibu</th>
                                    </tr>
                                    <tr>
                                        <th class="text-center"></th>
                                        <th class="text-center">(10)</th>
                                        <th class="text-center">(11)</th>
                                        <th class="text-center">(12)</th>
                                        <th class="text-center">(13)</th>
                                        <th class="text-center">(14)</th>
                                        <th class="text-center">(15)</th>
                                        <th class="text-center">(16)</th>
                                        <th class="text-center">(17)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in data" :key="index">
                                        <td>{{ index+1 }}</td>        
                                        <td>{{ item.status_perkawinan }}</td>        
                                        <td>{{ item.tanggal_perkawinan }}</td>        
                                        <td>{{ item.status_hubungan_dalam_keluarga }}</td>        
                                        <td>{{ item.kewarganegaraan }}</td>        
                                        <td>{{ item.no_paspor }}</td>        
                                        <td>{{ item.no_kitap }}</td>        
                                        <td>{{ item.ayah }}</td>        
                                        <td>{{ item.ibu }}</td>             
                                    </tr>
                                </tbody>
                            </table>
                            </small>
                            <br/>
                            <v-row>
                                <v-col>
                                    Dikeluarkan Tanggal : {{$moment().format("DD-MM-YYYY")}}
                                </v-col>
                                <v-col class="text-center">
                                    KEPALA KELUARGA 
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    
                                    <i>{{ kepala_keluarga.nama_lengkap }}</i> <br/>
                                    Tanda Tangan/Cap Jempol
                                </v-col>
                                <v-col class="text-center">
                                    KEPALA DESA
                                    <br/>
                                    <br/>
                                    <center>
                                    <v-img
                                        width="128px"
                                        :src="`http://sikadduduk-morowali.asschem.id/${desa.lampiran}`"/>
                                    </center>
                                    <br/>
                                    <i>{{ desa.nama_kepala_desa }}</i><br/>
                                    
                                </v-col>
                            </v-row>
                            <br/>
                            <br/>
                            Dokumen ini telah ditandatangani secara elektronik menggunakan sertifikat elektronik yang diterbitkan oleh Balai Sertifikasi Elektronik (BSrE), BSSN
                        </section>
                        
                    </vue-html2pdf>
                </v-card-text>
            </v-card>
		</v-container>
	</div>
</template>
<script>
import VueHtml2pdf from 'vue-html2pdf'
export default {
    layout:'apps',
    components: {
        VueHtml2pdf
    },
	props: [],
    async asyncData({ params, $api }) {
        let no_kk           = params.nokk
        let id_desa         = params.iddesa
		let desa            = (await $api.$get(`/v1/api/detil/master_desa/${id_desa}`)).data
		let data            = (await $api.$get(`/v1/api/query/master_kk_anggota?where=no_kk='${no_kk}'`)).data
        let kepala_keluarga = data.filter((item)=>item.status_hubungan_dalam_keluarga.toLocaleLowerCase()=="kepala keluarga")[0]
		return {
            no_kk,
            data,
			kepala_keluarga,
            desa
		}
	},
    beforeMount: function(){
        // this.crud.apiData               = `${this.crud.api}?where=id_kk=${this.id_kk}`
        // this.crud.headers[0].default    = this.id_kk
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
        }
    },
	methods:{
		handelCetak(){
			this.$refs.html2Pdf.generatePdf()
		},
        goBack(){
            history.back()
        },
	}
}
</script>
<style scoped>
table, th, td
{
    border-collapse:collapse;
    border: 1px solid black;
    text-align:center;
}
.text-center{
    text-align:center
}
</style>