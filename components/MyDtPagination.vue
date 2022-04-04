<template>
    <div class="v-data-footer">
        <div class="v-data-footer__select">
            Rows per page: 
            <v-select
                :items="[5,10,15,30,50]"
                v-model="options.itemsPerPage"
                hide-details=""/>
        </div>
        <div class="v-data-footer__pagination">
            {{ pagination.pageStart+1 }}-{{ pagination.pageStop }} of {{ pagination.itemsLength }}
        </div>
        <v-btn 
            :disabled="pagination.pageStart==0"
            @click="options.page-=1"
            icon>
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn 
            :disabled="pagination.pageStop==pagination.itemsLength"
            @click="options.page+=1"
            icon>
            <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
    </div>
</template>
<script>
export default {
    props: [ 'options', 'pagination' ]
}
</script>