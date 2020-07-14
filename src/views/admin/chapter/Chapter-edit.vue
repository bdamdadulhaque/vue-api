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
                  <h3 class="card-title">Chapter Edit</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="chapterUpdate()">
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
                      <has-error :form="form" field="chapter_no"></has-error>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="chapterBook">Book</label>
                      <select v-model="form.book_id" name="book_id" class="form-control" id="chapterBook">
                        <option disabled value="">Select Book</option>
                        <option v-for="(book,index) in books" :key="index" :value="book.id">{{book.book_name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="chapterStatus" class="mr-3">Status</label><br>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.chapter_status" value="1" type="radio" id="customRadioInline1" name="chapter_status" class="custom-control-input" checked>
                        <label class="custom-control-label" for="customRadioInline1">Active</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.chapter_status" value="0" type="radio" id="customRadioInline2" name="chapter_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline2">Inactive</label>
                      </div>
                    </div>
                    <!-- hidden input begin -->
                    <input v-model="form.updated_by" name="updated_by" type="hidden">
                    <!-- hidden input -- end -->
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
        chapter_name: '',
        chapter_no: '',
        book_id: '',
        chapter_status: '',
        updated_by: ''
      }),
      books:''
    };
  },
  methods: {
    singleChapter(){
      axios.get('/chapter/'+this.$route.params.chapter_id)
        .then(response => {
           if(response.data.updated_by != localStorage.getItem("loggedInUserId")){
             response.data.fetched_single_chapter.updated_by = localStorage.getItem("loggedInUserId");
             this.form.fill(response.data.fetched_single_chapter);
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
    chapterUpdate() {
      this.form.put('/chapter/'+this.$route.params.chapter_id)
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully updated record!",
            position: 'topRight',
            timeout: 2000
          });
          this.$router.push({ name: "chapter-list" });
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
    this.singleChapter();
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