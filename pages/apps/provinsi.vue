<template>
	<div class="grey lighten-4" style="height:100%">
		<v-container>
		<Crud
			:crud="crud">
        </Crud>
		</v-container>
	</div>
</template>
<script>
export default {
	layout:'apps',
	props: ['tipe'],
	data(){
        return {
            crud: {
                title: "Provinsi",
                subtitle: "Kelola data provinsi",
			
                apiData: `/v1/api/data/master_provinsi`,
                apiTambah: `/v1/api/tambah/master_provinsi`,
                apiUbah: `/v1/api/ubah/master_provinsi`,
                apiHapus: `/v1/api/hapus/master_provinsi`,

                headers: [                    
                    {
                        text: 'Nama Provinsi',
                        value: 'nama',
                        info: ['Contoh : Jawa Barat, Jawa Timur dll']
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
