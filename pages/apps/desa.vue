<template>
	<div class="grey lighten-4" style="height:100%">
		<v-container>
		<Crud
			:crud="crud">
            <template v-if="tipe==='desa'" v-slot:action>
                -
            </template>
            <template v-slot:filter="{handleUpdateData}">
                <v-row class="ml-2 mr-2 pt-0 pb-0 justify-center align-center" dense>
                    <v-col md="3" cols="12">
                        <v-autocomplete
                            label="Pilih Provinsi"
                            v-model="provinsiDipilih"
                            :items="provinsi"
                            item-text="nama"
                            item-value="id"/>
                    </v-col>
                    <v-col md="3" cols="12">
                        <v-autocomplete
                            label="Pilih Kabupaten"
                            v-model="kabupatenDipilih"
                            :items="kabupaten"
                            item-text="nama"
                            item-value="id"/>
                    </v-col>
                    <v-col md="4" cols="12">
                        <v-autocomplete
                            label="Pilih Kecamatan"
                            v-model="kecamatanDipilih"
                            :items="kecamatan"
                            item-text="nama"
                            item-value="id"/>
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
        </Crud>
		</v-container>
	</div>
</template>
<script>
export default {
	layout:'apps',
	props: ['tipe'],
    async asyncData({ $api }) {
		let provinsi    = (await $api.$get(`/v1/api/data/master_provinsi`)).data
        let kabupaten   = (await $api.$get(`/v1/api/query/master_kabupaten?where=id_provinsi=${provinsi[0].id}`)).data
        let kecamatan   = (await $api.$get(`/v1/api/query/master_kecamatan?where=id_kabupaten=${kabupaten[0].id}`)).data
		return {
			provinsi,
            provinsiDipilih: provinsi[0].id,
            kabupaten,
            kabupatenDipilih: kabupaten[0].id,
            kecamatan,
            kecamatanDipilih: kecamatan[0].id
		}
	},
    watch: {
        provinsiDipilih: async function (val) {
            this.kabupaten                  = (await this.$api.$get(`/v1/api/query/master_kabupaten?where=id_provinsi=${val}`)).data
            this.kecamatan                  = []
        },
        kabupatenDipilih: async function (val) {
            this.kecamatan                  = (await this.$api.$get(`/v1/api/query/master_kecamatan?where=id_kabupaten=${val}`)).data
        },
        kecamatanDipilih: async function (val) {
            this.crud.apiData               = `${this.crud.api}?where=id_kecamatan=${val}`
            this.crud.headers[0].default    = val
        },
    },
    beforeMount: function(){
        this.crud.apiData               = `${this.crud.api}?where=id_kecamatan=${this.kecamatanDipilih}`
        this.crud.headers[0].default    = this.kecamatanDipilih
    },
	data(){
        return {
            crud: {
                title: "Desa",
                subtitle: "Kelola data desa",
                api: `/v1/api/query/master_desa`,
                apiData: `/v1/api/query/master_desa`,
                apiTambah: `/v1/api/tambah/master_desa`,
                apiUbah: `/v1/api/ubah/master_desa`,
                apiHapus: `/v1/api/hapus/master_desa`,

                headers: [                    
                    {
                        text: 'Kecamatan',
                        value: 'id_kecamatan',
                        type: 'hidden',
                        table: false,
                        default: 0,
                    }, 
                    {
                        text: 'Email Pengelola',
                        value: 'email_pengelola',
                        info: ['Contoh : email@gmail.com']
                    }, 
                    {
                        text: 'Nama Desa',
                        value: 'nama',
                        info: ['Contoh : Keurea dll']
                    }, 
                    {
                        text: 'Nama Kepala Desa',
                        value: 'nama_kepala_desa',
                        info: ['Contoh : Keurea dll']
                    }, 
                    {
                        text: 'TTD Kepala Desa',
                        value: 'lampiran',
                        type:'file',
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
