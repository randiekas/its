<template>
    <div class="grey lighten-4 fill-height mb-16">
		<div class="primary pb-16">
			<v-container>
				<Head
					title="Kelola"
					subtitle="Latihan 1 fisika">
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
            <v-row>
                <v-col md="8">
                    <v-card outlined>
                        <v-card-text>
                            <p>
                                Perkembangan kemampuan siswa untuk menyelesaikan soal secara tak langsung berjalan seiring dengan kemampuan mereka dalam memahami persoalan informatika. Siswa harus dapat memahami informasi yang diberikan, mengidentifikasi karakteristik penting dan hubungannya, membangun representasi yang sesuai untuk solusi, dan akhirnya, mengambil keputusan yang tepat untuk memecahkan soal.
                            </p>
                            <v-text-field
                                label="nilai V1"
                                persistent-placeholder/>
                            <v-text-field
                                label="nilai V2"
                                persistent-placeholder/>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn class="primary">Check Jawaban</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card outlined>
                        <v-card-subtitle>Feedback</v-card-subtitle>
                        <v-divider/>
                        <v-card-text>
                            <p>Ini feedback</p>
                        </v-card-text>
                        <v-divider/>
                        <v-tabs
                            v-model="tab">
                            <v-tab>Hints</v-tab>
                            <v-tab>Chat Bot</v-tab>
                        </v-tabs>
                        <v-card-text>
                            <v-tabs-items v-model="tab">
                                <v-tab-item>
                                    <v-btn block>Lihat Hints</v-btn>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-textarea
                                        placeholder="Tulis disini ..."
                                        persistent-placeholder/>
                                </v-tab-item>
                                <v-tab-item>
                                    Chat Bot
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card-text>
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
