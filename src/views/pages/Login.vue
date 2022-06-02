<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Login</h4>
                  <p>Entre para acessar o sistema.</p>
                </div>

                <div>
                  <vs-input
                      name="email"
                      icon-no-border
                      icon="icon icon-user"
                      icon-pack="feather"
                      label-placeholder="E-mail"
                      v-model="email"
                      class="w-full"/>

                  <vs-input
                      type="password"
                      name="password"
                      icon-no-border
                      icon="icon icon-lock"
                      icon-pack="feather"
                      label-placeholder="Senha"
                      v-model="password"
                      class="w-full mt-6" />

                  <div class="flex flex-wrap justify-between my-5">
                      <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Lembrar-me</vs-checkbox>
                      <router-link to="">Esqueceu sua senha?</router-link>
                  </div>
                  <vs-button @click="login" class="float-right">Login</vs-button>

                  <br>

                  <div class="social-login-buttons flex flex-wrap items-center mt-4">

                    
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>

import * as firebase from 'firebase'
import { userDefaults } from "../../store/state";
import { db_firebase } from "../../firebase/firebaseConfig";
export default{
  data() {
    return {
      email: "",
      password: "",
      checkbox_remember_me: false,
    }
  },
  methods: {
    login: function(){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) =>{
          var docRef = db_firebase
              .collection("users")
              .doc(firebase.auth().currentUser.uid);
            docRef
              .get()
              .then(doc => {
                const userData = {
                  uid: doc.id,
                  displayName: doc.data().name,
                  about:
                    doc.data().about,
                  photoURL: doc.data().image,
                  status: "online",
                  userRole: "admin",
                  cargo: doc.data().position
                };
                this.$store.state.AppActiveUser = JSON.parse(
                  JSON.stringify(userData)
                );
                this.$session.start();
                this.$session.set(
                  "uid",
                  firebase.auth().currentUser.uid
                );
                console.log(this.$session.get("uid"));
                this.$router.replace("../home");
              })
              .catch(function(error) {
                console.log("Error getting document:", error);
              });
        },
        (err) => {
          alert(err)
        }
      )
    }
  },
  created(){
    this.$session.start()
    if(this.$session.get("uid") != null){
      this.$router.replace('../home')
    }
  }
}
</script>

<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook { background-color: #1551b1 }
    .bg-twitter { background-color: #00aaff }
    .bg-google { background-color: #4285F4 }
    .bg-github { background-color: #333 }
  }
}
</style>
