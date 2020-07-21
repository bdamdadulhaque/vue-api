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
                  <h3 class="card-title">Daily Hadith Edit</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="dailyHadithUpdate()">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="date">Date <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.daily_hadith_date" name="daily_hadith_date" type="date" :class="{'is-invalid': form.errors.has('daily_hadith_date')}" class="form-control" id="date"/>
                      <has-error :form="form" field="daily_hadith_date"></has-error>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="link">Link</label>
                      <input v-model="form.daily_hadith_link" name="daily_hadith_link" type="text" class="form-control" id="link" placeholder="Enter daily hadith link"/>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="dailyHadithStatus" class="mr-4">Status</label><br>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.daily_hadith_status" value="1" type="radio" id="customRadioInline1" name="daily_hadith_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline1">Active</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.daily_hadith_status" value="0" type="radio" id="customRadioInline2" name="daily_hadith_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline2">Inactive</label>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="dailyHadith">Daily Hadith <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <textarea v-model="form.daily_hadith" name="daily_hadith" :class="{'is-invalid': form.errors.has('daily_hadith_date')}" class="form-control" id="dailyHadith" placeholder="Enter daily hadith"></textarea>
                      <has-error :form="form" field="daily_hadith"></has-error>
                    </div>
                    <!-- hidden input begin -->
                    <input v-model="form.created_by" name="created_by" type="hidden">
                    <!-- hidden input -- end -->
                  </div>
                </div>
                <!-- /.card-body -->
                
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-check"></i> Save
                  </button>
                  <button type="reset" class="btn btn-warning ml-2">
                    <i class="fas fa-undo-alt"></i> Reset
                  </button>
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
        daily_hadith_date: '',
        daily_hadith: '',
        daily_hadith_link: '',
        daily_hadith_status:1,
        created_by:''
      })
    };
  },
  methods: {
    singleDailyHadith(){
      axios.get('/dailyhadith/'+this.$route.params.daily_hadith_id)
        .then(response => {
           if(response.data.updated_by != localStorage.getItem("loggedInUserId")){
             response.data.fetched_single_daily_hadith.updated_by = localStorage.getItem("loggedInUserId");
             this.form.fill(response.data.fetched_single_daily_hadith);
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
    dailyHadithUpdate() {
      this.form.put('/dailyhadith/'+this.$route.params.daily_hadith_id)
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully inserted record!",
            position: 'topRight',
            timeout: 2000
          });
          this.$router.push({ name: 'daily-hadith-list' });
        })
        .catch(error => {
          iziToast.warning({
            title: "Warning",
            message: "Please fill up required field!",
            position: 'topRight',
            timeout: 2000
          });
        });
    }
  },
  mounted(){
    this.singleDailyHadith();
    this.form.updated_by = localStorage.getItem("loggedInUserId");
  }
};
</script>
<style scoped>
.custom-control-label{
  color:rgba(0, 0, 0, 0.5);
}
</style>