
<template>
        <div class="pdf">
            <pdf 
                ref="pdf"
                v-for="i in numPages"
                :key="i"
                :src="pdfUrl"
                :page="i">
            </pdf>
        </div>
</template>
<script>

import pdf from 'vue-pdf'
import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'

export default {
    name: 'Pdf',
    components:{
        pdf
    },
    data() {
        return {
            pdfUrl:'',
            numPages:1
        }
    },
	props: ["dochref", "doctype"],
    mounted() {
        this.pdfTask(this.dochref)
    },
	computed:{
		
	},
    methods: {
        pdfTask(pdfUrl){
            var self = this
            // 传参 CMapReaderFactory
            this.pdfUrl = pdf.createLoadingTask({url: pdfUrl, CMapReaderFactory})  
            console.log('pdf',this.pdfUrl)
            this.pdfUrl.promise.then(pdf => {
                self.numPages = pdf.numPages 
            }).catch((err) => {
                console.error('pdf加载失败')
            })
        },
    },
}
</script>