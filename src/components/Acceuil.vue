<template>
   <div>
     <header>
      <div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">Album</h4>
              <p class="text-muted">Votre plateforme de voyage</p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white"></h4>
              <ul class="list-unstyled">
                <li><a href="#" class="text-white">Follow on Twitter</a></li>
                <li><a href="#" class="text-white">Like on Facebook</a></li>
                <li><a href="#" class="text-white" @click.prevent="deconnecter">Deconnection</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark box-shadow">
        <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center" data-toggle="modal" data-target="#myModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            <span>Add</span>
          </a>
          <div class="modal fade" id="myModal" role="document">
            <div class="modal-dialog">
<!--POPup content-->
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Nouvelle Image</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="">
                    <form>
                      <div class="form-group wrap-input100 validate-input m-b-23" data-validate = "Un Pseudo est requis">
                        <label>Titre</label>
                        <input type="text" class="form-control" placeholder="titre" v-model="newParcours.titre">
                      </div>
                      <div class="form-group">
                        <label>Lieu</label>
                        <input type="text" class="form-control" placeholder="Lieu" v-model="newParcours.lieu">
                      </div>
                      <div class="form-group">
                        <label>Date</label>
                        <input type="date" class="form-control" placeholder="Date" v-model="newParcours.date">
                      </div>
                      <div class="form-group">
                        <label>Commentaire</label>
                        <textarea class="form-control" rows="3" v-model="newParcours.recit"></textarea>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="">
                  <div class="col-md-offset-10 col-md-1">
                    <button type="button" class="login100-form-btn" @click.prevent="add">Ajouter</button>
                  </div>
                  <div class="col-md-offset-1 col-md-2">
                    <input type="file" name="Parcourir">
                  </div>
                </div>
            </div>
          </div>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
      </div>
    </div>
    </header>
    <main role="main">
      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src="../style/images/default.png" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted"> 9 mins </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            <div class="col-md-4" v-for="event in events" :key="event.id">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src="../style/images/default.png" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text"> {{ event.recit }} </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">Le {{event.date}}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
   </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'acceuil',
  data () {
    return {
      userId: null,
      db: null,
      newParcours: {
        titre: '',
        lieu: '',
        date: null,
        recit: ''
      },
      events: []
    }
  },
  mounted () {
    this.userId = firebase.auth().currentUser.uid
    this.db = firebase.database()
    this.db.ref(this.userId).on('value', s => this.events = s)
  },
  methods: {
    deconnecter () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    add () {
      this.db.ref(this.userId).push().set({
        titre: this.newParcours.titre,
        lieu: this.newParcours.lieu,
        date: Date(),
        recit: this.newParcours.recit
      })
    }
  }
}
</script>

<style>

</style>
