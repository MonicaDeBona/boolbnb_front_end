<script>
//importo axios
import axios from 'axios';
//importo lo store
import { store } from '../store';



export default {

    name: 'ContactForm',


    data() {
        return {
            name: '',
            email: '',
            message: '',
            phone_number: '',
            success: false,
            loading: false,
            errors: {},
            apiAddress: 'http://127.0.0.1:8000/api/',
            store,
        }
    },

    props: {

    },

    methods: {
        sendContactForm() {
            this.success = false;
            // invio il form
            this.loading = true;
            //this.clearErrors();

            console.warn(this.name, this.email, this.message, this.phone_number, this.store.apartment.id,);
            const formData = {
                name: this.name,
                email: this.email,
                message: this.message,
                phone_number: this.phone_number,
                apartment_id: this.store.apartment.id,
            };

            axios.post(`${this.apiAddress}messages`, formData).then((response) => {
                this.success = response.data.success;
                // console.warn(this.success);

                //  se è andata bene invia il messaggio
                if (this.success) {
                    this.name = "";
                    this.email = "";
                    this.message = "";
                    this.phone_number = "";

                    // altrimenti mostra gli errori
                } else {
                    this.errors = response.data.errors;
                    console.warn(this.errors);
                }

                this.loading = false;
            })
        },

        clearErrors() {
            this.errors = {};
        }
    },
}
</script>


<template >
    <section class="contact-form w-100">

        <div class="form-input p-3">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="text-center">Contact host</h2>
                <font-awesome-icon style="color: #fe8376; font-size: 1.5rem;" :icon="['fas', 'paper-plane']" />
            </div>

            <!-- Inseire il nome dell host con icona -->
            <!-- <h3>Contatta l'Host: {{ this.store.apartment.user_id }}</h3> -->

            <div class="alert alert-success mb-3" v-if="success">
                <h5>
                    Your message has been sent.
                </h5>
            </div>


            <div class="mb-3 pt-3">
                <label for="contact_name" class="form-label mb-1">
                    Name:*
                </label>

                <input type="text" class="form-control mb-2" id="contact_name" placeholder="Insert your name" v-model="name"
                    @input="clearErrors()">

                <p v-for="error in errors.name" class="is-invalid d-block text-danger ">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']" /> {{ error }}
                </p>
            </div>


            <div class="mb-3">
                <label for="contact_email" class="form-label mb-1">
                    Email:*
                </label>

                <input type="text" class="form-control mb-2" id="contact_email" placeholder="Insert your email"
                    v-model="email" @input="clearErrors()">

                <p v-for="error in errors.email" class="is-invalid d-block text-danger ">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']" /> {{ error }}
                </p>
            </div>

            <div class="mb-3">
                <label for="contact_number" class="form-label mb-1">
                    Phone Number:
                </label>

                <input type="text" class="form-control" id="contact_number mb-2" placeholder="Insert your phone number"
                    v-model="phone_number" @input="clearErrors()">

                <p v-for="error in errors.phone_number" class="is-invalid d-block text-danger ">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']" /> {{ error }}
                </p>
            </div>

            <div class="mb-3">
                <label for="contact_message" class="form-label mb-1">
                    Message:*
                </label>

                <textarea class="form-control mb-2" id="contact_message" rows="3" name="message" v-model="message"
                    @input="clearErrors()" placeholder="Insert your message here..."></textarea>

                <p v-for="error in errors.message" class="is-invalid d-block text-danger py-">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']" /> {{ error }}
                </p>
            </div>


            <div class="mb-3">
                <!-- <button class="btn my_btn" @click.prevent="sendContactForm">
                                                                                                                    Send Message
                                                                                                                </button> -->
                <button class="btn btn-lg my_btn w-100" @click.prevent="sendContactForm">Great,
                    thanks!</button>
            </div>
        </div>

    </section>
</template>

<style lang="scss" scoped>
p {
    font-size: .8rem;
}
</style>