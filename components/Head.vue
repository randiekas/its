<template>
    <div :class="`mt-6 text-h6 d-flex justify-space-between ${color||`white--text`}`">
        <div>
            <p class="text-h4 mb-0">{{ title }}</p>
            <p class="subtitle-2">{{ subtitle }}</p>
        </div>
        <div v-if="add">
            <v-btn 
                small 
                color="error" 
                v-if="handleDelete" 
                v-on:click="handleDelete">
                <v-icon left>mdi-delete</v-icon>
                Hapus
            </v-btn>
            <v-btn :to="add" small class="d-xs-none">
                <v-icon left>mdi-plus-circle</v-icon>
                Tambah
            </v-btn>
        </div>
        <ButtonBack v-if="back!=undefined"/>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: ['title', 'subtitle', 'add', 'back', 'handleDelete', 'color']
}
</script>