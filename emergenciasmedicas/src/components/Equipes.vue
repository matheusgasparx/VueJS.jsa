<template>
    <div>
        <div class="row">
            <div class="col">
                <h5><i class="bi-clipboard-check me-2"></i>Equipes montadas</h5>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <ListaEquipes />
            </div>
        </div>
    </div>
</template>

<script>
import ListaEquipes from '@/components/ListaEquipes'

export default {
    name: 'Equipes',
    components: {
        ListaEquipes
    },
    // computed: {
    //     totalEnfermeiros() {        **** está la no store
    //         return this.$store.state.enfermeiros.length
    //     }
    // }
}
</script>