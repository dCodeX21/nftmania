<template>
  <div>
    <div>
      <h1>{{ author }}</h1>
      <h1>{{ todo }}</h1>
      <h2>{{ results }}</h2>
      <!-- <h2>{{ data }}</h2> -->
    </div>
    <br>
    <div>
      <input type="text" placeholder="New Author" v-model="formDetails.newAuthor">
      <span>Test: {{ formDetails.newAuthor }} </span>
    </div>
    <br>
    <div>
      <input type="text" placeholder="New Todo" v-model="formDetails.newTodo">
      <span>Test: {{ formDetails.newTodo }} </span>
    </div>
    <br>
    <button @click="getData3">Get All Data</button>
    <br>
    <button @click="sendData">Send Data</button>
  </div>
</template>

<script>
// import { reactive } from 'vue'
import axios from 'axios'
// import FormData from 'form-data'
  // export default {
  //     const state = reactive({
  //       todos: {}
  //     })

  //     displayData: function() {
  //       axios.create({
  //           baseURL: this.apiUrl,
  //           headers: {
  //             'Authorization': `Bearer ${this.token}`
  //           }
  //         })
  //         .get(`getAnnouncementList`)
  //         .then((res) => {
  //           this.latestAnnouncement = res.data.data.pub[0];
  //           this.attachementLink = this.latestAnnouncement.attachmentLink;
  //           this.readAnnouncement();

  //         })
  //     },

  //     return { state }
  // }

export default {
  name: 'TodosView',
  data() {
    return {
      author: 'None',
      todo: 'None',
      results: 'None',
      // data: ''
      formDetails: {
        newAuthor: '',
        newTodo: ''
      }
    }
  },

  methods: {
    getData: function() {
      // let formData = new FormData();
      // formData.append('form_data', JSON.stringify(this.form));

      axios.create({
        baseURL: 'http://localhost:3000/todos',
        // headers: {
        //   'Authorization': `Bearer ${this.token}`
        // }
      })
      .get('/')
      .then(res => {
        let result = res.data[0]
        console.log()
        this.author = result.author
        this.todo = result.todo
        this.results = result
      })
    },

    getData2: async function() {
      let res = await axios.get('http://localhost:3000/todos/')
      let deyta = res.data[0]
      console.log(deyta)
      this.author = deyta.author
      this.todo = deyta.todo
      this.results = deyta
    },

    getData3: async function() {
      try {
        let res = await axios.get('http://localhost:3000/todos/')
        let deyta = res.data[0]
        console.log(deyta)
        this.author = deyta.author
        this.todo = deyta.todo
        this.results = deyta
      } catch (exception) {
        throw new Error(exception.message)
      }
    },

    sendData: async function() {
      let formData = this.formDetails;
      // formData.append('data', JSON.stringify(this.formDetails));
      // formData.append('form-data', this.formDetails);
      // console.log(formData);
      try {
        await axios.create({
          baseURL: 'http://localhost:3000/todos'  ,   //this.apiUrl,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${this.token}`
          }
        }).post('/new', formData).then(res => {
          console.log('New Author Added!')
          console.log(res);
        });
      } catch (exception) {
        throw new Error(exception.message)
      }



      // axios.post('http://localhost:3000/todos/new', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     'Accept': 'application/json',
      //   }
      // }).then(() => {
      //   // Handle result…
      //   console.log('New Author Added!')
      // })


      // try {
      //   axios.post('http://localhost:3000/todos/new', this.formDetails, {
      //       headers: {
      //         "Accept": "application/json",
      //         "Content-Type": "application/json;charset=UTF-8",
      //       },
      //     })
      //     .then(res => {
      //       console.log(res);
      //   });
      // } catch (exception) {
      //   throw new Error(exception.message)
      // }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
