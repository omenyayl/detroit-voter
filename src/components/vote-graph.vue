<script>
    import { Bar, mixins} from 'vue-chartjs'
    const { reactiveProp } = mixins;

    export default {
        extends: Bar,
        mixins: [reactiveProp],
        props: {
            chartData: {
                type: Object,
                default: null
            }
        },
        data: () => ({
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 23
                        }
                    }]
                }
            }
        }),

        mounted () {
            this.renderChart(this.chartData, this.options);
        }
    }
</script>

<style scoped>

</style>
