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
                  <h3 class="card-title">Admin Password Reset</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="adminUserPasswordReset()">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="password">Password</label>
                      <input v-model="form.password" name="password" type="password" class="form-control" id="password" placeholder="Enter New Password" />
                    </div>
                    <!-- hidden input begin -->
                    <input v-model="form.updated_by" name="updated_by" type="hidden">
                    <!-- hidden input end -->
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary"><i class="fas fa-sync-alt"></i> Reset</button>
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
  data(){
    return{
      form: new Form({
        updated_by: '',
        password:''
      })
    }
  },
  methods: {
    singleAdmin(){
      axios.get('/singleadmin/'+this.$route.params.admin_id)
        .then(response => {
          if(response.data.updated_by != localStorage.getItem("loggedInUserName")){
             response.data.fetched_single_admin.updated_by = localStorage.getItem("loggedInUserName");
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
    adminUserPasswordReset() {
      this.form.put('/adminpasswordreset/'+this.$route.params.admin_id)
      .then(response => {
          iziToast.success({
              title: "OK",
              message: "Successfully reset password!",
              position: 'topRight',
              timeout: 2000
          });
        this.$router.push({ name: "admin-list" });
      })
      .catch(error => {
        iziToast.warning({
          title: "Warning",
          message: "Something wrong, password not reset!",
          position: 'topRight',
          timeout: 2000
        });
      });
    }
  },
  mounted(){
    this.singleAdmin();
  }
};
</script>
<style scoped>
.custom-control-label{
  color:rgba(0, 0, 0, 0.5);
}
</style>