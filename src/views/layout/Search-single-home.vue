<template>
    <div class="container">
    <div class="row mb-5">
      <!-- Begin left sidebar -->
      <Sidebar/>
      <!-- End left sidebar -->
      <!-- Begin book heading and chapter -->
      <div class="col-md-9">
        <div class="hadith-name-headline d-flex mb-3">
          <i class="fa fa-book fa-2x"></i>
          <h4>সার্চের ফলাফল</h4>
          <!-- <p>( {{searchRow.length}} টি  হাদিস )</p> -->
        </div>
        <div v-if="searchRow != null" class="box-two mb-3 mb-3">
          <div class="card">
            <div class="card-body">
              <div v-if="singleChapter.chapter_no != null" class="chapter-no">
               {{singleChapter.chapter_no | engToBen(singleChapter.chapter_no)}}
              </div>
              <div class="chapter-name">
                <a> {{singleChapter.chapter_name}} </a>
              </div>
              <!-- <div class="hadis-from-to">
                ১০৩২ - ১১৫৩
              </div> -->
            </div>
          </div>
        </div>
        <!-- <div v-for="(hadith, index) in this.$route.query.search_result" :key="index" class="single-hadith-box mb-3"> -->
        <div v-if="searchRow != null" class="single-hadith-box mb-3">
            <div v-if="searchRow.hadith_subject != null" class="card mb-3">
                <div class="card-body">
                    <!-- <div class="box-three d-flex">
                        <i class="fa fa-book-open fa-2x"></i>
                        !-- <h6>/{{index+1}} অধ্যায়ঃ</h6> --
                        !-- <h6>/ অধ্যায়ঃ</h6> --
                    </div> -->
                    <p class="chapter-subject">{{searchRow.hadith_subject}}</p>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="box-four">
                        <div v-if="searchRow.hadith_no != null" class="single-hadith d-flex">
                            <i class="far fa-sun"></i>
                            <h6>{{searchRow.hadith_no | engToBen(searchRow.hadith_no)}}</h6>
                        </div>
                        <p class="hadith-in-arabic">{{searchRow.hadith_name_ar}}</p>
                        <p class="hadith-narrated">{{searchRow.narrated_by}}</p>
                        <p class="hadith-in-bengali" v-html="searchRow.hadith_name_bn">{{searchRow.hadith_name_bn}}</p>
                        <!-- <p class="hadith-reference">{{searchRow.hadith_reference}}</p> -->
                        <div class="hadith-footer">
                            <div class="hadith-value-text">
                                <p>হাদিসের মানঃ</p>
                            </div>
                            <div v-if="searchRow.hadith_value == 1" class="hadith-value-sahi">
                                সহীহ হাদিস
                            </div>
                            <div v-if="searchRow.hadith_value == 2" class="hadith-value-hasan">
                                  হাসান
                            </div>
                            <div v-if="searchRow.hadith_value == 3" class="hadith-value-daif">
                                  যঈফ
                            </div>

                            <div v-if="searchRow.hadith_value == 4" class="hadith-value-maktu">
                                  সহিহ মাকতু
                            </div>
                            <div v-if="searchRow.hadith_value == 5" class="hadith-value-mawkuf">
                                  সহিহ মাওকুফ
                            </div>
                            <div v-if="searchRow.hadith_value == 6" class="hadith-value-munkar-always">
                                  মুনকার (সর্বদা পরিত্যক্ত)
                            </div>
                            <div v-if="searchRow.hadith_value == 7" class="hadith-value-saaj">
                                  শা'জ
                            </div>
                            <div v-if="searchRow.hadith_value == 8" class="hadith-value-munkar">
                                  মুনকার
                            </div>
                            <div v-if="searchRow.hadith_value == 9" class="hadith-value-nirnitonoi">
                                  নির্ণীত নয়
                            </div>
                            <div v-if="searchRow.hadith_value == 10" class="hadith-value-onnano">
                                  অন্যান্য
                            </div>
                            <div v-if="searchRow.hadith_value == 11" class="hadith-value-durbolhadis">
                                  দুর্বল হাদিস
                            </div>
                            <div class="direct-hadith-link">
                                <router-link :to="{name:'single-hadith', params:{hadith_id:searchRow.id}}"><i class="fa fa-external-link-alt"></i> সরাসরি</router-link>
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
                      <form @submit.prevent="reportSend(searchRow.id)">
                        <div class="form-row">
                          <div class="form-group col-md-4">
                            <label for="reportType">Report Type <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                            <select v-model="form2.report_type" name="report_type" id="reportType" :class="{'is-invalid': form.errors.has('report_type')}" class="form-control">
                              <option value="" disabled>Choose Report Type</option>
                              <option value="1">Mismatch Translation</option>
                              <option value="2">Spelling Mistake</option>
                              <option value="3">Other</option>
                            </select>
                            <has-error :form="form" field="report_type"></has-error>
                          </div>
                          <div class="form-group col-md-4">
                            <label for="reporterName">Name <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                            <input v-model="form2.reporter_name" name="reporter_name" type="text" :class="{'is-invalid': form.errors.has('reporter_name')}" class="form-control" id="reporterName" placeholder="Name">
                            <has-error :form="form" field="reporter_name"></has-error>
                          </div>
                          <div class="form-group col-md-4">
                            <label for="reportEmail">Email <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                            <input v-model="form2.report_email" name="report_email" type="email" :class="{'is-invalid': form.errors.has('report_email')}" class="form-control" id="reportEmail" placeholder="Email">
                            <has-error :form="form" field="report_email"></has-error>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="reportDetails">Deatils <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                          <textarea v-model="form2.report_details" name="report_details" :class="{'is-invalid': form.errors.has('report_details')}" class="form-control" id="inputAddress" placeholder="Deatils"></textarea>
                          <has-error :form="form" field="report_details"></has-error>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </form>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
          <p>No hadith found!</p>
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
      form: new Form({
        book_id:this.$route.params.book_id,
        hadith_no:this.$route.params.hadith_no,
      }),
      searchRow:'',
      singleChapter:'',
      form2: new Form({
        report_type: '',
        report_email: '',
        reporter_name: '',
        report_details: '',
        //hadith_no:'',
        //chapter_no:'',
        //book_name:'',
        hadith_id:''
      }),
      reportBox:true
    }
  },
  methods: {
    searchByHadithNo(){
      this.form.post('/homepage-search-by-hadith-no')
        .then(response =>{
          this.searchRow = response.data.fetched_hadith_no;
          this.singleChapter = response.data.fetched_chapter_row;
          //this.form2.hadith_no = response.data.fetched_hadith_no.hadith_no;
        })
        .catch(error => {
        })
    },
    reportSend(hadithId) {
      this.form2.hadith_id = hadithId;
      this.form2.post('/report')
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
  mounted(){
    this.searchByHadithNo();
  }
}
</script>