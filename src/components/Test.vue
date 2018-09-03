<template>
    <div>
        <div>
            <label>Name:</label>
            <input type="text" v-model="name">
            <button @click="submitName()">Add</button>
            <div> {{names[0]}} </div>
        </div>
       <!-- <div>
            <ul>
                <li v-for="personName of names" v-bind:key="personName['.key']">
                    <div v-if="!personName.edit">
                        <p>{{ personName.name }}</p>
                        <button @click="removePerson(personName['.key'])">Remove</button>
                        <button @click="editPerson(personName['.key'])">Edit</button>
                    </div>
                    <div v-else>
                        <input type="text" v-model="personName.name ">
                        <button @click="saveEdit(personName)">Save</button>
                        <button @click="cancelEdit(personName['.key'])">Cancel</button>
                    </div>
                </li>
            </ul>
        </div> -->
    </div>
</template>

<script>
import {db,auth} from '../firebase'

export default {
  name: 'test',
  data () {
    return {
      name: '',
      userId: null,
      selectedFile: null,
      nameRef: null
    }
  },
  mounted () {
    this.userId = auth.currentUser.uid
  },
  firebase: {
    names: db.ref(this.userId)
  },
  methods: {
    submitName () {
      db.ref(this.userId).push({name: this.name, edit: false})
      this.name = ''
    },
    removePerson (key) {
      db.ref(this.userId).child(key).remove()
    },
    editPerson (key) {
      db.ref(this.userId).child(key).update({edit: true})
    },
    cancelEdit (key) {
      db.ref(this.userId).child(key).update({edit: false})
    },
    saveEdit (person) {
      const key = person['.key']
      db.ref(this.userId).child(key).set({name: person.name, edit: false})
    },
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
    }
  }
}
</script>

<style>

</style>
