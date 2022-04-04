<template>
	<div>
        <v-card>
            <v-app-bar
                color="white"
                elevation="0">
                <v-btn 
                    icon
                    v-on:click="goBack">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>

                <v-toolbar-title>{{crud.title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <slot name="action" :handleOpenFormTambah="handleOpenFormTambah">
                    <v-btn 
                        small 
                        color="primary"
                        v-on:click="handleOpenFormTambah"
                        class="d-none d-sm-flex">
                        <v-icon left>mdi-plus-circle</v-icon>
                        Tambah
                    </v-btn>
                </slot>
            </v-app-bar>
    <!-- untuk table -->
                <div class="d-flex d-sm-none pl-4 pr-4">
                    <slot name="action" :handleOpenFormTambah="handleOpenFormTambah">
                    <v-btn 
                        block
                        small 
                        color="primary"
                        v-on:click="handleOpenFormTambah">
                        <v-icon left>mdi-plus-circle</v-icon>
                        Tambah
                    </v-btn>
                    </slot>
                </div>
            
        
        <slot name="filter" :handleUpdateData="handleUpdateData" :handelSearch="handelSearch"></slot>
        </v-card>
        <v-card class="mt-6">
		<v-data-table
			dense
			:headers="crud.headers.filter((item)=>item.table!=false)"
            :hide-default-header="crud.nested"
			:items="data"
			item-key="name"
			elevation="0"
            :search="kataKunci"
			height="75vh">
            <template
                v-if="crud.nested"
                v-slot:header="{ props: {headers} }">
                <thead>
                <template v-for="item in [processTableHeaders(headers)]">
                    <tr :key="item.value">
                        <th v-for="header in item.parents"
                            :key="header.value"
                            :rowspan="header.rowspan"
                            :colspan="header.colspan"
                            :width="header.width"
                            :class="header.align ? `text-${header.align}` : ''"
                            style="border: thin solid rgba(0, 0, 0, 0.12)">
                            {{ header.text }}
                        </th>
                    </tr>
                    <tr v-if="item.children"
                        :key="item.value">
                        <th v-for="header in item.children"
                            :key="header.value"
                            :width="header.width"
                            :class="header.align ? `text-xs-${header.align}` : ''"
                            style="border: thin solid rgba(0, 0, 0, 0.12)">
                            {{ header.text }}
                        </th>
                    </tr>
                </template>
                </thead>
            </template>
            <template 
                v-if="crud.nested"
                v-slot:body="{items}">
                <tr
                    v-for="(item, index) in items"
                    :key="index">
                    <template
                        v-for="(v, vindex) in crud.headers.filter((item)=>item.table!=false)">
                        <td
                            v-if="!v.children"
                            :key="vindex"
                            :class="`text-start text-${v.align||'center'}`">
                            <span v-if="v.value!='aksi'"> 
                                {{ item[v.value] }}
                            </span>
                            <div v-else>
                                <v-btn small icon v-on:click="handleOpenFormEdit(item)">
                                    <v-icon small>
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                                <v-btn small icon v-on:click="handleKonfirmasiHapus(item)">
                                    <v-icon small>
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </div>
                            </td>
                        <td v-else
                            v-for="c in v.children"
                            :key="c.value"
                            :class="`text-start text-xs text-${c.align||'center'}`">
                            {{ item[c.value] }}
                        </td>
                    </template>
                </tr>
                <!-- <template 
                    v-for="v in crud.headers.filter((item)=>item.table!=false)"
                    v-slot:props="{ props: { items2}}">
                    <td
                        v-if="!v.children"
                        :key="v.value">
                        {{ item }}
                    </td>
                    <td v-else
                        v-for="c in v.children"
                        :key="c.value"
                        :class="`text-xs-${c.align}`">
                        {{ items }}
                    </td>
                </template> -->
            </template>
			<!-- <template v-slot:[`item.status`]="{item}">
				<v-switch v-model="item.status" readonly class="mt-0" style="height:-webkit-fill-available"/>
			</template> -->
			<template v-slot:[`item.aksi`]="{item}">
                <div>
                    <slot 
                        name="aksi" 
                        :handleOpenFormEdit="handleOpenFormEdit" 
                        :handleKonfirmasiHapus="handleKonfirmasiHapus"
                        :item="item">
                        <v-btn small icon v-on:click="handleOpenFormEdit(item)">
                            <v-icon small>
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                        <v-btn small icon v-on:click="handleKonfirmasiHapus(item)">
                            <v-icon small>
                                mdi-delete
                            </v-icon>
                        </v-btn>
                    </slot>
                </div>
			</template>
			<template v-slot:[`item.lampiran`]="{item}">
				<v-btn v-if="item.lampiran!=null && item.lampiran!=''" small :href="`https://sikadduduk-morowali.asschem.id/${item.lampiran}`" target="_blank">
					<v-icon small left>
						mdi-launch
					</v-icon>
                    Buka
				</v-btn>
                <div v-else>
                    -
                </div>
				
			</template>
		</v-data-table>
        
        </v-card>
        <!-- untuk popup form dan edit -->
        <v-dialog
            v-model="dialogForm"
            max-width="500px"
        >
            <v-card>
                <!-- untuk judul dipopup -->
                <v-card-title>
                    <span class="headline">{{ dialogTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container v-if="crud.nested===undefined">
                        <Form
                            :fields="crud.headers"
                            :model="model"
                            :isFetching="isFetching"
                            :dialog="dialog"/>
                    </v-container>
                    <v-container v-else>
                        <Form
                            :fields="crud.headers.filter((item)=>item.children===undefined)"
                            :model="model"
                            :isFetching="isFetching"
                            :dialog="dialog"/>
                        <div
                            v-for="(item, index) in crud.headers.filter((item)=>item.children!=undefined)"
                            :key="index">
                            <p class="subtitle-3 mb-0">{{item.text}}</p>
                            <Form
                                class="ml-6 mb-6"
                                :fields="item.children"
                                :model="model"/>
                        </div>
                    </v-container>
                </v-card-text>
                
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    v-on:click="dialogForm=false">
                    Batal
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    v-on:click="handleSimpan">
                    Simpan
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- untuk popup konfirmasi delete -->
		<v-dialog v-model="dialogDelete" max-width="500px">
			<v-card>
				<v-card-title class="headline">Apakah anda yakin ingin menghapus data ini ?</v-card-title>
				<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="dialogDelete=false">Batal</v-btn>
				
				<v-btn color="blue darken-1" text @click="handleHapus">OK</v-btn>
				<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
		</v-dialog>
		
	</div>
</template>
<script>
export default {
    props: ["crud"],
	data(){
        return {
            isFetching: false,
            dialog: {},
            model: {},
            isFetching:false,
            dipilih: [],
            dialogForm: false,
            dialogDelete: false,
            dialogTitle: '',
            data: [],
            kataKunci: '',
        }
    },
    mounted(){ 
        this.handleUpdateData()
    },
	methods:{
        goBack(){
            history.back()
        },
		handleKonfirmasiHapus(item){
			// console.log(this)
            this.model        = Object.assign({}, item)
			this.dialogDelete	= true
		},
		handleHapus(){
            this.isFetching     = true
            this.$api.$get(`${this.crud.apiHapus}/${this.model.id}`).then((resp)=>{
                this.isFetching     = false
                this.dialog     = {
                    message: resp.message,
                    status: resp.status
                }
                if(resp.status){
                    this.dialogDelete	= false
                    this.handleUpdateData()
                    // this.$nuxt.refresh()
				}
                
            })
            
			this.dialogDelete	= false
		},
        handleOpenFormTambah(){
            this.dialogTitle    = "Tambah"
            this.model			= {}
            this.crud.headers.map((item)=>{
                if(item.default){
                    this.model[item.value]  = item.default
                }
            })

            this.dialogForm     = true
        },
        handleOpenFormEdit(item){
            this.dialogTitle    = "Edit"
            this.dialogForm     = true
            this.model          = Object.assign({}, item)
        },
        handleUpdateData: async function (){
            let data = (await this.$api.$get(this.crud.apiData)).data
            this.data   = data
        },
        handleSimpan: function(){
			this.isFetching = true
            let payload     = {}
            
            this.crud.headers.filter((item)=>item.form!=false).map((item)=>{
                if(item.children===undefined){
                    payload[item.value]     = this.model[item.value]!=undefined?this.model[item.value]:''
                }else{
                    item.children.map((row)=>{
                        payload[row.value] = this.model[row.value]!=undefined?this.model[row.value]:''
                    })
                }
            })
            const api = this.model.id?`${this.crud.apiUbah}/${this.model.id}`:this.crud.apiTambah
			this.$api.$post(api, payload).then(async (resp)=>{
                this.isFetching = false
                this.dialog     = {
                    message: resp.message,
                    status: resp.status
                }
				if(resp.status){
                    this.dialogForm     = false
                    this.handleUpdateData()
                    // this.$nuxt.refresh()
				}
			})
		},
        processTableHeaders(headers) {
            
            const nested = !!headers.some(h => h.children)
            if (nested) {
                let children = []

                const h = headers.map(h => {
                    if (h.children && h.children.length > 0) {
                        children.push(...h.children)

                        return {
                            rowspan: 1,
                            colspan: h.children.length,
                            text: h.text,
                            align: h.align
                        }
                    }
                    return {
                        rowspan: 2,
                        colspan: 1,
                        text: h.text,
                        align: h.align
                    }
                })

                return {
                    children: children,
                    parents: h
                }
            }
            return {
                parents: headers
            }
        },
        handelSearch(ini){
            this.kataKunci  = ini.target.value
        }
	}
}
</script>
