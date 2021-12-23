<template>
    <div class="d-flex justify-center mt-8 py-8">
        <v-progress-circular v-if="loading" indeterminate color="#4983a6" />
        <v-data-table
            v-if="!loading"
            :headers="headers"
            :items="items"
            item-key="name"
            sort-by="calories"
            class="elevation-1 mx-16"
            style="width: 100%"
        >
        <template v-slot:[`item.action`]="{ item }">
            <v-btn class="ml-n2" icon @click="editEvent(item)"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn icon @click="deleteDialog(item)"><v-icon color="red">mdi-delete</v-icon></v-btn>
        </template>
        <template v-slot:[`item.eventDate`]="{ item }">
            {{item.eventDate.split('T')[0]}}
        </template>
        </v-data-table>
        <v-dialog v-model="dialog" persistent width="28%">
            <v-card>
                <v-card-title>
                    Are you sure you want to delete event!
                </v-card-title>
                <v-card-actions class="mt-4">
                    <v-spacer />
                    <v-btn text @click="dialog = false">Cancel</v-btn>
                    <v-btn class="white--text" color="red" @click="deleteEvent">Delete</v-btn>
                    <v-progress-circular v-if="loadingEvent" indeterminate color="red" />
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
            loading: true,
            loadingEvent: false,
            headers: [
                { text: 'Event Name', value: 'eventName' },
                { text: 'Event Date', value: 'eventDate' },
                { text: 'Event Description', value: 'eventDescription' },
                { text: 'Actions', value: 'action' },
            ],
            items: [],
            itemToDelete: {}
        }
    },
    mounted(){
        this.getEvents()
    },
    methods: {
        editEvent(item){
            this.$router.push({name: 'Edit Event', params: {id: item.id}})
        },
        deleteDialog(item){
            this.itemToDelete = item
            this.dialog = true
        },
        deleteEvent(){
            this.loadingEvent = true
            this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            this.axios.delete(`https://localhost:44302/api/events/${this.itemToDelete.id}`,{headers: {SessionGuid: localStorage.session}}).then(response => {
                if(response.data.statusCode === 200){
                    this.loadingEvent = false
                    this.items = response.data.data
                }
                this.dialog = false
            })
        },
        getEvents(){
            this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            this.axios.get('https://localhost:44302/api/events',{headers: {SessionGuid: localStorage.session}}).then(response => {
                if(response.data.statusCode === 200){
                    this.items = response.data.data
                    this.loading = false
                }
            })
        }
    }
}
</script>