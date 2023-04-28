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
						Batal
					</v-btn>
					<v-btn
						outlined
						@click="confirmation.handelOk(); confirmation.status=false">
						Lanjutkan
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
				Tutup
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
                :handelKeluar="handelKeluar"
				:setConfirmation="setConfirmation"
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
				'guru': [
					{
						"ikon": "mdi-pencil-box-multiple-outline",
						"nama":"Latihan Sub Topik",
						"deskripsi":"Kelola Data Latihan",
						"link":"/apps/latihan"
					},
					{
						"ikon": "mdi-timeline-check-outline",
						"nama":"Latihan Topik",
						"deskripsi":"Kelola latihan path, agar setiap urutan latihan bisa disesuaikan dengan nilai",
						"link":"/apps/latihan-path"
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
			this.setConfirmation({
                    status: true,
                    title: 'Konfirmasi',
                    message: 'Apakah anda ingin melanjutkan untuk keluar?',
                    handelOk: async ()=> {
						await this.$auth.logout()
						window.location.href	= window.location.origin
					}
                })
            
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
pre {
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;
    clear: both;
    color: #fff;
    background: #1b1b1b;
    padding: 0;
    -moz-tab-size: 2;
    -o-tab-size: 2;
    tab-size: 2;
    -ms-word-break: normal;
    word-break: normal;
    -webkit-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    position: relative;
    line-height: 28px;
    border-radius: 8px;
    overflow: hidden;
}
pre code {
	color: #f5d67b;
	scrollbar-color: #666 #201c29;
	background: none;
	white-space: pre;
	-webkit-overflow-scrolling: touch;
	overflow-x: scroll;
	display: block;
	max-width: 100%;
	min-width: 100px;
	font-size: 16px;
	padding: 15px 20px 12px 22px;
	line-height: 1.75;
	font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;
}
</style>
