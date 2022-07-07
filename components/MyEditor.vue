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
                        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGhlbnRpY2F0aW9uLnNjb2xhLmlkIiwiYXVkIjoiaHR0cHM6Ly9yb3NldHRhLXdvcmtlci5iaWliby5pZC8iLCJqdGkiOiI0ZjFnMjNhMTJhYSIsImlhdCI6MTY1NzE2ODMzNS43MTM1OSwiaWQiOjYwLCJlbWFpbCI6InJhbmRpZWthc0BnbWFpbC5jb20iLCJ0aXBlIjoiYmlhc2EiLCJzdWJfaWQiOiIxMTU1MDM5MDc0NDYyNzM0ODUwMTUiLCJuYW1hIjoiUmFuZGkgRWthIFNldGlhd2FuIiwiZm90byI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpNHhhcXhNS053VlBuWm9EMTZFQk9KWlhGLTZWTVpTVW4zUEY4Rk5nPXM5Ni1jIn0.GMV7G3XOE6hVHc5MtgJ8X0ntRys4ZwXJrLA-YZByp7E'
                    }
                }
            }
        }
    }
}
</script>