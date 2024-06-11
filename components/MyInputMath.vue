<template>
    <div
        :id="id"
        style="height: 200px;">
    </div>
</template>
<script>
export default {

    props: ['value', 'id'],

    data: function(){

        return {
            editor: '',
            editorValue: '',
        }
    },

    mounted: function(){

        // var $ = document.querySelector.bind(document);

		// var mml = null;
		// var params = {
		// 	language: 'en',
		// 	previewZoom: '1.2',
		// 	fontSize: '36px',
		// 	color: '#333333',
        //     hand: true,
        //     height: '100px'
		// };

        // var $container = $(`#${this.id}`);
		// var editor = com.wiris.js.JsHand.newInstance(params);
		// editor.insertInto($container);

        // editor.addHandListener({

        //     contentChanged:(instance)=>{
                
        //         this.$emit('input', editor.getMathML())
        //     },
            
        // });

        // this.editor = editor

        // this.handelLoadValue()

        var editor      = com.wiris.jsEditor.JsEditor.newInstance({'language': 'en'});
        
        if(this.value){

            editor.setMathML(this.value)
        }

        editor.insertInto(document.getElementById(this.id));

        this.editor     = editor

        setInterval(()=>{
            
            const editorValue   = editor.getMathML()

            if(editorValue != this.editorValue){

                this.editorValue    = editorValue
                this.$emit('input', editorValue)

            }


        }, 1000)
        
        
        // console.log(editor.editorModel)

        // console.log(editor.listeners)

        // var genericIntegrationProperties = {};
        // genericIntegrationProperties.target = document.getElementById(`example_${this.id}`);
        // genericIntegrationProperties.toolbar = document.getElementById(`toolbarLocation_${this.id}`);

        // // GenericIntegration instance.
        // var genericIntegrationInstance = new WirisPlugin.GenericIntegration(genericIntegrationProperties);
        // console.log(WirisPlugin.listeners);
        // genericIntegrationInstance.init();
        // genericIntegrationInstance.listeners.fire('onTargetReady', {});


    },

    watch: {

        value: function(){

            this.handelLoadValue()

        }
    },

    methods: {

        // handelGetEditorValue: function(){

        //     this.editorValue    = this.editor.getMathML()

        // },

        handelLoadValue: function(){

            if(this.value){
                this.editor.setMathML(this.value);
            }else{
                this.editor.setMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"></math>');
            }
            
            
        },

       


    }
}
</script>