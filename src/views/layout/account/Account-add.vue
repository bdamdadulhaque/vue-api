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
                  <h3 class="card-title">Account Add</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="accountSave()">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-3">
                      <label for="accountBook">Book <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <select v-model="form.book_id" name="book_id" :class="{'is-invalid': form.errors.has('book_id')}" class="form-control" id="accountBook" @change="getChapters()">
                        <option disabled value="">Select Book</option>
                        <option v-for="(book,index) in books" :key="index" :value="book.id">{{book.book_name}}</option>
                      </select>
                      <has-error :form="form" field="book_id"></has-error>
                    </div>
                    <div class="form-group col-md-3">
                      <label for="accountChapter">Chapter <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <select v-model="form.chapter_id" name="chapter_id" :class="{'is-invalid': form.errors.has('chapter_id')}" class="form-control" id="accountChapter">
                        <option disabled value="">Select Chapter</option>
                        <option v-for="(chapter,index) in chapters" :key="index" :value="chapter.id">{{chapter.chapter_no}} - {{chapter.chapter_name}}</option>
                      </select>
                      <has-error :form="form" field="chapter_id"></has-error>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="accountSubject">Account Subject</label>
                      <input v-model="form.account_subject" name="account_subject" type="text" class="form-control" id="accountSubject" placeholder="Enter account subject"/>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="accountSubjectDeatils">Account Subject Details</label>
                      <textarea v-model="form.account_subject_details" name="account_subject_details" class="form-control" id="accountSubjectDeatils" placeholder="Enter Account Subject Details"></textarea>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-3">
                      <label for="accountNo">Account No <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <!-- <input v-model="form.account_no" name="account_no" type="number" :class="{'is-invalid': form.errors.has('account_no')}" class="form-control" id="accountNo" placeholder="Enter account no" @mouseleave="accountNoEntryCheck()"/> -->
                      <input v-model="form.account_no" name="account_no" type="number" :class="{'is-invalid': form.errors.has('account_no')}" class="form-control" id="accountNo" placeholder="Enter account no"/>
                      <has-error :form="form" field="account_no"></has-error>
                      <!-- <p v-if="accountNoOkMsg==true" class="error-show"> Account no. should be {{currentAccountNo+1}}</p> -->
                    </div>
                    <div class="form-group col-md-3">
                      <label for="accountValue">Account Value <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <select v-model="form.account_value" name="account_value" :class="{'is-invalid': form.errors.has('account_value')}" class="form-control" id="accountValue">
                        <option disabled value="">Select Value</option>
                        <option value="1">সহীহ হাদিস</option>
                        <option value="2">হাসান</option>
                        <option value="3">যঈফ</option>
                        <option value="4">সহিহ মাকতু</option>
                        <option value="5">সহিহ মাওকুফ</option>
                        <option value="6">মুনকার (সর্বদা পরিত্যক্ত)</option>
                        <option value="7">শা'জ</option>
                        <option value="8">মুনকার</option>
                        <option value="9">নির্ণীত নয়</option>
                        <option value="10">অন্যান্য</option>
                        <option value="11">দুর্বল হাদিস</option>
                      </select>
                      <has-error :form="form" field="account_value"></has-error>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="narratedBy">Narrated By <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.narrated_by" name="narrated_by" type="text" :class="{'is-invalid': form.errors.has('narrated_by')}" class="form-control" id="narratedBy" placeholder="Enter narrated by name"/>
                      <has-error :form="form" field="narrated_by"></has-error>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="accountNameBn">Account Bn <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <!-- <textarea v-model="form.account_name_bn" name="account_name_bn" class="form-control" id="accountNameBn" placeholder="Enter Account Bengali"></textarea> -->
                      <vue-editor v-model="form.account_name_bn"></vue-editor>
                      <p v-if="accountBnCheck == true" class="error-show"> Account Name Bn is required!</p>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="accountNameAr">Account Ar <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <textarea v-model="form.account_name_ar" name="account_name_ar" :class="{'is-invalid': form.errors.has('account_name_ar')}" class="form-control" id="accountNameAr" placeholder="Enter Account Arabic"></textarea>
                      <has-error :form="form" field="account_name_ar"></has-error>
                    </div>
                  </div>
                  <div class="form-row">
                    <!-- <div class="form-group col-md-6">
                      <label for="accountReference">Account Reference</label>
                      <input v-model="form.account_reference" name="account_reference" type="text" class="form-control" id="accountReference" placeholder="Enter account reference"/>
                    </div> -->
                    <div class="form-group col-md-6">
                      <label for="accountStatus" class="mr-4">Status</label><br>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.account_status" value="1" type="radio" id="customRadioInline1" name="category_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline1">Active</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.account_status" value="0" type="radio" id="customRadioInline2" name="category_status" class="custom-control-input">
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
// Import the editor
import { VueEditor } from "vue2-editor";
export default {
  components: {
        VueEditor
  },
  data() {
    return {
      form: new Form({
        account_name_bn: '',
        // account_reference: '',
        account_name_ar: '',
        account_subject: '',
        account_subject_details: '',
        narrated_by: '',
        book_id:'',
        chapter_id:'',
        account_no:'',
        account_value:'',
        account_status:1,
        created_by:''
      }),
      books:[],
      chapters:[],
      accountBnCheck:false,
      // currentAccountNo:'',
      // accountNoOkMsg:false
      
    };
  },
   mounted() {
    this.form.created_by = localStorage.getItem("loggedInUserId");
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
    getChapters(){
      //this.getMaxAccountNo();
      axios.get('/chapterbyid/'+this.form.book_id)
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
    // getMaxAccountNo(){
    //   axios.get('/maxaccountno/'+ this.form.book_id)
    //   .then(response =>{
    //       if(response.data.fetched_max_account_no == null){
    //         this.currentAccountNo = 0;
    //       }
    //       else{
    //         this.currentAccountNo = response.data.fetched_max_account_no;
    //       }
    //     })
    //     .catch(error => {
    //       iziToast.error({
    //         title: "Error",
    //         message: "Something wrong, Account no. not fetched!",
    //         position: "topRight",
    //         timeout: 2000
    //       });
    //     });
        
    // },
    // accountNoEntryCheck(){
    //   if(this.form.account_no == this.currentAccountNo+1){
    //     this.accountNoOkMsg = false
    //   }
    //   else{
    //     this.accountNoOkMsg = true
    //   }
    // },
    accountSave() {
      // if(this.form.account_name_bn != '' && this.form.account_no == this.currentAccountNo+1){
      if(this.form.account_name_bn != ''){
       
        this.form.post('/account')
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully inserted record!",
            position: 'topRight',
            timeout: 2000
          });
          this.$router.push({ name: 'account-list' });
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
       else{
        //  if(this.form.account_no != this.currentAccountNo+1){
        //   this.accountNoOkMsg = true
        //  }
        //  if(this.form.account_name_bn == ''){
        //    this.accountBnCheck = true;
        //  }   
           this.accountBnCheck = true;
       }
      
    }
  },
  // mounted(){
  //   this.form.created_by = localStorage.getItem("loggedInUserId");
  // },
  created(){
    this.getBooks();
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