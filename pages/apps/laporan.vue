<template>
	<div class="grey lighten-4 fill-height">
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

                    <v-toolbar-title>Laporan Penduduk</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn 
                        v-on:click="handelCetak"
                        small
                        class="primary">
                        <v-icon left>mdi-database-refresh-outline</v-icon>
                        Generate data
                    </v-btn>
                </v-app-bar>
                <v-row class="ml-2 mr-2 pt-0 pb-0 justify-center align-center" dense>
                    <v-col md="1" cols="12">
                        <v-autocomplete
                            label="Tahun"
                            v-model="tahunDipilih"
                            :items="tahun"
                            item-text="nama"
                            item-value="id"/>
                    </v-col>
                    <v-col md="1" cols="12">
                        <v-autocomplete
                            label="Bulan"
                            v-model="bulanDipilih"
                            :items="bulan"
                            item-text="nama"
                            item-value="id"/>
                    </v-col>
                    
                    <v-col md="3" cols="12">
                        <v-autocomplete
                            label="Pilih Kecamatan"
                            v-model="kecamatanDipilih"
                            :items="kecamatan"
                            item-text="nama"
                            item-value="id"/>
                    </v-col>
                    <v-col md="3" cols="12">
                        <v-autocomplete
                            label="Pilih Desa"
                            v-model="desaDipilih"
                            :items="desa"
                            item-text="nama"
                            item-value="id"/>
                    </v-col>
                    <v-col md="2" cols="12">
                        <v-btn 
                            small 
                            block
                            v-on:click="handelUpdateData">
                            <v-icon left small>
                                mdi-text-box-search-outline
                            </v-icon>
                            Tampilkan
                        </v-btn>
                    </v-col>
                    <v-col md="2" cols="12">
                        <v-btn 
                            small 
                            block
                            v-on:click="handelCetak">
                            <v-icon left small>
                                mdi-printer
                            </v-icon>
                            Cetak / Export PDF
                        </v-btn>
                    </v-col>
                </v-row>
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
                                <h1 class="text-h5" style="font-size: 36px">LAPORAN PENDUDUK PERMANEN TAHUN {{ tahunDipilih }}</h1>
                                <table>
                                    <tr>
                                        <td class="text-left">Bulan</td>
                                        <td class="text-left">: {{ teksBulan }}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">Desa / Kelurahan</td>
                                        <td class="text-left">: {{ teksDesa.nama || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">Kecamatan</td>
                                        <td class="text-left">: {{ teksKecamatan.nama || '-' }}</td>
                                    </tr>
                                </table>
                            </div>
                            <br/>
                            <p class="text-overline">1. Jumlah Penduduk</p>
                            <small>
                            <table class="table" style="width:100%; margin-left:8px; margin-right:8px; margin-bottom:16px;">
                                <thead>
                                    <tr >
                                        <th width="35px" rowspan="3" class="text-center">NO</th>
                                        <th rowspan="3" class="text-center">DUSUN</th>
                                        <th colspan="6" class="text-center">JUMLAH PENDUDUK&nbsp;</th>
                                        <th colspan="12" class="text-center">PROSES PERUBAHAN PENDUDUK</th>
                                        <th colspan="3" class="text-center">KK</th>
                                    </tr>
                                    <tr >
                                        <th colspan="3" class="text-center">BULAN LALU</th>
                                        <th colspan="3" class="text-center">BULAN INI</th>
                                        <th colspan="3" class="text-center">LAHIR</th>
                                        <th colspan="3" class="text-center">MATI</th>
                                        <th colspan="3" class="text-center">KELUAR</th>
                                        <th colspan="3" class="text-center">DATANG</th>
                                        <th width="35px" rowspan="2" class="text-center">L</th>
                                        <th width="35px" rowspan="2" class="text-center">P</th>
                                        <th width="35px" rowspan="2" class="text-center">JML</th>
                                    </tr>
                                    <tr >
                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>
                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>
                                        <th width="35px">L&nbsp;</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>
                                        <th width="35px">L&nbsp;</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>
                                        <th width="35px">L&nbsp;</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>
                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <tr v-for="(item, index) in data" :key="index">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ item.nama }}</td>

                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>{{ item.l }}</td>
                                        <td>{{ item.p }}</td>
                                        <td>{{ total(item, ['l', 'p']) }}</td>

                                        <td>{{ item.l_lahir }}</td>
                                        <td>{{ item.p_lahir }}</td>
                                        <td>{{ total(item, ['l_lahir', 'p_lahir']) }}</td>

                                        <td>{{ item.l_mati }}</td>
                                        <td>{{ item.p_mati }}</td>
                                        <td>{{ total(item, ['l_mati', 'p_mati']) }}</td>

                                        <td>{{ item.l_keluar }}</td>
                                        <td>{{ item.p_keluar }}</td>
                                        <td>{{ total(item, ['l_keluar', 'p_keluar']) }}</td>

                                        <td>{{ item.l_datang }}</td>
                                        <td>{{ item.p_datang }}</td>
                                        <td>{{ total(item, ['l_datang', 'p_datang']) }}</td>

                                        
                                        <td>{{ item.l_kk }}</td>
                                        <td>{{ item.p_kk }}</td>
                                        <td>{{ total(item, ['l_kk', 'p_kk']) }}</td>
                                    </tr>
                                </tbody>
                                
                            </table>
                            </small>
                            <p class="text-overline">2. Penduduk Berdasarkan Agama</p>
                            <small>
                            <table class="table" style="width:100%; margin-left:8px; margin-right:8px; margin-bottom:16px">
                                <thead>
                                    <tr >
                                        <th width="35px" rowspan="3" class="text-center">NO</th>
                                        <th rowspan="3" class="text-center">DUSUN</th>
                                        <th colspan="18" class="text-center">AGAMA&nbsp;</th>
                                        <th width="105px" rowspan="3" class="text-center">JUMLAH</th>
                                    </tr>
                                    <tr >
                                        <th colspan="3" class="text-center">ISLAM</th>
                                        <th colspan="3" class="text-center">KRISTEN</th>
                                        <th colspan="3" class="text-center">KHATOLIK</th>
                                        <th colspan="3" class="text-center">HINDU</th>
                                        <th colspan="3" class="text-center">BUDHA</th>
                                        <th colspan="3" class="text-center">LAINNYA</th>
                                    </tr>
                                    <tr >
                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <tr v-for="(item, index) in data" :key="index">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ item.nama }}</td>

                                        <td>{{ item.l_islam }}</td>
                                        <td>{{ item.p_islam }}</td>
                                        <td>{{ total(item, ['l_islam', 'p_islam']) }}</td>
                                        
                                        <td>{{ item.l_kristen }}</td>
                                        <td>{{ item.p_kristen }}</td>
                                        <td>{{ total(item, ['l_kristen', 'p_kristen']) }}</td>

                                        <td>{{ item.l_khatolik }}</td>
                                        <td>{{ item.p_khatolik }}</td>
                                        <td>{{ total(item, ['l_khatolik', 'p_khatolik']) }}</td>

                                        <td>{{ item.l_hindu }}</td>
                                        <td>{{ item.p_hindu }}</td>
                                        <td>{{ total(item, ['l_hindu', 'p_hindu']) }}</td>

                                        <td>{{ item.l_budha }}</td>
                                        <td>{{ item.p_budha }}</td>
                                        <td>{{ total(item, ['l_budha', 'p_budha']) }}</td>

                                        <td>{{ item.l_lainnya }}</td>
                                        <td>{{ item.p_lainnya }}</td>
                                        <td>{{ total(item, ['l_lainnya', 'p_lainnya']) }}</td>

                                        <td>{{ total(item, ['l_islam', 'p_islam', 'l_kristen', 'p_kristen', 'l_khatolik', 'p_khatolik', 'l_hindu', 'p_hindu', 'l_budha', 'p_budha', 'l_lainnya', 'p_lainnya'] ) }}</td>
                                    </tr>
                                </tbody>
                                
                            </table>
                            </small>

                            <p class="text-overline">3. Penduduk Berdasarkan Status Perkawinan</p>
                            <small>
                            <table class="table" style="width:100%; margin-left:8px; margin-right:8px; margin-bottom:16px">
                                <thead>
                                    <tr >
                                        <th width="35px" rowspan="3" class="text-center">NO</th>
                                        <th rowspan="3" class="text-center">DUSUN</th>
                                        <th colspan="15" class="text-center">STATUS PERKAWINAN&nbsp;</th>
                                        <th width="105px" rowspan="3" class="text-center">JUMLAH</th>
                                    </tr>
                                    <tr >
                                        <th colspan="3" class="text-center">BELUM KAWIN</th>
                                        <th colspan="3" class="text-center">KAWIN TERCATAT</th>
                                        <th colspan="3" class="text-center">KAWIN B. TERCATAT</th>
                                        <th colspan="3" class="text-center">CERAI MATI</th>
                                        <th colspan="3" class="text-center">CERAI HIDUP</th>
                                    </tr>
                                    <tr >
                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <tr v-for="(item, index) in data" :key="index">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ item.nama }}</td>

                                        <td>{{ item.l_belum_kawin }}</td>
                                        <td>{{ item.p_belum_kawin }}</td>
                                        <td>{{ total(item, ['l_belum_kawin', 'p_belum_kawin']) }}</td>

                                        <td>{{ item.l_kawin_tercatat }}</td>
                                        <td>{{ item.p_kawin_tercatat }}</td>
                                        <td>{{ total(item, ['l_kawin_tercatat', 'p_kawin_tercatat']) }}</td>

                                        <td>{{ item.l_belum_tercatat }}</td>
                                        <td>{{ item.p_belum_tercatat }}</td>
                                        <td>{{ total(item, ['l_belum_tercatat', 'p_belum_tercatat']) }}</td>

                                        <td>{{ item.l_cerai_mati }}</td>
                                        <td>{{ item.p_cerai_mati }}</td>
                                        <td>{{ total(item, ['l_cerai_mati', 'p_cerai_mati']) }}</td>

                                        <td>{{ item.l_cerai_hidup }}</td>
                                        <td>{{ item.p_cerai_hidup }}</td>
                                        <td>{{ total(item, ['l_cerai_hidup', 'p_cerai_hidup']) }}</td>

                                        <td>{{ total(item, ['l_belum_kawin', 'p_belum_kawin', 'l_kawin_tercatat', 'p_kawin_tercatat', 'l_belum_tercatat', 'p_belum_tercatat', 'l_cerai_mati', 'p_cerai_mati', 'l_cerai_hidup', 'p_cerai_hidup'] ) }}</td>
                                    </tr>
                                </tbody>
                                
                            </table>
                            </small>
                            
                            <p class="text-overline">4. Penduduk Berdasarkan Pendidikan</p>
                            <small>
                            <table class="table" style="width:100%; margin-left:8px; margin-right:8px; margin-bottom:16px">
                                <thead>
                                    <tr >
                                        <th width="35px" rowspan="3" class="text-center">NO</th>
                                        <th rowspan="3" class="text-center">DUSUN</th>
                                        <th colspan="10" class="text-center">PENDIDIKAN&nbsp;</th>
                                        <th width="105px" rowspan="3" class="text-center">JUMLAH</th>
                                    </tr>
                                    <tr >
                                        <th width="70px" rowspan="2" class="text-center">BLM/TDK<br/>SEKOLAH</th>
                                        <th width="35px" rowspan="2" class="text-center">SD</th>
                                        <th width="35px" rowspan="2" class="text-center">SMP</th>
                                        <th width="35px" rowspan="2" class="text-center">SMA</th>
                                        <th width="35px" colspan="6" class="text-center">PERGURUAN TINGGI</th>
                                        
                                    </tr>
                                    <tr >
                                        <th width="35px">D1</th>
                                        <th width="35px">D2</th>
                                        <th width="35px">D3</th>
                                        <th width="35px">D4/S1</th>
                                        <th width="35px">S2</th>
                                        <th width="35px">S3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <tr v-for="(item, index) in data" :key="index">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ item.nama }}</td>

                                        <td>{{ item.belum_sekolah }}</td>
                                        <td>{{ item.sd }}</td>
                                        <td>{{ item.smp }}</td>
                                        <td>{{ item.sma }}</td>
                                        <td>{{ item.d1 }}</td>
                                        <td>{{ item.d2 }}</td>
                                        <td>{{ item.d3 }}</td>
                                        <td>{{ item.s1 }}</td>
                                        <td>{{ item.s2 }}</td>
                                        <td>{{ item.s3 }}</td>

                                        <td>{{ total(item, ['belum_sekolah', 'sd', 'smp', 'sma', 'd1', 'd2', 'd3', 's1', 's2', 's3'] ) }}</td>
                                    </tr>
                                </tbody>
                                
                            </table>
                            </small>


                            <p class="text-overline">5. Penduduk Berdasarkan Pekerjaan</p>
                            <small>
                            <table class="table" style="width:100%; margin-left:8px; margin-right:8px; margin-bottom:16px">
                                <thead>
                                    <tr >
                                        <th width="35px" rowspan="3" class="text-center">NO</th>
                                        <th width="140px" rowspan="3" class="text-center">DUSUN</th>
                                        <th colspan="30" class="text-center">PEKERJAAN&nbsp;</th>
                                        <th width="105px" rowspan="3" class="text-center">JUMLAH</th>
                                    </tr>
                                    <tr >
                                        <th colspan="3" class="text-center">BELUM<br/>BEKERJA</th>
                                        <th colspan="3" class="text-center">PETANI</th>
                                        <th colspan="3" class="text-center">NELAYAN</th>
                                        <th colspan="3" class="text-center">WIRASWASTA</th>
                                        <th colspan="3" class="text-center">PNS</th>
                                        <th colspan="3" class="text-center">HONORER</th>
                                        <th colspan="3" class="text-center">KARYAWAN SWASTA</th>
                                        <th colspan="3" class="text-center">TNI/ABRI</th>
                                        <th colspan="3" class="text-center">POLISI</th>
                                        <th colspan="3" class="text-center">LAINNYA</th>
                                    </tr>
                                    <tr >
                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>

                                        <th width="35px">L</th>
                                        <th width="35px">P</th>
                                        <th width="35px">JML</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <tr v-for="(item, index) in data" :key="index">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ item.nama }}</td>

                                        <td>{{ item.l_belum }}</td>
                                        <td>{{ item.p_belum }}</td>
                                        <td>{{ total(item, ['l_belum', 'p_belum']) }}</td>

                                        <td>{{ item.l_petani }}</td>
                                        <td>{{ item.p_petani }}</td>
                                        <td>{{ total(item, ['l_petani', 'p_petani']) }}</td>

                                        <td>{{ item.l_nelayan }}</td>
                                        <td>{{ item.p_nelayan }}</td>
                                        <td>{{ total(item, ['l_nelayan', 'p_nelayan']) }}</td>

                                        <td>{{ item.l_wiraswasta }}</td>
                                        <td>{{ item.p_wiraswasta }}</td>
                                        <td>{{ total(item, ['l_wiraswasta', 'p_wiraswasta']) }}</td>

                                        <td>{{ item.l_pns }}</td>
                                        <td>{{ item.p_pns }}</td>
                                        <td>{{ total(item, ['l_pns', 'p_pns']) }}</td>

                                        <td>{{ item.l_honorer }}</td>
                                        <td>{{ item.p_honorer }}</td>
                                        <td>{{ total(item, ['l_honorer', 'p_honorer']) }}</td>

                                        <td>{{ item.l_karyawan }}</td>
                                        <td>{{ item.p_karyawan }}</td>
                                        <td>{{ total(item, ['l_karyawan', 'p_karyawan']) }}</td>

                                        <td>{{ item.l_tni }}</td>
                                        <td>{{ item.p_tni }}</td>
                                        <td>{{ total(item, ['l_tni', 'p_tni']) }}</td>

                                        <td>{{ item.l_polisi }}</td>
                                        <td>{{ item.p_polisi }}</td>
                                        <td>{{ total(item, ['l_polisi', 'p_polisi']) }}</td>

                                        <td>{{ item.l_lainnya }}</td>
                                        <td>{{ item.p_lainnya }}</td>
                                        <td>{{ total(item, ['l_lainnya', 'p_lainnya']) }}</td>


                                        <td>{{ total(item, [
                                            'l_belum', 'p_belum',
                                            'l_petani', 'p_petani',
                                            'l_nelayan', 'p_nelayan',
                                            'l_wiraswasta', 'p_wiraswasta',
                                            'l_pns', 'p_pns',
                                            'l_honorer', 'p_honorer',
                                            'l_karyawan', 'p_karyawan',
                                            'l_tni', 'p_tni',
                                            'l_polisi', 'p_polisi',
                                            'l_lainnya', 'p_lainnya'
                                            ] ) }}</td>
                                    </tr>
                                </tbody>
                                
                            </table>
                            </small>
                            <br/>
                            <v-row>
                                <v-col>
                                    
                                </v-col>
                                <v-col class="text-center">
                                    
                                </v-col>
                                <v-col class="text-center">
                                    KEPALA DESA
                                    <br/>
                                    <br/>
                                    <center>
                                    <v-img
                                        width="128px"
                                        :src="`http://sikadduduk-morowali.asschem.id/${teksDesa.lampiran}`"/>
                                    </center>
                                    <br/>
                                    <i>{{ teksDesa.nama_kepala_desa || '-' }}</i><br/>
                                    
                                </v-col>
                            </v-row>
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
    async asyncData({ $api }) {
        let grup        = [
                            'Jumlah Penduduk',
                            'Berdasarkan Agama',
                            'Berdasarkan Status Perkawinan',
                            'Berdasarkan Pendidikan',
                            'Berdasarkan Pekerjaan',
                        ]
		let kabupatenDipilih    = 1
        // let kecamatan   = (await $api.$get(`/v1/api/query/master_kecamatan?where=id_kabupaten=${kabupatenDipilih}`)).data
        let kecamatan   = (await $api.$get(`/v1/api/query/master_kecamatan?where=id_kabupaten=${kabupatenDipilih}`)).data
        let desa        = (await $api.$get(`/v1/api/query/master_desa?where=id_kecamatan=${kecamatan[0].id}`)).data
        
		return {
            grup,
            grupDipilih: 0,
            tahun: [2021],
            tahunDipilih: 2021,
            bulan: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'November', 'Oktober', 'Desember'],
            bulanDipilih: 'Agustus',
            teksBulan: 'Agustus',
            teksDesa: {},
            teksKecamatan: {},
            kabupatenDipilih,
            kecamatan,
            kecamatanDipilih: kecamatan[0].id,
            desa,
            desaDipilih: desa[0].id,
		}
	},
    watch: {
        kecamatanDipilih: async function (val) {
            this.desa                       = (await this.$api.$get(`/v1/api/query/master_desa?where=id_kecamatan=${val}`)).data
        },
        desaDipilih: async function (val) {
            
        },
    },
	data(){
        return {
            crud: {
                nested: true,
                title: "Laporan bulanan",
                subtitle: "Kelola data dusun",
                api: `/v1/api/query/master_dusun`,
                apiData: `/v1/api/query/master_dusun`,
                apiTambah: `/v1/api/tambah/master_dusun`,
                apiUbah: `/v1/api/ubah/master_dusun`,
                apiHapus: `/v1/api/hapus/master_dusun`,
            },
            data:[]
        }
    },
    mounted: function(){
        this.handelUpdateData()
    },
	methods:{
        goBack(){
            history.back()
        },
        
        total: function(item, data){
            let total = 0
            data.map((row)=>{
                total += parseInt(item[row])
            })
            return total
        },
        handelUpdateData: async function(){
            this.data           = (await this.$api.$get(`/v1/api/laporan_penduduk/${this.desaDipilih}`)).data
            this.teksBulan      = this.bulanDipilih
            this.teksDesa       = this.desa.filter((item)=>item.id===this.desaDipilih)[0] || {}
            this.teksKecamatan  = this.kecamatan.filter((item)=>item.id===this.kecamatanDipilih)[0] || {}
        },
        handelCetak(){
			this.$refs.html2Pdf.generatePdf()
		},
        handleUpdateData: function(){

        },
		
	}
}
</script>
<style scoped>
.table, .table tr th, .table tr td
{
    border-collapse:collapse;
    border: 1px solid black;
    text-align:center;
}
.text-center{
    text-align:center
}
</style>