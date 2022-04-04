<template>
	<div class="d-flex" style="height:100vh;">
	<v-col class="mx-auto my-auto" xs="12" md="8" style="justify-content:center">
		<v-card elevation="4">
			<v-row no-gutters>
			<v-col xs="12" md="5" class="primary d-flex" cols="12">
				<div class="mx-auto my-auto text-center">
					<v-icon color="white" size="128">
						mdi-account-group-outline
					</v-icon>
				</div>
			</v-col>
			<v-col xs="12" md="7">
				<v-card-title>Masuk</v-card-title>
				<v-card-subtitle>Intellegence Tutoring System</v-card-subtitle>
				<v-card-text>
					Make the student smarter with new experience learning using <b>ITS</b>
					<br/>
					<br/>
					<br/>
					<br/>
					<p>
					Gunakan akun google anda masuk ke its.
					</p>
					<br/>
					<v-form ref="form">
						<div class="text-right">
							<v-btn 
								v-on:click="handleSubmit"
								color="primary">
								<v-icon left>mdi-google</v-icon>
								Masuk
							</v-btn>
						</div>
					</v-form>
				</v-card-text>
			</v-col>
			</v-row>
		</v-card>
	</v-col>
	</div>
</template>
<script>
export default {
	layout:'blank',
	data () {
		let user = this.$auth.user
		if(user){
			this.$router.push(`/apps/beranda`) 
		}
		return {
			role: ['guru', 'siswa', 'admin'],
			roleDipilih: 'guru',
		}
	},
	methods:{
		handleSubmit:function(){
			this.error = null
			this.$auth.$storage.setUniversal("loginType", this.roleDipilih)
			return this.$auth
				.loginWith('google')
				.catch((err) => {
					// eslint-disable-next-line no-console
					console.error(err)
					this.error = err.response?.data
				})
		}
	}
}
</script>
