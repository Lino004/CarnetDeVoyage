<template>
   <div>
     <header>
      <div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
<!--Texte descriptif de l'application-->
            <div class="col-sm-8 col-md-5 py-4">
              <h4 class="text-white">Album</h4>
              <p class="text-muted">Votre plateforme de voyage. Parcourez le monde et gardez vos souvenir près de vous à chaque moment</p>
            </div>
<!--Menu de navigation de l'application-->
            <div class="col-sm-2 offset-md-1 py-4">
              <h4 class="text-white"></h4>
              <ul class="list-unstyled">
                <li><a href="#" class="text-white"><i class="fa fa-home"></i>&emsp;Acceuil</a></li>
                <li><a href="#" class="text-white"><i class="fa fa-image"></i>&emsp;Mes Albums</a></li>
                <li><a href="#" class="text-white"><i class="fa fa-gratipay"></i>&emsp;Mes Favoris</a></li>
              </ul>
            </div>
            <div class="col-sm-2 offset-md-1 py-4">
              <h4 class="text-white"></h4>
              <ul class="list-unstyled">
                <li><a href="#" class="text-white"><i class="fa fa-plane"> </i> Mes Destinations</a></li>
                <li><a href="#" class="text-white"><i class="fa fa-user-circle"> </i> Mon compte</a></li>
                <li><a href="#" class="text-white" @click.prevent="deconnecter"><i class="fa fa-sign-out"> </i> Deconnection</a></li>
              </ul>
            </div>
<!--FIN Menu de navigation de l'application-->
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark box-shadow">
        <div class="container d-flex justify-content-between">
<!--Bouton d'ajout d'un evenement-->
          <a href="#" class="navbar-brand d-flex align-items-center" data-toggle="modal" data-target="#myModal">
            <i class="fa fa-plus"></i>&nbsp;
            <span>Add</span>
          </a>
<!--Fenetre popup d'ajout d'un evenement-->
          <div class="modal fade" id="myModal" role="document">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Nouvelle Evenement</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="">
                    <form>
                      <div class="form-group wrap-input100 validate-input m-b-23" data-validate = "Un Pseudo est requis">
                        <label>Titre</label>
                        <input type="text" class="form-control" placeholder="titre" v-model="newEven.titre">
                      </div>
                      <div class="form-group">
                        <label>Lieu</label>
                        <input type="text" class="form-control" placeholder="Lieu" v-model="newEven.lieu">
                      </div>
                      <div class="form-group">
                        <label>Date</label>
                        <input type="date" class="form-control" placeholder="Date" v-model="newEven.date">
                      </div>
                      <div class="form-group">
                        <label>Commentaire</label>
                        <textarea class="form-control" rows="3" v-model="newEven.recit"></textarea>
                      </div>
                      <div class="form-group">
                        <label>Image</label>
                        <input type="file" multiple accept="image/*" @change="detectFiles($event.target.files)">
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-md-offset-10 col-md-1">
                  <button type="button"  data-toggle="modal" data-target="#myModal" class="login100-form-btn" @click.prevent="add">Ajouter</button>
                </div>
            </div>
          </div>
        </div>
<!--Bouton de navigation-->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
<!--...-->
      </div>
    </div>
    </header>
    <main role="main">
<!--Affichage des evenements-->
      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            <div class="row">
            <div :class="clas.container" v-for="event in events" :key="event.id">
              <div :class="clas.container2">
                <div :class="clas.containerImg">
                  <img :class="clas.Img" :style="clas.styleImg" src="../style/images/default.png" alt="Card image cap">
                  <div class="card-img-overlay d-flex align-items-start">
                    <h5 class="w-100 display-10 font-weight-bold p-3 bg-dark text-white">{{ event.titre }}</h5>
                  </div>
                </div>
                <div :class="clas.containerInfo">
                  <div v-show="view">
                    <h2 class="text-info">Commentaire</h2>
                    <p class="card-text"> {{event.recit}} </p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-info" @click.prevent="voir(event)"> {{textBntVoir}} </button>
                      <button type="button" class="btn btn-sm btn-outline-info">Editter</button>
                      <button type="button" class="btn btn-sm btn-outline-info" @click.prevent="supp(event)">Suprimer</button>
                    </div>
                    <small class="text-muted">Le {{event.date}}</small>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
<!--...-->
    </main>
   </div>
</template>

<script>
import firebase from 'firebase'
import {db, storage, auth} from '../firebase'

export default {
  name: 'acceuil',
  data () {
    return {
      userId: null, // Récupère Id de l'utilisateur
      db: null,
      stock: null,
      events: [], // Tableau receptionnant les informations sur les évenements
      newEven: { // Objet récupérent les informations de saisie
        titre: '',
        lieu: '',
        date: null,
        recit: '',
        image: null
      },
      view: false,
      temp: [],
      clas: {
        container: 'col-md-4',
        container2: 'card mb-4 box-shadow shadow-lg border-info',
        containerImg: '',
        Img: 'card-img-top',
        styleImg: '',
        containerInfo: 'card-body bg-light'
      },
      textBntVoir: 'Voir +'
    }
  },
  mounted () {
    this.userId = firebase.auth().currentUser.uid
    this.db = db
    db.ref(this.userId).on('child_added', snapshot => this.events.push({...snapshot.val(), id: snapshot.key}))
    db.ref(this.userId).on('child_removed', snapshot => {
      const eventSupp = this.events.find(even => even.id === snapshot.key)
      const index = this.events.indexOf(eventSupp)
      this.events.slice(index, 1)
    })
    this.temp = this.events
    this.stock = firebase.storage()
  },
  methods: {
    deconnecter () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    add () {
      this.db.ref(this.userId).push().set({
        titre: this.newEven.titre,
        lieu: this.newEven.lieu,
        date: this.newEven.date,
        recit: this.newEven.recit
      })
      this.newEven.titre = ''
      this.newEven.lieu = ''
      this.newEven.date = ''
      this.newEven.recit = ''
    },
    supp (e) {
      this.db.ref(this.userId).child(e.id).remove()
      location.reload()
    },
    voir (e) {
      this.view = !this.view
      if (this.view) {
        this.textBntVoir = 'Voir -'
        this.events = this.events.filter(ev => ev.recit === e.recit)
        this.clas.container = 'row shadow-lg'
        this.clas.container2 = 'row col-md-12'
        this.clas.containerImg = 'col-md-6'
        this.clas.Img = 'mb-4 mt-4'
        this.clas.styleImg = 'width: 35rem'
        this.clas.containerInfo = 'col-md-6 pt-3'
      } else {
        this.textBntVoir = 'Voir +'
        this.events = this.temp
        this.clas.container = 'col-md-4'
        this.clas.container2 = 'card mb-4 box-shadow shadow-lg border-info'
        this.clas.containerImg = ''
        this.clas.Img = 'card-img-top'
        this.clas.styleImg = ''
        this.clas.containerInfo = 'card-body bg-light'
      }
    },
    detectFiles (fileList) {
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x])
      })
    },
    upload (file) {
      this.stock.ref(this.userId + '/' + file.name).put(file)
      this.stock.ref(this.userId).child(file.name).getDownloadURL().then(function (url) {
        this.newEven.image = url
        console.log('image = ' + this.newEven.image)
      })
    }
  }
}
</script>

<style src="../style/fonts/font-awesome-4.7.0/css/font-awesome.min.css"></style>
