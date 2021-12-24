<template>
    <div class="d-flex justify-center py-8">
        <v-progress-circular v-if="loading" indeterminate color="#4983a6" />
        <v-card v-if="!loading" class="py-8 mt-8 px-16" color="transparent" elevation="8" :loading="true">
            <v-form v-model="valid">
            <template slot="progress">
                <v-progress-linear color="red" indeterminate></v-progress-linear>
            </template>
            <v-alert
                v-if="alertSucces"
                dense
                text
                type="success"
            >
            Event updated successfully!
            </v-alert>
            <v-alert
                v-if="alertFail"
                dense
                text
                type="error"
            >
            Event could not be updated!
            </v-alert>
            <v-card-title class="ml-n4" style="color: #4983a6">
                Edit Event
            </v-card-title>
            <v-text-field v-model="event.eventName" color="#4983a6" label="Event Name" :rules="rules" dense outlined></v-text-field>
            <v-text-field type="date" v-model="event.date" color="#4983a6" label="Event Date" :rules="rules" dense outlined></v-text-field>
            <v-textarea v-model="event.description" dense color="#4983a6" label="Event Desription" :rules="rules" outlined></v-textarea>
            <v-card-actions>
                <v-spacer />
                <v-btn class="white--text" color="orange" :disabled="!valid" @click="editEvent">Edit Event</v-btn>
                <v-progress-circular v-if="loadingEvent" indeterminate color="orange" />
            </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            valid: false,
            loading: true,
            loadingEvent: false,
            alertSucces: false,
            alertFail: false,
            event: {
                eventName: '',
                date: '',
                description: '',
            }
        }
    },
    computed: {
        rules() {
            return [
                (v) => !!v || 'Field cannot be empty!'
            ]
        }
    },
    mounted() {
        this.getEventById()
    },
    methods: {
        async getEventById(){
            this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            this.axios.get(process.env.VUE_APP_API_URL+`/events/${this.$route.params.id}`,{ headers: {SessionGuid: localStorage.session}}).then(response => {
                if(response.data.statusCode === 200){
                    this.loading = false
                    this.event.eventName = response.data.data.eventName
                    this.event.date = response.data.data.eventDate.split('T')[0]
                    this.event.description = response.data.data.eventDescription
                }
            })
        },
        editEvent() {
            this.loadingEvent = true
            const body = {
                eventName: this.event.eventName,
                eventDate: this.event.date,
                eventDescription: this.event.description
            }
            this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            this.axios.put(process.env.VUE_APP_API_URL+`/events/${this.$route.params.id}`, body ,{ headers: {SessionGuid: localStorage.session}}).then(response => {
                if(response.data.statusCode === 200){
                    this.loadingEvent = false
                    this.alertSucces = true
                }else {
                    this.loadingEvent = false
                    this.alertFail = true
                }
            })
        }
    }
}
</script>