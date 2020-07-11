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
                  <h3 class="card-title">Hadith of the day</h3>
                  <div>
                    <button @click="$router.go(-1)" class="btn btn-xs btn-default d-inline-block mr-1">
                      <i class="fas fa-arrow-left"></i> Back
                    </button>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
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
    }
  },
  methods:{
    singleHadith(){
      axios.get('/hadith/'+this.$route.params.hadith_id)
        .then(response => {
           if(response.data.updated_by != localStorage.getItem("loggedInUserId")){
             response.data.fetched_single_hadith.updated_by = localStorage.getItem("loggedInUserId");

             //this.form.fill(response.data.fetched_single_hadith);
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
    }
  },
  mounted(){
    this.singleHadith();
  }
}
</script>