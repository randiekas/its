<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					title="ITS Fisika 1"
					subtitle="4 Latihan Soal">
                    <div>
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
            <v-card 
                hover
                to="/apps/its/1/detail"
                outlined class="mb-3">
                <v-card-title>
                    Latihan Soal 1
                    <v-spacer/>
                    <v-btn text>
                        Minimum Nilai: 80
                    </v-btn>
                    <v-btn text>
                        Soal: 40
                    </v-btn>
                    <v-btn text icon large>
                        <v-icon color="green">
                            mdi-check-decagram
                        </v-icon>
                    </v-btn>
                </v-card-title>
            </v-card>
            <v-card 
                hover
                to="/apps/its/1/mulai"
                outlined class="mb-3">
                <v-card-title>
                    Latihan Soal 2
                    <v-spacer/>
                    <v-btn text>
                        Minimum Nilai: 80
                    </v-btn>
                    <v-btn text>
                        Soal: 40
                    </v-btn>
                    <v-btn text icon large>
                        <v-icon color="green">
                            mdi-check-decagram
                        </v-icon>
                    </v-btn>
                </v-card-title>
            </v-card>
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
