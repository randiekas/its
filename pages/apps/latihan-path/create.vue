<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					title="Buat"
					subtitle="Buat Latihan Soal Berbasis ITS">
                    <div>
                        <v-btn
                            exact
                            small
                            class="white">
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            Tambah Latihan Soal
                        </v-btn>
                        <v-btn
                            exact
                            small
                            class="white"
                            to="/apps/latihan">
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
            <v-row>
                <v-col md="3">
                    <v-card>
                        <v-card-text 
                            class="mb-3">
                            <v-text-field
                                label="Nama Latihan Path"
                                hide-details=""
                                persistent-placeholder/>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col md="9">
                    <v-card outlined class="mb-3">
                        <v-card-title>
                            Latihan Soal 1
                            <v-spacer/>
                            <v-btn outlined>
                                <v-icon>
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-subtitle>
                            <v-text-field
                                label="Minimum Nilai"
                                persistent-placeholder
                                hide-details=""
                                value="10"
                                type="number"/>
                        </v-card-subtitle>
                    </v-card>
                    <v-card outlined>
                        <v-card-title>
                            Latihan Soal 2
                            <v-spacer/>
                            <v-btn outlined>
                                <v-icon>
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-subtitle>
                            <v-text-field
                                label="Minimum Nilai"
                                persistent-placeholder
                                hide-details=""
                                value="10"
                                type="number"/>
                        </v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
		</v-container>
	</div>
</template>
<script>
export default {
    layout:'apps',
	props: [ 'setConfirmation', 'setSnackbar', 'setFetching', 'access' ],
    data: function(){
        return {
            tab: 0,
        }
    },
    mounted: function(){
        this.handelLoadData()
    },
    methods: {
        handelLoadData: async function(){

        },
        handelClickDetail: function( item ){
            
        },

    }
}
</script>
