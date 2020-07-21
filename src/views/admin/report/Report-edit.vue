<template>
  <div>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-primary">
              <div class="card-header">
                <div class="d-flex justify-content-between">
                  <h3 class="card-title">Report Edit</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="reportUpdate()">
                <div class="card-body">
                  <div class="form-row">
                    <!-- <div class="form-group col-md-4">
                      <label for="reportEmail"></label>
                      <input v-model="form.report_email" name="report_email" type="email" class="form-control" id="reportEmail"/>
                    </div> -->
                    <div class="form-group col-md-4">
                      <label for="reportStatus" class="mr-4">Status</label><br>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.report_status" value="0" type="radio" id="customRadioInline1" name="report_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline1">Not Fixed</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.report_status" value="1" type="radio" id="customRadioInline2" name="report_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline2">Fixed</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <!-- hidden input begin -->
                    <input v-model="form.updated_by" name="updated_by" type="hidden">
                    <!-- hidden input end -->
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary"><i class="fas fa-sync-alt"></i> Update</button>
                </div>
              </form>
              <!-- /.form -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: new Form({
        // report_type: '',
        // report_email: '',
        // report_details: '',
        report_status: '',
        updated_by: ''
      })
    };
  },
  methods: {
    singleReport(){
      axios.get('/report/'+this.$route.params.report_id)
        .then(response => {
           if(response.data.updated_by != localStorage.getItem("loggedInUserId")){
             response.data.fetched_single_report.updated_by = localStorage.getItem("loggedInUserId");
             this.form.fill(response.data.fetched_single_report);
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
    reportUpdate() {
      this.form.put('/report/'+this.$route.params.report_id)
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully updated record!",
            position: 'topRight',
            timeout: 2000
          });
          this.$router.push({ name: "report-list" });
        })
        .catch(error => {
          iziToast.warning({
            title: "Warning",
            message: "Something wrong, record not updated!",
            position: 'topRight',
            timeout: 2000
          });
        });
    }
  },
  mounted(){
    this.singleReport();
  }
};
</script>
<style scoped>
.custom-control-label{
  color:rgba(0, 0, 0, 0.5);
}
</style>