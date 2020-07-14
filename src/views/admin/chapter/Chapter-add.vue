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
                  <h3 class="card-title">Chapter Add</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="chapterSave()">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="chapterName">Chapter Name <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.chapter_name" name="chapter_name" :class="{'is-invalid': form.errors.has('chapter_name')}" type="text" class="form-control" id="chapterName" placeholder="Enter chapter"/>
                      <has-error :form="form" field="chapter_name"></has-error>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="chapterNo">Chapter No <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.chapter_no" name="chapter_no" :class="{'is-invalid': form.errors.has('chapter_no')}" type="text" class="form-control" id="chapterNo" placeholder="Enter chapter no"/>
                      <has-error :form="form" field="chapter_name"></has-error>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="chapterBook">Book <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <select v-model="form.book_id" name="book_id" :class="{'is-invalid': form.errors.has('book_id')}" class="form-control" id="chapterBook">
                        <option disabled value="">Select Book</option>
                        <option v-for="(book,index) in books" :key="index" :value="book.id">{{book.book_name}}</option>
                      </select>
                      <has-error :form="form" field="book_id"></has-error>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="chapterStatus" class="mr-4">Status</label><br>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.chapter_status" value="1" type="radio" id="customRadioInline1" name="category_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline1">Active</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.chapter_status" value="0" type="radio" id="customRadioInline2" name="category_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline2">Inactive</label>
                      </div>
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
        chapter_name: '',
        chapter_no: '',
        book_id:'',
        chapter_status:1,
        created_by:''
      }),
      books:[]
    };
  },
  methods: {
    getBooks(){
      axios.get('/book')
        .then(response =>{
          this.books = response.data.fetched_book;
        })
        .catch(error => {
          iziToast.error({
            title: "Error",
            message: "Something wrong, Book not fetched!",
            position: "topRight",
            timeout: 2000
          });
        });
    },
    chapterSave() {
      this.form.post('/chapter')
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully inserted record!",
            position: 'topRight',
            timeout: 2000
          });
          this.$router.push({ name: 'chapter-list' });
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
    this.form.created_by = localStorage.getItem("loggedInUserId");
  },
  created(){
    this.getBooks();
  }
};
</script>
<style scoped>
.custom-control-label{
  color:rgba(0, 0, 0, 0.5);
}
</style>