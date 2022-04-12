<template>
	<div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
		<v-container>
			<Head
				title="ITS"
				subtitle="Latihan Soal Berbasis Intellegence Tutoring System"
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
			<v-card class="mb-8">
				<v-card-text>
					<v-row>
						<v-text-field
							v-model="kodeITS"
							v-on:keyup.enter="handelCekKodeITS"
							class="mt-0"
							hide-details=""
							solo
							persistent-placeholder
							placeholder="Kode ITS"
							dense/>
						<v-btn 
							@click="handelCekKodeITS"
							class="primary">
							Gabung
						</v-btn>
					</v-row>
				</v-card-text>
			</v-card>
			<p class="white--text text-overline d-flex">
				ITS yang kamu ikuti
				<v-spacer/>
				<v-btn text small class="white--text">
					Lihat Semua
				</v-btn>
			</p>
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
			<v-row v-else class="mb-8">
				<v-col
					v-if="data.length==0">
					<v-alert type="info">Anda belum memiliki ITS</v-alert>
				</v-col>
				<template
					v-else>
					<v-col 
						v-for="(item, index) in data"
						:key="index"
						md="3">
						<v-card
							hover
							@click="handelKlikDetailITS(item.id)">
							<v-card-title>{{ item.path.nama }}</v-card-title>
							<v-card-subtitle>{{ item.path.jumlah_peserta}} Peserta</v-card-subtitle>
							<v-card-subtitle>{{ item.path.jumlah_latihan}} Latihan Soal</v-card-subtitle>
						</v-card>
					</v-col>
				</template>
			</v-row>
			<p class="white--text text-overline">Buat Latihan Soal Berbasis ITS mu sendiri</p>
		</v-container>
		</div>
		<v-container class="mt-n16">
			<v-row class="mt-2 mt-n8">
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
	props: ['apps', 'tipe', 'handelKeluar', 'aesEncrypt', 'aesDecrypt', 'setFetching', 'setSnackbar'],
	data: function(){
		return {
			isFetching:true,
			data: [],
			kodeITS: ''
		}
	},
	mounted: function(){
		this.handelLoadData()
	},
	methods:{
		handelLoadData: async function(){
			this.isFetching	= true
			this.data		= (await this.$api.$get(`/path/saya?page=0&size=4`)).data.content
			this.isFetching	= false
		},
		handelCekKodeITS: function(){
			this.setFetching(true)
			const payload	= {
				path_id: eval(this.aesDecrypt(this.kodeITS))
			}
			this.$api.$post(`path/saya`, payload).then((resp)=>{
                this.popup = false
                this.setFetching(false)
                this.setSnackbar("Latihan path berhasil ditambahkan, silahkan import latihan soal")
                this.$router.push(`/apps/its/${payload.path_id}`)
            })
			
		},
		handelKlikDetailITS: function(id){
			this.$router.push(`/apps/its/${id}`)
		}
	}
}
</script>
