<template>
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <form class="login100-form validate-form">
                    <span class="login100-form-title p-b-49">Login</span>
                    <div>
                        <div class="validate-input m-b-23" v-bind:class="{'alert alert-danger': etat}">
                            <label for="">Entrez votre Email</label>
                            <input class="form-control" type="text" placeholder="Email" v-model="user.email" >
                        </div>
                        <div class="validate-input" v-bind:class="{'alert alert-danger': etat}">
                            <label for="">Entrez votre Mot de passe</label>
                            <input class="form-control" type="password" placeholder="Mot de passe" v-model="user.password">
                        </div>
                        <div class="text-right p-t-8 p-b-31">
                            <a href="#">Mots de passe oublié?</a>
                        </div>
                        <div class="container-login100-form-btn">
                            <div class="wrap-login100-form-btn">
                                <div class="login100-form-bgbtn"></div>
                                <button class="login100-form-btn" @click.prevent="verifier">Connecter</button>
                            </div>
                        </div>
                    </div>
                    <div class="txt1 text-center p-t-54 p-b-20">
                        <p>Vous n'avez pas de compte? <router-link to="/inscription">Inscrivez vous ici</router-link> </p>
                        <span>Ou s'inscrire en utlisant</span>
                    </div>
                    <div class="flex-c-m">
                        <a href="#" class="login100-social-item bg2">
                            <i class="fa fa-instagram"></i>
                        </a>
                        <h3>INSTAGRAM</h3>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      etat: null
    }
  },
  methods: {
    verifier () {
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(
        (user) => {
          this.$router.replace('acceuil')
        },
        (err) => {
          alert('error' + err.message)
        }
      )
    }
  }
}
</script>

<style>
.limiter {
  background-image: url("../style/images/bg-01.jpg");
}
</style>
<style src="../style/css/main.css"></style>
<style src="../style/css/util.css"></style>
<style src="../style/fonts/font-awesome-4.7.0/css/font-awesome.min.css"></style>
