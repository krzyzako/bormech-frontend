<template>
   <div>
    <client-only>
     <vue-html2pdf
        :show-layout="false"
        :float-layout="false"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="true"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
 
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="pdf"
    >
        <section slot="pdf-content">
 
    <section class="pdf-item">
        <h4>
            Title
        </h4>
 
        <span>
            Value
        </span>
    </section>
 
    <!--
        After this element below, the page will break and any elements after
        <div class="html2pdf__page-break"/> will go to the next page.
    -->
    <div class="html2pdf__page-break"/>
 
    <section class="pdf-item">
        <h4>
            Title
        </h4>
 
        <span>
            Value
        </span>
    </section>
</section>
    </vue-html2pdf>
    </client-only>
   </div>
</template>


<script>
    export default {
    methods: {
        print() {
            this.$refs.pdf.generatePdf();
        }
    },
    mounted () {
        this.print()
    },        
    }
</script>

<style lang="sass" scoped>

</style>