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
        }
    },
}
</script>


<template >
    <section class="contact-form w-100">

        <div class="form-input p-3">

            <h3>Contatta l'Host: {{ this.store.apartment.user_id }}</h3>

            <div class="alert alert-success mb-3" v-if="success">
                <h5>
                    Your message has been sent.
                </h5>
            </div>


            <div class="mb-4 pt-3">
                <label for="contact_name" class="form-label">
                    Name:
                </label>

                <input type="text" class="form-control" id="contact_name" placeholder="Insert your name" v-model="name">
            </div>


            <div class="mb-4">
                <label for="contact_email" class="form-label">
                    Email:
                </label>

                <input type="text" class="form-control" id="contact_email" placeholder="Insert your email" v-model="email">
            </div>

            <div class="mb-4">
                <label for="contact_message" class="form-label">
                    Message:
                </label>

                <textarea class="form-control" id="contact_message" rows="10" name="message" v-model="message"
                    placeholder="Insert your message here..."></textarea>
            </div>


            <div class="mb-4">
                <button class="btn my_btn" @click.prevent="sendContactForm">
                    Send Message
                </button>
            </div>
        </div>

    </section>
</template>

<style lang="scss" scoped></style>