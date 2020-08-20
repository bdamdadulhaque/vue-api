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
          <p>( {{searchResult.length | engToBen(searchResult.length)}} টি  হাদিস )</p>
        </div>
        <!-- <div class="box-two mb-3 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="chapter-no">
               988
              </div>
              <div class="chapter-name">
                <a> chaoter name </a>
              </div>
              <div class="hadis-from-to">
                ১০৩২ - ১১৫৩
              </div>
            </div>
          </div>
        </div> -->
        <!-- <div v-for="(hadith, index) in this.$route.query.search_result" :key="index" class="single-hadith-box mb-3"> -->
        <div v-for="(hadith, index) in searchResult" :key="index" class="single-hadith-box mb-3">
            <div class="card mb-3">
                <div class="card-body d-flex">
                    <div v-for="(book, indexbook) in books" :key="indexbook" class="search-heading">
                        <h6 v-if="hadith.book_id == book.id">
                          {{book.book_name}} <i class="fas fa-angle-right"></i>
                        </h6>
                    </div>
                    <div v-for="(chapter, indexchap) in chapters" :key="indexchap" class="search-heading">
                      <h6 v-if="hadith.chapter_id == chapter.id">
                        {{chapter.chapter_name}} <i class="fas fa-angle-right"></i>
                      </h6>
                    </div>
                    <div class="search-heading">
                      <h6>{{hadith.hadith_no}}</h6>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="box-four">
                        <div class="single-hadith d-flex">
                            <i class="far fa-sun"></i>
                            <h6>{{hadith.hadith_no | engToBen(hadith.hadith_no)}}</h6>
                        </div>
                        <p class="hadith-in-arabic">{{hadith.hadith_name_ar}}</p>
                        <p class="hadith-narrated">{{hadith.narrated_by}}</p>
                        <p class="hadith-in-bengali" v-html="highlight(hadith.hadith_name_bn)">{{hadith.hadith_name_bn}}</p>
                        <!-- <p class="hadith-reference">{{hadith.hadith_reference}}</p> -->
                        <div class="hadith-footer">
                            <div class="hadith-value-text">
                                <p>হাদিসের মানঃ</p>
                            </div>
                            <div v-if="hadith.hadith_value == 1" class="hadith-value-sahi">
                                সহীহ হাদিস
                          </div>
                          <div v-if="hadith.hadith_value == 2" class="hadith-value-hasan">
                                হাসান
                          </div>
                          <div v-if="hadith.hadith_value == 3" class="hadith-value-daif">
                                যঈফ
                          </div>
                            <div class="direct-hadith-link">
                                <router-link :to="{name:'single-hadith', params:{hadith_id:hadith.id}}"><i class="fa fa-external-link-alt"></i> সরাসরি</router-link>
                            </div>
                            <div class="report">
                              <!-- <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                <i class="fas fa-exclamation-circle"></i> Report
                              </a> -->
                              <a @click="toggleCollapsation(hadith.id)" role="button">
                                <i class="fas fa-exclamation-circle"></i> Report
                              </a>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- <div class="collapse" id="collapseExample"> -->
                    <div v-show="isCollapsed">
                      <div v-if="hadith.id == clickedHadithId" class="card card-body">
                        <form @submit.prevent="reportSend(hadith.id)">
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
      searchResult:[],
      books:[],
      chapters:[],
      // singleBook:'',
      // singleChapter:''
      isCollapsed: false,
      clickedHadithId:'',
      form: new Form({
            report_type: '',
            report_email: '',
            reporter_name: '',
            report_details: '',
           // hadith_no:'',
            //chapter_no:'',
            //book_name:'',
            hadith_id:''
          })
    }
  },
  methods: {
    toggleCollapsation(hadithId) {
        this.clickedHadithId = hadithId
        this.isCollapsed = !this.isCollapsed;
    },
    reportSend(hadithId) {
      this.form.hadith_id = hadithId;
      this.form.post('/report')
        .then(response => {
          this.isCollapsed = false;
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
    },
    searchHadith(){
      axios.get('/homepagesearch/'+this.$route.params.search_keyword)
        .then(response =>{
         this.searchResult = response.data.searched_hadith;
         this.books = response.data.fetched_book;
         this.chapters = response.data.fetched_chapter;
         //this.getSingleBooknChapter(response.data.searched_hadith.id)
        })
    },
    highlight(text) {
      return text.replace(new RegExp(this.$route.params.search_keyword, 'gi'), '<span class="highlighted">$&</span>');
    }
    // getSingleBooknChapter(hadithId){
    //   axios.get('/single-book-chapter/1')
    //     .then(response =>{
    //      this.singleBook = response.data.fetched_single_book;
    //      console.log("ddd"+response.data.fetched_single_book.book_name)
    //      this.singleChapter = response.data.fetched_single_chapter;
    //     })
    // }
  },
  mounted(){
    this.searchHadith();
  }
}
</script>
<style>
.highlighted{
  background-color: gray;
  color: white;
  padding: 3px;
}
</style>