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
                                label="Nama Latihan"
                                hide-details=""
                                persistent-placeholder/>
                        </v-card-text>
                    </v-card>
                    <v-card outlined>
                        <v-card-title>Nomor Soal</v-card-title>
                        <v-divider/>
                        <v-card-text>
                            <v-btn rounded small class="mb-1 primary">1</v-btn>
                            <v-btn rounded small class="mb-1">2</v-btn>
                            <v-btn rounded small class="mb-1">3</v-btn>
                            <v-btn rounded small class="mb-1">4</v-btn>
                            <v-btn rounded small class="mb-1">5</v-btn>
                        </v-card-text>
                        <v-btn block class="secondary">
                            Tambah Soal
                        </v-btn>
                    </v-card>
                </v-col>
                <v-col md="9">
                    <v-card outlined>
                        <v-tabs
                            v-model="tab">
                            <v-tab>Soal</v-tab>
                            <v-tab>Hint</v-tab>
                            <v-tab>Feedback</v-tab>
                            <v-tab>Chat Bot</v-tab>
                        </v-tabs>
                        <v-divider/>
                        <v-card-text>
                            <v-tabs-items v-model="tab">
                                <v-tab-item>
                                    <v-text-field
                                        persistent-placeholder
                                        type="number"
                                        label="Maksimal Percobaan Menjawab"/>
                                    <v-textarea
                                        persistent-placeholder
                                        label="Soal"/>
                                    <p class="mb-0">Opsi Jawaban</p>
                                    <v-row>
                                        <v-col>
                                            <v-text-field 
                                                label="Opsi 1"
                                                persistent-placeholder
                                                hide-details=""/>
                                        </v-col>
                                        <v-col>
                                            <v-text-field 
                                                label="Jawaban 1"
                                                persistent-placeholder
                                                hide-details=""/>
                                        </v-col>
                                    </v-row>
                                    <div class="text-right mt-4">
                                        <v-btn small class="primary">
                                            Tambah Opsi
                                        </v-btn>
                                    </div>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-textarea
                                        placeholder="Tulis disini ..."
                                        persistent-placeholder/>
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
