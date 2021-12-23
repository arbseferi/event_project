<template>
    <div class="d-flex justify-center py-8">
        <v-card class="py-8 mt-8 px-16" color="transparent" elevation="8">
            <v-form v-model="validAdd">
            <v-alert
                v-if="alertSucces"
                dense
                text
                type="success"
            >
            Event added successfully!
            </v-alert>
            <v-alert
                v-if="alertFail"
                dense
                text
                type="error"
            >
            Event could not be add!
            </v-alert>
            <v-card-title class="ml-n4" style="color: #4983a6">
                Add New Event
            </v-card-title>
            <v-text-field v-model="eventName" color="#4983a6" label="Event Name" :rules="rules" dense outlined></v-text-field>
            <v-text-field type="date" v-model="date" color="#4983a6" label="Event Date" :rules="rules" dense outlined></v-text-field>
            <v-textarea v-model="description" color="#4983a6" dense label="Event Desription" :rules="rules" outlined></v-textarea>
            <v-card-actions>
                <v-spacer />
                <v-btn class="white--text" color="blue" :disabled="!validAdd" @click="addEvent">Add Event</v-btn>
            </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            eventName: '',
            date: '',
            description: '',
            alertSucces: false,
            alertFail: false,
            validAdd: false,
        }
    },
    computed: {
        rules() {
            return [
                (v) => !!v || 'Field cannot be empty!'
            ]
        }
    },
    methods: {
        addEvent() {
            const body = {
                eventName: this.eventName,
                eventDate: this.date,
                eventDescription: this.description
            }
            this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            this.axios.post('https://localhost:44302/api/events',body ,{headers: {SessionGuid: localStorage.session}}).then(response => {
                if(response.data.statusCode === 200){
                    this.alertSucces = true
                }else {
                    this.alertFail = true
                }
            })
        }
    }
}
</script>