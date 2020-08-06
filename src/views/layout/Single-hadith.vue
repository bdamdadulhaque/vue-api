<template>
    <div class="container">
    <div class="row">
      <!-- Begin left sidebar -->
      <Sidebar/>
      <!-- End left sidebar -->
      <!-- Begin book heading and chapter -->
      <div class="col-md-9">
        <div class="hadith-name-headline d-flex mb-3">
          <i class="fa fa-book fa-2x"></i>
          <h4>{{singleBook.book_name}}</h4>
          <p>( {{hadithCount | engToBen(hadithCount)}} টি  হাদিস )</p>
        </div>
        <div class="box-two mb-3">
          <div class="card">
            <div class="card-body">
              <div v-if="singleChapter.chapter_no != null" class="chapter-no">
                {{singleChapter.chapter_no | engToBen(singleChapter.chapter_no)}}
              </div>
              <div class="chapter-name">
                <span><b>{{singleChapter.chapter_name}}</b></span>
              </div>
              <!-- <div class="hadis-from-to">
                {{singleChapter.hadith_no_begin}} - {{singleChapter.hadith_no_end}}
              </div> -->
            </div>
          </div>
        </div>
        <div class="single-hadith-box">
            <div class="card mb-3">
                <div class="card-body">
                    <div v-if="singleChapter.chapter_no != null" class="box-three d-flex">
                        <i class="fa fa-book-open fa-2x"></i>
                        <h6>অধ্যায়ঃ {{singleChapter.chapter_no | engToBen(singleChapter.chapter_no)}}</h6>
                    </div>
                    <p class="chapter-subject">{{singleHadith.hadith_subject}}</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="box-four">
                        <div v-if="singleHadith.hadith_no != null" class="single-hadith d-flex">
                            <i class="far fa-sun"></i>
                            <h6>{{singleHadith.hadith_no | engToBen(singleHadith.hadith_no)}}</h6>
                        </div>
                        <p class="hadith-in-arabic">{{singleHadith.hadith_name_ar}}</p>
                        <p class="hadith-narrated">{{singleHadith.narrated_by}}</p>
                        <p class="hadith-in-bengali" v-html="singleHadith.hadith_name_bn">{{singleHadith.hadith_name_bn}}</p>
                        <!-- <p class="hadith-reference">{{singleHadith.hadith_reference}}</p> -->
                        <div class="hadith-footer">
                            <div class="hadith-value-text">
                                <p>হাদিসের মানঃ</p>
                            </div>
                            <div v-if="singleHadith.hadith_value == 1" class="hadith-value-sahi">
                                সহীহ হাদিস
                          </div>
                          <div v-if="singleHadith.hadith_value == 2" class="hadith-value-hasan">
                                হাসান
                          </div>
                          <div v-if="singleHadith.hadith_value == 3" class="hadith-value-daif">
                                যঈফ
                          </div>
                            <div class="direct-hadith-link">
                                <router-link :to="{name:'single-hadith', params:{hadith_id:singleHadith.id}}"><i class="fa fa-external-link-alt"></i> সরাসরি</router-link>
                            </div>
                            <div class="report">
                              <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                <i class="fas fa-exclamation-circle"></i> Report
                              </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="collapse" id="collapseExample">
                    <div v-if="reportBox == true" class="card card-body">
                      <form @submit.prevent="reportSend(singleHadith.id)">
                        <div class="form-row">
                          <div class="form-group col-md-4">
                            <label for="reportType">Report Type <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                            <select v-model="form.report_type" name="report_type" id="reportType" :class="{'is-invalid': form.errors.has('report_type')}" class="form-control">
                              <option value="" disabled>Choose Report Type</option>
                              <option value="1">Mismatch Translation</option>
                              <option value="2">Spelling Mistake</option>
                              <option value="3">Other</option>
                            </select>
                            <has-error :form="form" field="report_type"></has-error>
                          </div>
                          <div class="form-group col-md-4">
                            <label for="reporterName">Name <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                            <input v-model="form.reporter_name" name="reporter_name" type="text" :class="{'is-invalid': form.errors.has('reporter_name')}" class="form-control" id="reporterName" placeholder="Name">
                            <has-error :form="form" field="reporter_name"></has-error>
                          </div>
                          <div class="form-group col-md-4">
                            <label for="reportEmail">Email <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                            <input v-model="form.report_email" name="report_email" type="email" :class="{'is-invalid': form.errors.has('report_email')}" class="form-control" id="reportEmail" placeholder="Email">
                            <has-error :form="form" field="report_email"></has-error>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="reportDetails">Deatils <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                          <textarea v-model="form.report_details" name="report_details" :class="{'is-invalid': form.errors.has('report_details')}" class="form-control" id="inputAddress" placeholder="Deatils"></textarea>
                          <has-error :form="form" field="report_details"></has-error>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </form>
                    </div>
                </div>      
            </div>
        </div>
      </div><!-- End book heading and chpater -->
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
  components:{
    Sidebar
  },
  data(){
    return {
      singleBook:'',
      hadithCount:'',
      singleChapter:'',
      singleHadith:'',
      form: new Form({
        report_type: '',
        report_email: '',
        reporter_name: '',
        report_details: '',
        // hadith_no:'',
        // chapter_no:'',
        // book_name:'',
        hadith_id:''
      }),
      reportBox:true
    }
  },
  watch: {
    $route(){
      this.getSingleHadith();
    }
  },
  methods:{
    getSingleHadith() {
      axios.get("/singlehadith/"+this.$route.params.hadith_id)
        .then(response => {
          this.singleBook = response.data.fetched_single_book;
          //this.form.book_name = response.data.fetched_single_book.book_name;
          this.hadithCount = response.data.fetched_hadith_count;
          this.singleChapter = response.data.fetched_single_chapter;
          //this.form.chapter_no = response.data.fetched_single_chapter.chapter_no;
          this.singleHadith = response.data.fetched_single_hadith;
          //this.form.hadith_no = response.data.fetched_single_hadith.hadith_no;
        })
        .catch(error => {
          iziToast.error({
          title: "Error",
          message: "Something wrong, record not fetched!",
          position: "topRight",
          timeout: 2000
          });
        });
    },
    reportSend(hadithId) {
      this.form.hadith_id = hadithId;
      this.form.post('/report')
        .then(response => {
          this.reportBox = false;
          iziToast.success({
            title: "OK",
            message: "Successfully sended your report!",
            position: 'topCenter',
            timeout: 3000
          });
        })
        .catch(error => {
          iziToast.warning({
            title: "Warning",
            message: "Please fill up required field!",
            position: 'topCenter',
            timeout: 3000
          });
        });
    }
  },
  mounted() {
    this.getSingleHadith();
  }
}
</script>