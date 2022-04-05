<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					:title="detail.path.nama"
					:subtitle="`${detail.jumlah_latihan} Latihan`">
                    <div>
                        <v-btn
                            exact
                            small
                            class="white"
                            to="/apps/beranda">
                            <v-icon left>
                                mdi-chevron-left
                            </v-icon>
                            Kembali
                        </v-btn>
                    </div>
				</Head>
				<v-row class="mt-2">

				</v-row>
			</v-container>
		</div>
		<v-container class="mt-n16">
            <v-row v-if="isFetching" class="mb-8">
				<v-col sm="12">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
				<v-col sm="12">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
                <v-col sm="12">
					<v-card>
						<v-skeleton-loader
							class="mx-auto"
							type="article, table-heading"/>
					</v-card>
				</v-col>
			</v-row>
            <template
                v-if="detail.id">
                <v-card 
                    v-for="(item, index) in detail.path.latihan"
                    :key="index"
                    hover
                    to="/apps/its/1/detail"
                    outlined class="mb-3">
                    <v-card-title>
                        {{ item.nama }}
                        <v-spacer/>
                        <v-btn text>
                            Minimum benar: {{ item.minimun_benar }}
                        </v-btn>
                        <v-btn text>
                            Soal: {{ item.jumlah_soal }}
                        </v-btn>
                        <v-btn text icon large>
                            <v-icon 
                                v-if="index==0"
                                color="green">
                                mdi-check-decagram
                            </v-icon>
                            <v-icon 
                                v-else> 
                                mdi-lock
                            </v-icon>
                        </v-btn>
                    </v-card-title>
                </v-card>
            </template>
		</v-container>
	</div>
</template>
<script>
export default {
    layout:'apps',
	props: [ 'setConfirmation', 'setSnackbar', 'setFetching', 'access' ],
    asyncData: async function({ route }){

        return {
            id: route.params.id
        }
    },
    data: function(){
        return {
            isFetching:true,
			detail: { path:{nama: '-', jumlah_latihan: '-'}, }
        }
    },
    mounted: function(){
        this.handelLoadData()
    },
    methods: {
        handelLoadData: async function(){
            this.isFetching	= true
			this.detail	    = (await this.$api.$get(`/path/saya/${this.id}`)).data
			this.isFetching	= false
        },
    }
}
</script>
