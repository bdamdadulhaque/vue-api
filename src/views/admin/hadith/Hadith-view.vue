<template>
  <div>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-primary">
              <div class="card-header">
                <div class="d-flex justify-content-between">
                  <h3 class="card-title">Hadith View</h3>
                  <div>
                    <button @click="$router.go(-1)" class="btn btn-xs btn-default d-inline-block mr-1">
                      <i class="fas fa-arrow-left"></i> Back
                    </button>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <!-- form start -->
                <form @submit.prevent="hotdSave()">
                  <div class="form-row">
                    <div class="form-group col-md-12 d-flex">
                      <div>
                        <label for="hotdDate" class="mt-2">Hadith of the Day</label>
                      </div>
                      <div>
                        <input v-model="form.hotd_date" name="hotd_date" :class="{'is-invalid': form.errors.has('hotd_date')}" type="date" class="form-control ml-2" id="hotdDate"/>
                        <has-error :form="form" field="hotd_date"></has-error>
                        <!-- <input v-model="form.hotd_status" name="hotd_status" type="hidden"/> -->
                      </div>
                      <div>
                        <!-- hidden input begin -->
                        <input v-model="form.updated_by" name="updated_by" type="hidden"/>
                        <!-- hidden input -- end -->
                        <button type="submit" class="btn btn-primary ml-3">
                          <i class="fas fa-check"></i> Set
                        </button>
                      </div>
                    </div>
                 </div>
                </form>
                <!-- /.form -->
                <div class="callout callout-success">
                  <h5><i class="fas fa-info"></i> Hadith No: {{singleHadithData.hadith_no}}</h5>
                    {{singleHadithData.hadith_name_bn}}
                </div>
                <div class="callout callout-success">
                    {{singleHadithData.hadith_name_ar}}
                </div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
export default {
  data(){
    return{
      singleHadithData:[],
      form: new Form({
        hotd_date: '',
        hotd_status:1,
        updated_by: ''
      })
    }
  },
  methods:{
    singleHadith(){
      axios.get('/hadith/'+this.$route.params.hadith_id)
        .then(response => {
           if(response.data.updated_by != localStorage.getItem("loggedInUserId")){
             response.data.fetched_single_hadith.updated_by = localStorage.getItem("loggedInUserId");

             this.form.fill(response.data.fetched_single_hadith);
             this.singleHadithData = response.data.fetched_single_hadith;
           }
        })
        .catch(error => {
          iziToast.error({
            title: "Error",
            message: "Something wrong, record not fetched!",
            position: 'topRight',
            timeout: 2000
          });
        });
    },
    hotdSave() {
      this.form
        .post('/hotdsave/'+this.$route.params.hadith_id)
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully set hadith of the today!",
            position: "topRight",
            timeout: 2000
          });
          this.$router.push({ name: "hadith-list" });
        })
        .catch(error => {
          iziToast.warning({
            title: "Warning",
            message: "Please fill up required field!",
            position: "topRight",
            timeout: 2000
          });
        });
    }
  },
  mounted(){
    this.singleHadith();
  }
}
</script>