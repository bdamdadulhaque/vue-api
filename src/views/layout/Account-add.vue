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
                    <div class="form-group col-md-6">
                      <label for="narratedBy">Account Name<sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.account_name" name="account_name" type="text" :class="{'is-invalid': form.errors.has('account_name')}" class="form-control" id="narratedBy" placeholder="Enter account name"/>
                      <has-error :form="form" field="account_name"></has-error>
                    </div>


                    <div class="form-group col-md-6">
                      <label for="accountBook">Bank <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <select v-model="form.financial_organization_id" name="financial_organization_id" :class="{'is-invalid': form.errors.has('financial_organization_id')}" class="form-control" id="accountBook">
                        <option disabled value="">Select Book</option>
                        <option value="1">IFIC Bank Limited</option>
                        <option value="2">South East Bank Limited</option>
                        <option value="3">The City Bank Limited</option>
                      </select>
                      <has-error :form="form" field="financial_organization_id"></has-error>
                    </div>
                    
                    <div class="form-group col-md-6">
                      <label for="accountSubject">Account No</label>
                      <input v-model="form.account_no" name="account_no" type="text" class="form-control" id="accountSubject" placeholder="Enter account subject"/>
                      <has-error :form="form" field="account_no"></has-error>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="accountSubject">Branch</label>
                      <input v-model="form.branch" name="branch" type="text" class="form-control" id="accountSubject" placeholder="Enter account subject"/>
                      <has-error :form="form" field="branch"></has-error>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="accountSubject">Account Type</label>
                      <input v-model="form.account_type" name="account_type" type="text" class="form-control" id="accountSubject" placeholder="Enter account subject"/>
                      <has-error :form="form" field="account_type"></has-error>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="accountSubject">Swift Code</label>
                      <input v-model="form.swift_code" name="swift_code" type="text" class="form-control" id="accountSubject" placeholder="Enter account subject"/>
                      <has-error :form="form" field="swift_code"></has-error>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="accountSubject">Route No</label>
                      <input v-model="form.route_no" name="route_no" type="text" class="form-control" id="accountSubject" placeholder="Enter account subject"/>
                      <has-error :form="form" field="route_no"></has-error>
                    </div>
                    
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
        account_name: '',
        financial_organization_id: '',
        account_no: '',
        branch: '',
        account_type: '',
        swift_code: '',
        route_no: '',
      })
      
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