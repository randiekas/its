<template>
	<div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
		<v-container>
			<Head
				title="ITS"
				subtitle="Intellegence Tutoring System"
				color="white--text">
				<v-btn 
					small 
					class="white"
					v-on:click="handelKeluar">
					<v-icon left>
						mdi-logout
					</v-icon>
					Keluar Aplikasi
				</v-btn>
			</Head>
			<v-row v-if="isFetching" class="mb-8">
				<v-col sm="12" md="3" cols="12">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
				<v-col sm="12" md="3" cols="12">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
				<v-col sm="12" md="3" cols="12">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
				<v-col sm="12" md="3" cols="12">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
			</v-row>
			
		</v-container>
		</div>
		<v-container class="mt-n16">
			<v-row class="mt-2 mt-n8">
				<v-col v-if="isFetching" sm="12" md="6" cols="12">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
				<v-col v-if="isFetching" sm="12" md="6" cols="12">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
				<v-col cols="12" md="12">
					<v-row>
						<v-col v-for="(item, index) in apps" :key="index" sm="12" md="12" cols="12">
							<v-card class="border--primary" elevation="1">
								<v-card-title class="pb-0">
									<v-icon left>{{item.ikon}}</v-icon>
									{{item.nama}}
								</v-card-title>
								<v-card-text>
									<div>{{item.deskripsi}}</div>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="primary" :to="item.link" text dark>
										Buka
										<v-icon right>mdi-launch</v-icon>
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>
<script>
export default {
	layout:'apps',
	props: ['apps', 'tipe', 'handelKeluar'],
	async asyncData({ }) {
		return {
			isFetching:true,
		}
	},
	data: () => ({
		
    }),
	mounted: function(){
		if(this.tipe==='desa'){
			this.handleUpdateDataDesa()
		}else if(this.tipe==='kecamatan'){
			this.handleUpdateDataKecamatan()
		}
		
	},
	methods:{
		handleUpdateDataDesa: async function(){
			this.isFetching	= true
			this.dasbor		= (await this.$api.$get(`/v1/api/dasborDesa`)).data
			if(this.dasbor.belum_kawin===null){
				this.dasbor	= {
						"lahir": 0,
						"mati": 0,
						"keluar": 0,
						"datang": 0,
						"kk": 0,
						"penduduk": 0,
						"islam": 0,
						"kristen": 0,
						"khatolik": 0,
						"hindu": 0,
						"budha": 0,
						"belum_kawin": 0,
						"kawin_tercatat": 0,
						"kawin_belum_tercatat": 0,
						"cerai_mati": 0,
						"dusun": this.dasbor.dusun,
						"desa": this.dasbor.desa,
						"ganda": []
					}
			}
			this.isFetching	= false
		},
		handleUpdateDataKecamatan: async function(){
			this.isFetching	= true
			this.dasbor		= (await this.$api.$get(`/v1/api/dasborKecamatan`)).data
			if(this.dasbor.belum_kawin===null){
				this.dasbor	= {
						"lahir": 0,
						"mati": 0,
						"keluar": 0,
						"datang": 0,
						"kk": 0,
						"penduduk": 0,
						"islam": 0,
						"kristen": 0,
						"khatolik": 0,
						"hindu": 0,
						"budha": 0,
						"belum_kawin": 0,
						"kawin_tercatat": 0,
						"kawin_belum_tercatat": 0,
						"cerai_mati": 0,
						"dusun": this.dasbor.dusun,
						"desa": this.dasbor.desa,
						"ganda": []
					}
			}
			this.isFetching	= false
		}
	}
}
</script>
