<template>
	<div v-if="tipe==='admin'" class="grey lighten-4 fill-height mb-16">
	<v-container>
		<Head
			title="SIKAD DUDUK"
			subtitle="Sinkronisasi Data Penduduk"
			color="text--black"/>		
		<v-row class="mt-2">
			<v-col v-for="(item, index) in apps" :key="index" sm="12" md="3" cols="12">
				<v-card :class="`border--primary ${item.link=='/apps/penduduk'?'primary':''}`" elevation="1" :dark="item.link=='/apps/penduduk'">
					<v-card-title class="pb-0">
						<v-icon left>{{item.ikon}}</v-icon>
						{{item.nama}}
					</v-card-title>
					<v-card-text>
						<div>{{item.deskripsi}}</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn :color="item.link=='/apps/penduduk'?'white':'primary'" text :to="item.link" dark>
							Buka
							<v-icon right dark>mdi-launch</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		
	</v-container>
	</div>
	<div v-else-if="tipe==='desa'" class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
		<v-container>
			<Head
				title="SIKAD DUDUK"
				subtitle="Sinkronisasi Data Penduduk"
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
			<v-row v-else class="mb-8">
				<v-col sm="12" md="3" cols="12">
					<v-card class="border--white blue darken-4" elevation="1" dark>
						<v-card-title class="pb-0">
							<v-icon left></v-icon>
							{{ dasbor.desa }}
						</v-card-title>
						<v-card-text>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Total KK
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.kk }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Total Penduduk
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.penduduk }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Total Dusun
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.dusun }}
								</v-list-item-icon>
							</v-list-item>
							<v-btn 
								small 
								block 
								class="white black--text mt-3"
								to="/apps/laporan">
								Laporan Selengkapnya
								<v-icon right>
									mdi-chevron-right
								</v-icon>
							</v-btn>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col sm="12" md="3" cols="12">
					<v-card class="border--primary" elevation="1">
						<v-card-title class="pb-0">
							<v-icon left></v-icon>
							Berdasarkan Penduduk
						</v-card-title>
						<v-card-text>
								<v-list-item dense>
									<v-list-item-content>
										<v-list-item-title>
											Lahir
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-icon>
										{{ dasbor.lahir }}
									</v-list-item-icon>
								</v-list-item>
								<v-divider/>
								<v-list-item dense>
									<v-list-item-content>
										<v-list-item-title>
											Mati
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-icon>
										{{ dasbor.mati }}
									</v-list-item-icon>
								</v-list-item>
								<v-divider/>
								<v-list-item dense>
									<v-list-item-content>
										<v-list-item-title>
											Keluar
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-icon>
										{{ dasbor.keluar }}
									</v-list-item-icon>
								</v-list-item>
								<v-divider/>
								<v-list-item dense>
									<v-list-item-content>
										<v-list-item-title>
											Datang
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-icon>
										{{ dasbor.datang }}
									</v-list-item-icon>
								</v-list-item>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col sm="12" md="3" cols="12">
					<v-card class="border--primary" elevation="1">
						<v-card-title class="pb-0">
							<v-icon left></v-icon>
							Berdasarkan Agama
						</v-card-title>
						<v-card-text>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										ISLAM
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.islam }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Kristen
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.kristen }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Katholik
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.khatolik }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Hindu
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.hindu }}
								</v-list-item-icon>
							</v-list-item>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col sm="12" md="3" cols="12">
					<v-card class="border--primary" elevation="1">
						<v-card-title class="pb-0">
							<v-icon left></v-icon>
							Berdasarkan Perkawinan
						</v-card-title>
						<v-card-text>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Belum Kawin
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.belum_kawin }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Kawin Tercatat
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.kawin_tercatat }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Kawin Belum Tercatat
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.kawin_belum_tercatat }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Cerai Mati
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.cerai_mati }}
								</v-list-item-icon>
							</v-list-item>
						</v-card-text>
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
				<v-col v-else cols="12" md="6">
					<v-card>
						<v-card-title class="pb-0">
							<v-icon left></v-icon>
							Penduduk ganda
						</v-card-title>
						<v-card-text>
							<v-alert
								v-if="dasbor.ganda.length===0"
								class="mt-2"
								border="left"
								type="success">
								Tidak ada penduduk yang terdaftar di desa lain
							</v-alert>
							<v-alert
								v-else
								class="mt-2"
								border="left"
								type="info">
								Ada {{ dasbor.ganda.length }} penduduk yang terdaftar di desa lain
							</v-alert>
							
							<div
								v-for="(item, index) in dasbor.ganda" :key="index">
								<v-list-item dense :key="index">
									<v-list-item-content>
										<v-list-item-title>
											{{item.nama_lengkap}}
										</v-list-item-title>
										<v-list-item-subtitle>
											{{item.nik}} | {{item.desa}}
										</v-list-item-subtitle>
									</v-list-item-content>
									<v-list-item-icon>
										{{ item.status }}
									</v-list-item-icon>
								</v-list-item>
								<v-divider/>
							</div>
							
						</v-card-text>
					</v-card>
				</v-col>
				<v-col cols="12" md="6">
					<v-row>
						<v-col v-for="(item, index) in apps" :key="index" sm="12" md="6" cols="12">
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
	<div v-else class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
		<v-container>
			<Head
				title="SIKAD DUDUK"
				subtitle="Sinkronisasi Data Penduduk"
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
			<v-row v-else class="mb-8">
				<v-col sm="12" md="3" cols="12">
					<v-card class="border--white blue darken-4" elevation="1" dark>
						<v-card-title class="pb-0">
							<v-icon left></v-icon>
							{{ dasbor.kecamatan }}
						</v-card-title>
						<v-card-text>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Total KK
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.kk }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Total Penduduk
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.penduduk }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Total Desa
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.desa }}
								</v-list-item-icon>
							</v-list-item>
							<v-btn 
								small 
								block 
								class="white black--text mt-3"
								to="/apps/laporan">
								Laporan Selengkapnya
								<v-icon right>
									mdi-chevron-right
								</v-icon>
							</v-btn>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col sm="12" md="3" cols="12">
					<v-card class="border--primary" elevation="1">
						<v-card-title class="pb-0">
							<v-icon left></v-icon>
							Berdasarkan Penduduk
						</v-card-title>
						<v-card-text>
								<v-list-item dense>
									<v-list-item-content>
										<v-list-item-title>
											Lahir
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-icon>
										{{ dasbor.lahir }}
									</v-list-item-icon>
								</v-list-item>
								<v-divider/>
								<v-list-item dense>
									<v-list-item-content>
										<v-list-item-title>
											Mati
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-icon>
										{{ dasbor.mati }}
									</v-list-item-icon>
								</v-list-item>
								<v-divider/>
								<v-list-item dense>
									<v-list-item-content>
										<v-list-item-title>
											Keluar
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-icon>
										{{ dasbor.keluar }}
									</v-list-item-icon>
								</v-list-item>
								<v-divider/>
								<v-list-item dense>
									<v-list-item-content>
										<v-list-item-title>
											Datang
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-icon>
										{{ dasbor.datang }}
									</v-list-item-icon>
								</v-list-item>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col sm="12" md="3" cols="12">
					<v-card class="border--primary" elevation="1">
						<v-card-title class="pb-0">
							<v-icon left></v-icon>
							Berdasarkan Agama
						</v-card-title>
						<v-card-text>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										ISLAM
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.islam }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Kristen
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.kristen }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Katholik
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.khatolik }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Hindu
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.hindu }}
								</v-list-item-icon>
							</v-list-item>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col sm="12" md="3" cols="12">
					<v-card class="border--primary" elevation="1">
						<v-card-title class="pb-0">
							<v-icon left></v-icon>
							Berdasarkan Perkawinan
						</v-card-title>
						<v-card-text>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Belum Kawin
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.belum_kawin }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Kawin Tercatat
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.kawin_tercatat }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Kawin Belum Tercatat
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.kawin_belum_tercatat }}
								</v-list-item-icon>
							</v-list-item>
							<v-divider/>
							<v-list-item dense>
								<v-list-item-content>
									<v-list-item-title>
										Cerai Mati
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									{{ dasbor.cerai_mati }}
								</v-list-item-icon>
							</v-list-item>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
			
		</v-container>
		</div>
		
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
