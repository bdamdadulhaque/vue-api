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
                  <h3 class="card-title">Book Edit</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="bookUpdate()">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="bookName">Book Name <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.book_name" name="book_name" :class="{'is-invalid': form.errors.has('book_name')}" type="text" class="form-control" id="bookName" placeholder="Enter book"/>
                      <has-error :form="form" field="book_name"></has-error>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="bookNameEn">Book Name En <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.book_name_en" name="book_name_en" :class="{'is-invalid': form.errors.has('book_name_en')}" type="text" class="form-control" id="bookNameEn" placeholder="Enter book by english language"/>
                      <has-error :form="form" field="book_name_en"></has-error>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="bookStatus" class="mr-4">Status</label><br>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.book_status" value="1" type="radio" id="customRadioInline1" name="book_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline1">Active</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.book_status" value="0" type="radio" id="customRadioInline2" name="book_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline2">Inactive</label>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="form-group">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
                  </div> -->
                  <div>
                    <!-- <div class="form-group col-md-6">
                      <label for="inputCity">City</label>
                      <input type="text" class="form-control" id="inputCity">
                    </div> -->
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
        book_name: '',
        book_name_en: '',
        book_status: '',
        updated_by: ''
      })
    };
  },
  methods: {
    singleBook(){
      axios.get('/book/'+this.$route.params.book_id)
        .then(response => {
           if(response.data.updated_by != localStorage.getItem("loggedInUserId")){
             response.data.fetched_single_book.updated_by = localStorage.getItem("loggedInUserId");
             this.form.fill(response.data.fetched_single_book);
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
    bookUpdate() {
      this.form.put('/book/'+this.$route.params.book_id)
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully updated record!",
            position: 'topRight',
            timeout: 2000
          });
          this.$router.push({ name: "book-list" });
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
    this.singleBook();
  }
};
</script>
<style scoped>
.custom-control-label{
  color:rgba(0, 0, 0, 0.5);
}
</style>