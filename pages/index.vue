<template>
	<div class="d-flex" style="height:100vh;">
	<v-col class="mx-auto my-auto" xs="12" md="8" style="justify-content:center">
		<v-card elevation="4">
			<v-row no-gutters>
			<v-col xs="12" md="5" class="primary d-flex" cols="12">
				<div class="mx-auto my-auto text-center">
					<v-img src="/logo-white.png"  max-width="300"/>
				</div>
			</v-col>
			<v-col xs="12" md="7">
				<v-card-title>BTS</v-card-title>
				<v-card-subtitle>
					Brilliant Tutoring System<br/>
					Make the student smarter with new experience learning.
				</v-card-subtitle>
				<v-card-subtitle></v-card-subtitle>
				<v-card-text>
					<v-alert 
						v-if="failed"
						type="error">
						{{ failed }}
					</v-alert>
					<form @submit.prevent="handelMasuk">
						<v-text-field
							v-model="form.domain"
							label="Domain Scola"
							placeholder="xxxxx"
							persistent-placeholder
							suffix=".scola.id"
							required/>
						<v-text-field
							v-model="form.username"
							label="Username"
							placeholder="xxxxx"
							persistent-placeholder
							required/>
						<v-text-field
							v-model="form.password"
							label="Password"
							placeholder="xxxxx"
							type="password"
							persistent-placeholder
							required/>
						<v-btn 
							:disabled="isFetching"
							rounded
							type="submit"
							block
							color="primary">
							{{ isFetching?"Memproses ...":"Masuk"}}
						</v-btn>
						<v-btn 
							:disabled="isFetching"
							type="button"
							class="mt-2"
							outlined
							rounded
							v-on:click="handelMasukGoogle"
							block>
							<v-icon left>mdi-google</v-icon>
							Masuk dengan Google
						</v-btn>
					</form>
				</v-card-text>
			</v-col>
			</v-row>
		</v-card>
		<p class="text-center mt-4">Versi 2.0.0</p>
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
			isFetching: false,
			form: {
				domain: '',
				username: '',
				password: '',
			},
			failed: "",
			roleDipilih: 'siswa',
		}
	},
	methods:{
		handelMasuk:function(){

			this.isSaving		= true
			this.failed			= ""

			this.$auth
				.loginWith('local', {
					data: this.form
				}).then(async(resp)=>{
					if(resp.data.status){
						this.$auth.$storage.setUniversal("authToken", resp.data.data.token)
						this.$auth.$storage.setUniversal("loginType", resp.data.data.tipe)
						// window.location.href = window.location.origin
						window.location.href	= '/apps/beranda'
					}else{
						
						this.failed	= resp.data.message
					}
					// if(resp.data.status){
						
					// 	await this.$auth.$storage.setUniversal("authToken", resp.data.data.token)
					// 	await this.$auth.$storage.setUniversal("id", resp.data.data.id)
					// 	await this.$auth.$storage.setUniversal("tutor", resp.data.data.tutor)
					// 	window.location.href = window.location.origin
					// 	// alert(resp.data.data.token)
					// 	// await this.$auth.$storage.setUniversal("_token.local", token)
					// }else{
					// 	this.handelAlert('Gagal', resp.data.message)
					// }
				}).catch(e => {
					this.error = e + ''
				})
			// this.$api.$post('/akun/masuk/scola', this.form).then((resp)=>{
			// 	this.isSaving	= false
			// 	if(resp.status){

			// 		this.$auth.$storage.setUniversal("authToken", resp.data.token)
			// 		this.$auth.$storage.setUniversal("loginType", resp.data.tipe)
			// 		window.location.href = window.location.origin
			// 		// window.location.href='/apps/beranda'
			// 	}else{
					
			// 		this.failed	= resp.message
			// 	}
			// })
		},
		handelMasukGoogle:function(){
			
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
