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
                  <h3 class="card-title">Hadith Edit</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="hadithUpdate()">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-3">
                      <label for="hadithBook">Book</label>
                      <select v-model="form.book_id" name="book_id" class="form-control" id="hadithBook">
                        <option disabled value="">Select Book</option>
                        <option v-for="(book,index) in books" :key="index" :value="book.id">{{book.book_name}}</option>
                      </select>
                    </div>
                    <div class="form-group col-md-3">
                      <label for="hadithChapter">Chapter</label>
                      <select v-model="form.chapter_id" name="chapter_id" class="form-control" id="hadithChapter">
                        <option disabled value="">Select Chapter</option>
                        <option v-for="(chapter,index) in chapters" :key="index" :value="chapter.id">{{chapter.chapter_name}}</option>
                      </select>
                    </div>
                    <div class="form-group col-md-3">
                      <label for="hadithNo">Hadith No <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.hadith_no" name="hadith_no" type="number" :class="{'is-invalid': form.errors.has('hadith_no')}" class="form-control" id="hadithNo"/>
                      <has-error :form="form" field="hadith_no"></has-error>
                    </div>
                    <div class="form-group col-md-3">
                      <label for="hadithValue">Hadith Value <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <select v-model="form.hadith_value" name="hadith_value" :class="{'is-invalid': form.errors.has('hadith_value')}" class="form-control" id="hadithValue">
                        <option disabled value="">Select Value</option>
                        <option value="1">সহীহ হাদিস</option>
                        <option value="2">অন্যান্য</option>
                      </select>
                      <has-error :form="form" field="hadith_value"></has-error>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="hadithSubject">Hadith Subject <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.hadith_subject" name="hadith_subject" :class="{'is-invalid': form.errors.has('hadith_subject')}" type="text" class="form-control" id="hadithSubject" placeholder="Enter hadith subject"/>
                      <has-error :form="form" field="hadith_subject"></has-error>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="hadithNameBn">Hadith Bn <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <textarea v-model="form.hadith_name_bn" name="hadith_name_bn" :class="{'is-invalid': form.errors.has('hadith_name_bn')}" class="form-control" id="hadithNameBn"></textarea>
                      <has-error :form="form" field="hadith_name_bn"></has-error>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="hadithNameAr">Hadith Ar <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <textarea v-model="form.hadith_name_ar" name="hadith_name_ar" :class="{'is-invalid': form.errors.has('hadith_name_ar')}" class="form-control" id="hadithNameAr"></textarea>
                      <has-error :form="form" field="hadith_name_ar"></has-error>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="hadithStatus" class="mr-3">Status</label><br>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.hadith_status" value="1" type="radio" id="customRadioInline1" name="hadith_status" class="custom-control-input" checked>
                        <label class="custom-control-label" for="customRadioInline1">Active</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.hadith_status" value="0" type="radio" id="customRadioInline2" name="hadith_status" class="custom-control-input">
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
        hadith_subject: '',
        hadith_name_bn: '',
        hadith_name_ar: '',
        book_id: '',
        chapter_id: '',
        hadith_no: '',
        hadith_value: '',
        hadith_status: '',
        updated_by: ''
      }),
      books:'',
      chapters:''
    };
  },
  methods: {
    singleHadith(){
      axios.get('/hadith/'+this.$route.params.hadith_id)
        .then(response => {
           if(response.data.updated_by != localStorage.getItem("loggedInUserId")){
             response.data.fetched_single_hadith.updated_by = localStorage.getItem("loggedInUserId");
             this.form.fill(response.data.fetched_single_hadith);
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
    getChapters(){
      axios.get('/chapter')
        .then(response =>{
          this.chapters = response.data.fetched_chapter;
        })
        .catch(error => {
          iziToast.error({
            title: "Error",
            message: "Something wrong, Chapter not fetched!",
            position: "topRight",
            timeout: 2000
          });
        });
    },
    hadithUpdate() {
      this.form.put('/hadith/'+this.$route.params.hadith_id)
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully updated record!",
            position: 'topRight',
            timeout: 2000
          });
          this.$router.push({ name: "hadith-list" });
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
    this.singleHadith();
  },
  created(){
    this.getBooks();
    this.getChapters();
  }
};
</script>
<style scoped>
.custom-control-label{
  color:rgba(0, 0, 0, 0.5);
}
</style>