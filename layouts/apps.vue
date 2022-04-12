<template>
	<v-app>
        <v-dialog
			v-model="isFetching"
			persistent
			width="300">
			<v-card
				color="primary"
				dark>
				<v-card-text>
				Sedang diproses ...
				<v-progress-linear
					indeterminate
					color="white"
					class="mb-0"
				></v-progress-linear>
				</v-card-text>
			</v-card>
		</v-dialog>
		<v-dialog
			v-model="confirmation.status"
			persistent
			width="450">
			<v-card
				color="primary"
				dark>
				<v-card-title>{{ confirmation.title }}</v-card-title>
				<v-card-text>
					{{ confirmation.message }}
				</v-card-text>
				<v-card-actions>
					<v-spacer/>
					<v-btn
						text
						@click="confirmation.status=false">
						Cancel
					</v-btn>
					<v-btn
						outlined
						@click="confirmation.handelOk(); confirmation.status=false">
						Continue
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-snackbar
			top
			right
			v-if="snackbar!==false"
			v-model="snackbar.status"
			timeout="2000">
			{{ snackbar.message }}
			<template v-slot:action="{ attrs }">
				<v-btn
				color="red"
				text
				v-bind="attrs"
				@click="snackbar = false">
				Close
				</v-btn>
			</template>

		</v-snackbar>
		<v-navigation-drawer
			permanent
			expand-on-hover
			app>
			<v-list>
				<v-list-item class="px-2">
					<v-list-item-avatar>
					<v-img :src="user.picture"></v-img>
					</v-list-item-avatar>
				</v-list-item>

				<v-list-item link>
					<v-list-item-content>
					<v-list-item-title class="title">
						{{ user.name }}
					</v-list-item-title>
					<v-list-item-subtitle>{{ tipe }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list>
				<v-list-item
					color="primary"
					to="/apps/beranda">
					<v-list-item-action>
						<v-icon>mdi-apps</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="'Beranda'" />
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					v-for="(item, i) in apps[tipe]"
					:key="i"
					:to="item.link"
					color="primary">
					<v-list-item-action>
						<v-icon>{{ item.ikon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.nama" />
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					color="primary"
					v-on:click="handelKeluar">
					<v-list-item-action>
						<v-icon>mdi-logout</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="'Keluar'" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>

			<nuxt-child
                :apps="apps[tipe]"
				:tipe="tipe"
				:setConfirmation="setConfirmation"
                :handelKeluar="handelKeluar"
                :setFetching="setFetching"
				:setSnackbar="setSnackbar"
				:aesEncrypt="aesEncrypt"
				:aesDecrypt="aesDecrypt"/>

		</v-main>
	</v-app>
</template>

<script>
import crypto from 'crypto'
export default {
	data () {
		let user = this.$auth.user
		let tipe = this.$auth.$storage.getUniversal("loginType")
		if(!user){
			this.$router.push(`/`)
		}
		return {
			user,
			tipe,
            isFetching: false,
			snackbar: {
                status: false,
                message: ''
            },
			confirmation: {
                status: false,
                title: '',
                message: '',
                handelOk: ()=>{},
            },
			apps:{
				'umum': [
					{
						"ikon": "mdi-pencil-box-multiple-outline",
						"nama":"Latihan",
						"deskripsi":"Kelola Data Latihan",
						"link":"/apps/latihan"
					},
					{
						"ikon": "mdi-timeline-check-outline",
						"nama":"Latihan Path",
						"deskripsi":"Kelola latihan path, agar setiap urutan latihan bisa disesuaikan dengan nilai",
						"link":"/apps/latihan-path"
					},
					// {
					// 	"ikon": "mdi-map-marker-radius-outline",
					// 	"nama":"Kecamatan",
					// 	"deskripsi":"Kelola data master Kecamatan",
					// 	"link":"/apps/kecamatan"
					// },
					// {
					// 	"ikon": "mdi-home-city",
					// 	"nama":"Desa",
					// 	"deskripsi":"Kelola data master Desa/Kelurahan",
					// 	"link":"/apps/desa"
					// },
                    // {
					// 	"ikon": "mdi-home-group",
					// 	"nama":"Dusun",
					// 	"deskripsi":"Kelola data master Dusun",
					// 	"link":"/apps/dusun"
					// },
					// {
					// 	"ikon": "mdi-account-group-outline",
					// 	"nama":"Penduduk",
					// 	"deskripsi":"Kelola data penduduk",
					// 	"link":"/apps/penduduk"
					// },
					// {
					// 	"ikon": "mdi-account-box-multiple-outline",
					// 	"nama":"K. Keluarga",
					// 	"deskripsi":"Kelola data kartu keluarga",
					// 	"link":"/apps/kk"
					// },
                    // {
					// 	"ikon": "mdi-file-chart",
					// 	"nama":"Laporan",
					// 	"deskripsi":"Informasi laporan",
					// 	"link":"/apps/laporan"
					// },
				],
				'desa': [
                    {
						"ikon": "mdi-home-group",
						"nama":"Dusun",
						"deskripsi":"Kelola data master Dusun",
						"link":"/apps/dusun"
					},
					{
						"ikon": "mdi-account-group-outline",
						"nama":"Penduduk",
						"deskripsi":"Kelola data penduduk",
						"link":"/apps/penduduk"
					},
					{
						"ikon": "mdi-account-box-multiple-outline",
						"nama":"K. Keluarga",
						"deskripsi":"Kelola data kartu keluarga",
						"link":"/apps/kk"
					},
                    {
						"ikon": "mdi-file-chart",
						"nama":"Laporan",
						"deskripsi":"Informasi laporan",
						"link":"/apps/laporan"
					},
					{
						"ikon": "mdi-home-city",
						"nama":"Desa",
						"deskripsi":"Kelola data master Desa/Kelurahan",
						"link":"/apps/desa"
					},
				],
				'kecamatan': [
                    {
						"ikon": "mdi-file-chart",
						"nama":"Laporan",
						"deskripsi":"Informasi laporan",
						"link":"/apps/laporan"
					},
				],
			},
		}
	},
	methods:{
		aesEncrypt: (plainText)=>{
            const encrptKey = "u1ng@u1ngjklmnop";
            plainText       = Buffer.from(plainText);
            let cipher      = crypto.createCipheriv("AES-128-ECB", encrptKey, "");
            let encrypted   = cipher.update(plainText, "", "");
            return Buffer.concat([encrypted, cipher.final()]).toString("base64");
        },
		aesDecrypt: (encryptText)=>{
			const encrptKey = "u1ng@u1ngjklmnop";
            encryptText     = Buffer.from(encryptText, "base64");
            let cipher      = crypto.createDecipheriv("AES-128-ECB", encrptKey, "");
            let decrypted   = cipher.update(encryptText);
            return Buffer.concat([decrypted, cipher.final()]).toString("utf-8");
        },
		handelKeluar: async function(){
            await this.$auth.logout()
        },
		setFetching: function (status){this.isFetching=status},
		setSnackbar: function (message){this.snackbar={status: true, message}},
		setConfirmation: function (item){this.confirmation=item},
	}
}
</script>
<style>
.border--primary{
	border: 1px solid #4268F6!important
}
.border--white{
	border: 1px solid white!important
}
</style>
