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
                removePlugins: ['Title', 'FontSizeToolbar', 'HeadingToolbar', 'RemoveFormatToolbar', 'FontFamilyToolbar', 'HighlightToolbar', 'PageBreakToolbar', 'MediaEmbedToolbar'],
                simpleUpload: {
                    uploadUrl: 'https://rosetta-worker.biibo.id/uploader/files',
                    headers: {
                        'Authorization': ''
                    }
                }
            }
        }
    }
}
</script>