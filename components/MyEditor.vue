<template>
<client-only placeholder="loading...">
    <ckeditor-nuxt :value="value" @input="event => $emit('input', event)" :config="editorConfig" />
</client-only>
</template>
<script>
export default {
    props: ['value'],
    components: {
        'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
    },
    data: function(){
        return {
            editorConfig: {
                placeholder: 'Ketik disini ...',
                removePlugins: ['Title', 'FontSize', 'Heading', 'RemoveFormat', 'FontFamily', 'Highlight', 'PageBreak'],
                simpleUpload: {
                    uploadUrl: 'path_to_image_controller',
                    headers: {
                        'Authorization': 'optional_token'
                    }
                }
            }
        }
    }
}
</script>