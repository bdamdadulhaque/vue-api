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
                  <h3 class="card-title">Book Add</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="bookSave()">
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
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="bookDescription">Book Description <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <vue-editor v-model="form.book_description"></vue-editor>
                      <p v-if="bookDescriptionCheck == true" class="error-show"> Book description is required!</p>
                    </div>
                  </div>
                  <!-- <div class="form-group">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
                  </div> -->
                  <div class="form-row">
                    <!-- <div class="form-group col-md-6">
                      <label for="bookStatus" class="mr-4">Status:</label>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadioInline1" name="book_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline1">Active</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadioInline2" name="book_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline2">Inactive</label>
                      </div>
                    </div> -->
                    <!-- <div class="form-group col-md-4">
                      <label for="inputState">State</label>
                      <select id="inputState" class="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                      </select>
                    </div>
                    <div class="form-group col-md-2">
                      <label for="inputZip">Zip</label>
                      <input type="text" class="form-control" id="inputZip">
                    </div> -->
                    <!-- hidden input begin -->
                    <input v-model="form.created_by" name="created_by" type="hidden" />
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
                <!-- /.card footer-->
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
// Import the editor
import { VueEditor } from "vue2-editor";
export default {
  components: {
        VueEditor
  },
  data() {
    return {
      form: new Form({
        book_name: '',
        book_name_en: '',
        book_description: '',
        book_status: 1,
        created_by: ''
      }),
      bookDescriptionCheck:false
    };
  },
  methods: {
    bookSave() {
      if(this.form.book_description != ''){
        this.form
          .post("/book")
          .then(response => {
            iziToast.success({
              title: "OK",
              message: "Successfully inserted record!",
              position: "topRight",
              timeout: 2000
            });
            this.$router.push({ name: "book-list" });
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
       else{
          this.bookDescriptionCheck = true;
       }
    }
  },
  mounted() {
    this.form.created_by = localStorage.getItem("loggedInUserId");
  }
};
</script>
<style scoped>
.custom-control-label{
  color:rgba(0, 0, 0, 0.5);
}
.error-show {
  color: red;
}
</style>