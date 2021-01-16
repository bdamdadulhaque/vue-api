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
                  <h3 class="card-title">Account Edit</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="accountUpdate()">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-3">
                      <label for="accountBook">Book <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <select v-model="form.book_id" name="book_id" class="form-control" id="accountBook">
                        <option disabled value="">Select Book</option>
                        <option v-for="(book,index) in books" :key="index" :value="book.id">{{book.book_name}}</option>
                      </select>
                    </div>
                    <div class="form-group col-md-3">
                      <label for="accountChapter">Chapter <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <select v-model="form.chapter_id" name="chapter_id" class="form-control" id="accountChapter">
                        <option disabled value="">Select Chapter</option>
                        <option v-for="(chapter,index) in chapters" :key="index" :value="chapter.id">{{chapter.chapter_name}}</option>
                      </select>
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
                      <input v-model="form.account_no" name="account_no" type="number" :class="{'is-invalid': form.errors.has('account_no')}" class="form-control" id="accountNo" placeholder="Enter account no"/>
                      <has-error :form="form" field="account_no"></has-error>
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
                      <label for="accountNameBn">Account Bn</label>
                      <!-- <textarea v-model="form.account_name_bn" name="account_name_bn" class="form-control" id="accountNameBn"></textarea> -->
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
                      <label for="accountStatus" class="mr-3">Status</label><br>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.account_status" value="1" type="radio" id="customRadioInline1" name="account_status" class="custom-control-input" checked>
                        <label class="custom-control-label" for="customRadioInline1">Active</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.account_status" value="0" type="radio" id="customRadioInline2" name="account_status" class="custom-control-input">
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
// Import the editor
import { VueEditor } from "vue2-editor";
export default {
    components: {
        VueEditor
  },
  data() {
    return {
      form: new Form({
        account_subject: '',
        account_subject_details: '',
        narrated_by: '',
        account_name_bn: '',
        // account_reference: '',
        account_name_ar: '',
        book_id: '',
        chapter_id: '',
        account_no: '',
        account_value: '',
        account_status: '',
        updated_by: ''
      }),
      books:'',
      chapters:'',
      accountBnCheck:false
    };
  },
  methods: {
    singleAccount(){
      axios.get('/account/'+this.$route.params.account_id)
        .then(response => {
           if(response.data.updated_by != localStorage.getItem("loggedInUserId")){
             response.data.fetched_single_account.updated_by = localStorage.getItem("loggedInUserId");
             this.form.fill(response.data.fetched_single_account);
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
    accountUpdate() {
      if(this.form.account_name_bn != ''){
      this.form.put('/account/'+this.$route.params.account_id)
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully updated record!",
            position: 'topRight',
            timeout: 2000
          });
          this.$router.push({ name: "account-list" });
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
      else{
        this.accountBnCheck = true;
      }
    }
  },
  mounted(){
    this.singleAccount();
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
.error-show {
  color: red;
}
</style>