<template>
    <div>
        <textarea ref="editor" id="random" :value="value"></textarea>
    </div>
</template>
<script>
// import { CKEditor } from 'ckeditor4-vue';

export default {
    props: ['value'],
    mounted() {
        this.initCKEditor();
    },
    watch: {
        value: function (newValue) {
            const editorInstance = this.$refs.editor.instance;

            if (editorInstance) {
                const currentContent = editorInstance.getData();

                // Update CKEditor only if the new value differs from the current content
                if (newValue !== currentContent) {
                    editorInstance.setData(newValue);
                }
            }

        }
    },
    methods: {
        initCKEditor() {
            const editorElement = this.$refs.editor;

            // console.log(editorElement)
            CKEDITOR.plugins.addExternal('ckeditor_wiris', 'https://www.wiris.net/demo/plugins/ckeditor/', 'plugin.js')
            // // Initialize CKEditor
            this.$refs.editor.instance  = CKEDITOR.replace(editorElement, {
                // Add custom configuration here if needed
                extraPlugins: 'ckeditor_wiris',
                allowedContent: true,
                placeholder: 'Ketik disini ...',
                toolbar: [
                    // { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
                    // { name: 'styles', items: [ 'Format', 'Font', 'FontSize' ] },
                    { name: 'wirisplugins', items: ['ckeditor_wiris_formulaEditor'] },
                    { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting' ] },
                    { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
                    { name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
                    // { name: 'links', items: [ 'Link', 'Unlink' ] },
                    { name: 'paragraph', items: [ 'NumberedList', 'BulletedList' ] },
                    { name: 'insert', items: [ 'Image', 'Table', 'Mathjax' ] },

                    // { name: 'tools', items: [ 'Maximize', 'mathjax' ] },
                    // { name: 'editing', items: [ 'mathjax' ] }
                ],
            });

            this.$refs.editor.instance.on('instanceReady', () => {

                this.$refs.editor.instance.setData(this.value); // Set initial value

                this.$refs.editor.instance.on('change', () => {
                    this.$emit('input', this.$refs.editor.instance.getData());
                });

            });
            // // Sync CKEditor data with v-model
            
        }
    },
    beforeDestroy() {
        // Destroy CKEditor instance
        // if (this.$refs.editor.instance) {
        //     this.$refs.editor.instance.destroy(true);
        //     this.$refs.editor.instance = null; // Clear the reference
        // }
    },
};
</script>